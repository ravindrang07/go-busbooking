package com.ticket.main;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ticket.dao.BookingDAO;
import com.ticket.dao.TripDAO;
import com.ticket.dao.BusDAO;
import com.ticket.dao.ScheduleDAO;
import com.ticket.model.Booking;
import com.ticket.model.UserSession;
import com.ticket.service.ScheduleService;
import com.ticket.service.SeatService;
import com.ticket.util.ApiResponse;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URLDecoder;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Executors;

public final class ApiServer {

    private static final int MAX_REQUEST_BYTES = 65536;
    private final ObjectMapper mapper = new ObjectMapper();
    private final AuthApi authApi = new AuthApi();
    private final BookingApi bookingApi = new BookingApi();
    private final PaymentApi paymentApi = new PaymentApi();
    private final AdminApi adminApi = new AdminApi();
    private final OperatorApi operatorApi = new OperatorApi();
    private final ReportApi reportApi = new ReportApi();
    private final BusDAO busDAO = new BusDAO();
    private final ScheduleDAO scheduleDAO = new ScheduleDAO();
    private final TripDAO tripDAO = new TripDAO();
    private final BookingDAO bookingDAO = new BookingDAO();
    private final SeatService seatService = new SeatService();

    private ApiServer() {
    }

    public static void main(String[] args) throws IOException {
        int port = Integer.parseInt(
            System.getenv().getOrDefault("GOBUS_API_PORT", "8080"));
        ApiServer api = new ApiServer();
        HttpServer server = HttpServer.create(
            new InetSocketAddress("127.0.0.1", port), 0);
        server.createContext("/api", api::handle);
        server.setExecutor(Executors.newFixedThreadPool(8));
        server.start();
        System.out.println("GoBus API listening on http://127.0.0.1:" + port);
        Runtime.getRuntime().addShutdownHook(
            new Thread(() -> server.stop(1)));
    }

    private void handle(HttpExchange exchange) throws IOException {
        addCorsHeaders(exchange);
        if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
            exchange.sendResponseHeaders(204, -1);
            exchange.close();
            return;
        }

        try {
            dispatch(exchange);
        } catch (UnauthorizedException e) {
            sendError(exchange, 401, e.getMessage());
        } catch (ForbiddenException e) {
            sendError(exchange, 403, e.getMessage());
        } catch (IllegalArgumentException e) {
            sendError(exchange, 400, e.getMessage());
        } catch (SQLException e) {
            System.err.println("GoBus API database operation failed: "
                + e.getMessage());
            sendError(exchange, 503,
                "The database could not complete this request.");
        } catch (PaymentGatewayException e) {
            System.err.println("GoBus payment gateway request failed: "
                + e.getMessage());
            sendError(exchange, 502, e.getMessage());
        } catch (Exception e) {
            System.err.println("GoBus API request failed: " + e.getMessage());
            e.printStackTrace(System.err);
            sendError(exchange, 500, "The server could not complete this request.");
        } finally {
            exchange.close();
        }
    }

    private void dispatch(HttpExchange exchange) throws Exception {
        String method = exchange.getRequestMethod().toUpperCase();
        String path = exchange.getRequestURI().getPath();

        if ("GET".equals(method) && "/api/health".equals(path)) {
            sendJson(exchange, 200, success(
                java.util.Collections.singletonMap("status", "ok")));
            return;
        }
        if ("POST".equals(method) && "/api/auth/login".equals(path)) {
            JsonNode body = readBody(exchange);
            ApiResponse<?> response = authApi.login(
                text(body, "email"), text(body, "password"));
            sendApiResponse(exchange, response, 200, 401);
            return;
        }
        if ("POST".equals(method) && "/api/auth/register".equals(path)) {
            JsonNode body = readBody(exchange);
            ApiResponse<?> response = authApi.register(
                text(body, "name"), text(body, "email"),
                text(body, "phone"), text(body, "password"));
            sendApiResponse(exchange, response, 201, 400);
            return;
        }
        if ("DELETE".equals(method) && "/api/auth/session".equals(path)) {
            authApi.logout(exchange.getRequestHeaders().getFirst("X-Session-Id"));
            sendJson(exchange, 200, success(null));
            return;
        }
        if ("GET".equals(method) && "/api/trips/search".equals(path)) {
            Map<String, String> query = queryParameters(exchange);
            String source = required(query.get("source"), "Source");
            String destination = required(query.get("destination"), "Destination");
            String date = ScheduleService.parseJourneyDate(query.get("date"))
                .toString();
            sendJson(exchange, 200,
                success(tripDAO.search(source, destination, date)));
            return;
        }
        if ("GET".equals(method) && "/api/seats".equals(path)) {
            Map<String, String> query = queryParameters(exchange);
            sendJson(exchange, 200, success(seatService.getAvailableSeats(
                query.get("scheduleId"), query.get("date"))));
            return;
        }
        if ("GET".equals(method) && "/api/payments/config".equals(path)) {
            sendJson(exchange, 200, success(
                paymentApi.getConfiguration(
                    requireRole(exchange, "passenger"))));
            return;
        }
        if ("POST".equals(method) && "/api/payments/orders".equals(path)) {
            UserSession paymentUser = requireRole(exchange, "passenger");
            Map<String, Object> order = paymentApi.createOrder(
                paymentUser, text(readBody(exchange), "pnr"));
            sendJson(exchange, 201, success(order));
            return;
        }
        if ("POST".equals(method) && "/api/payments/verify".equals(path)) {
            UserSession paymentUser = requireRole(exchange, "passenger");
            JsonNode body = readBody(exchange);
            Map<String, Object> payment = paymentApi.verifyPayment(
                paymentUser, text(body, "pnr"),
                text(body, "razorpay_order_id"),
                text(body, "razorpay_payment_id"),
                text(body, "razorpay_signature"));
            sendJson(exchange, 200, success(payment));
            return;
        }
        if ("POST".equals(method) && "/api/bookings".equals(path)) {
            UserSession user = requireUser(exchange);
            BookingApi.BookingRequest request = mapper.treeToValue(
                readBody(exchange), BookingApi.BookingRequest.class);
            ApiResponse<Booking> response =
                bookingApi.createBooking(user, request, false);
            if (!response.isSuccess()) {
                sendJson(exchange, 400, failure(response.getError()));
                return;
            }
            sendJson(exchange, 201, success(toBookingView(response.getData())));
            return;
        }
        if ("GET".equals(method) && "/api/bookings".equals(path)) {
            ApiResponse<List<Booking>> response =
                bookingApi.listBookings(requireUser(exchange));
            List<Map<String, Object>> bookings = new ArrayList<>();
            for (Booking booking : response.getData()) {
                bookings.add(toBookingView(booking));
            }
            sendJson(exchange, 200, success(bookings));
            return;
        }
        if ("GET".equals(method) && "/api/admin/buses".equals(path)) {
            sendApiResponse(exchange,
                adminApi.listBuses(requireRole(exchange, "admin")), 200, 403);
            return;
        }
        if ("GET".equals(method) && "/api/admin/bookings".equals(path)) {
            UserSession user = requireRole(exchange, "admin");
            List<Map<String, Object>> bookings = new ArrayList<>();
            for (Booking booking : adminApi.listBookings(user).getData()) {
                bookings.add(toBookingView(booking));
            }
            sendJson(exchange, 200, success(bookings));
            return;
        }
        if ("GET".equals(method) && "/api/admin/reports".equals(path)) {
            sendJson(exchange, 200, success(
                reportApi.getSummary(requireRole(exchange, "admin"))));
            return;
        }
        if ("GET".equals(method) && "/api/admin/operators".equals(path)) {
            sendApiResponse(exchange,
                adminApi.listOperators(requireRole(exchange, "admin")),
                200, 403);
            return;
        }
        if ("POST".equals(method) && path.startsWith("/api/admin/operators/")
                && path.endsWith("/status")) {
            UserSession user = requireRole(exchange, "admin");
            String operatorId = path.substring(
                "/api/admin/operators/".length(),
                path.length() - "/status".length());
            sendApiResponse(exchange, adminApi.updateOperatorStatus(
                user, operatorId, text(readBody(exchange), "status")), 200, 400);
            return;
        }
        if ("POST".equals(method) && "/api/operator/buses".equals(path)) {
            UserSession user = requireRole(exchange, "operator");
            JsonNode body = readBody(exchange);
            String id = busDAO.createForOperator(
                user.getOperatorId(), text(body, "name"),
                text(body, "busType"), text(body, "registrationNumber"),
                body.path("totalSeats").asInt(0));
            sendJson(exchange, 201, success(
                java.util.Collections.singletonMap("id", id)));
            return;
        }
        if ("GET".equals(method) && "/api/operator/routes".equals(path)) {
            sendJson(exchange, 200, success(
                scheduleDAO.findRoutesByOperator(requireRole(exchange, "operator")
                    .getOperatorId())));
            return;
        }
        if ("GET".equals(method) && "/api/operator/schedules".equals(path)) {
            sendJson(exchange, 200, success(
                scheduleDAO.findSchedulesByOperator(
                    requireRole(exchange, "operator").getOperatorId())));
            return;
        }
        if ("POST".equals(method) && path.startsWith("/api/admin/buses/")
                && path.endsWith("/status")) {
            UserSession user = requireRole(exchange, "admin");
            String busId = path.substring(
                "/api/admin/buses/".length(),
                path.length() - "/status".length());
            String status = text(readBody(exchange), "status");
            sendApiResponse(exchange,
                adminApi.updateBusStatus(user, busId, status), 200, 400);
            return;
        }
        if ("GET".equals(method) && "/api/operator/buses".equals(path)) {
            sendApiResponse(exchange,
                operatorApi.listBuses(requireRole(exchange, "operator")),
                200, 403);
            return;
        }
        if ("GET".equals(method) && "/api/operator/bookings".equals(path)) {
            UserSession user = requireRole(exchange, "operator");
            List<Map<String, Object>> bookings = new ArrayList<>();
            for (Booking booking : operatorApi.listBookings(user).getData()) {
                bookings.add(toBookingView(booking));
            }
            sendJson(exchange, 200, success(bookings));
            return;
        }
        if ("POST".equals(method) && path.startsWith("/api/operator/buses/")
                && path.endsWith("/status")) {
            UserSession user = requireRole(exchange, "operator");
            String busId = path.substring(
                "/api/operator/buses/".length(),
                path.length() - "/status".length());
            String status = text(readBody(exchange), "status");
            sendApiResponse(exchange,
                operatorApi.updateBusStatus(user, busId, status), 200, 400);
            return;
        }
        if ("POST".equals(method) && path.startsWith("/api/bookings/")
                && path.endsWith("/cancel")) {
            UserSession user = requireUser(exchange);
            if (!"passenger".equals(user.getRole())
                    && !"admin".equals(user.getRole())) {
                throw new IllegalArgumentException(
                    "Only passengers and administrators can cancel bookings.");
            }
            String pnr = path.substring(
                "/api/bookings/".length(), path.length() - "/cancel".length());
            String ownerId = "admin".equals(user.getRole())
                ? "admin" : user.getUserId();
            if (!bookingDAO.cancel(pnr, ownerId)) {
                sendError(exchange, 404,
                    "Booking was not found or can no longer be cancelled.");
                return;
            }
            sendJson(exchange, 200, success(
                java.util.Collections.singletonMap("status", "CANCELLED")));
            return;
        }

        sendError(exchange, 404, "API endpoint was not found.");
    }

    private UserSession requireUser(HttpExchange exchange) {
        UserSession user = authApi.getCurrentUser(
            exchange.getRequestHeaders().getFirst("X-Session-Id"));
        if (user == null) {
            throw new UnauthorizedException(
                "Your session has expired. Please sign in again.");
        }
        return user;
    }

    private UserSession requireRole(HttpExchange exchange, String role) {
        UserSession user = requireUser(exchange);
        if (!role.equals(user.getRole())) {
            throw new ForbiddenException(
                "This account is not authorized for this operation.");
        }
        return user;
    }

    private Map<String, Object> toBookingView(Booking booking)
            throws SQLException {
        Map<String, Object> trip =
            tripDAO.findByScheduleId(booking.getScheduleId());
        if (trip == null) {
            throw new SQLException("The booking schedule is no longer available.");
        }
        @SuppressWarnings("unchecked")
        Map<String, Object> bus = (Map<String, Object>) trip.get("bus");
        @SuppressWarnings("unchecked")
        Map<String, Object> schedule =
            (Map<String, Object>) trip.get("schedule");
        @SuppressWarnings("unchecked")
        Map<String, Object> route = (Map<String, Object>) trip.get("route");

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("id", booking.getId());
        result.put("pnr", booking.getPnr());
        result.put("passengerId", booking.getPassengerId());
        result.put("passengerName", booking.getPassengerName());
        result.put("passengerEmail", booking.getPassengerEmail());
        result.put("passengerPhone", booking.getPassengerPhone());
        result.put("passengerGender", booking.getPassengerGender());
        result.put("passengerAge", booking.getPassengerAge());
        result.put("scheduleId", booking.getScheduleId());
        result.put("busId", bus.get("id"));
        result.put("operatorId", bus.get("operatorId"));
        result.put("busName", bus.get("name"));
        result.put("operatorName", bus.get("operatorName"));
        result.put("operatorType", bus.get("operatorType"));
        result.put("source", route.get("source"));
        result.put("destination", route.get("destination"));
        result.put("journeyDate", booking.getJourneyDate());
        result.put("departureTime", schedule.get("departureTime"));
        result.put("arrivalTime", schedule.get("arrivalTime"));
        result.put("boardingPoint", pointLabel(
            route.get("boardingPoints"), booking.getBoardingPointId()));
        result.put("droppingPoint", pointLabel(
            route.get("droppingPoints"), booking.getDroppingPointId()));
        result.put("selectedSeats", booking.getSeatLabels());
        result.put("totalFare", booking.getTotalFare());
        result.put("tax", booking.getTax());
        result.put("grandTotal", booking.getGrandTotal());
        result.put("status", booking.getStatus());
        result.put("bookingTime", booking.getJourneyDate());
        result.put("paymentMethod", booking.getPaymentMethod());
        result.put("paymentStatus", booking.getPaymentStatus());
        return result;
    }

    @SuppressWarnings("unchecked")
    private String pointLabel(Object rawPoints, String pointId) {
        List<Map<String, Object>> points =
            (List<Map<String, Object>>) rawPoints;
        for (Map<String, Object> point : points) {
            if (pointId.equals(point.get("id"))) {
                return point.get("location") + ", " + point.get("landmark");
            }
        }
        return pointId;
    }

    private JsonNode readBody(HttpExchange exchange) throws IOException {
        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        InputStream input = exchange.getRequestBody();
        byte[] chunk = new byte[4096];
        int count;
        while ((count = input.read(chunk)) != -1) {
            if (buffer.size() + count > MAX_REQUEST_BYTES) {
                throw new IllegalArgumentException("Request body is too large.");
            }
            buffer.write(chunk, 0, count);
        }
        JsonNode body;
        try {
            body = mapper.readTree(buffer.toByteArray());
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Request body must be valid JSON.");
        }
        if (body == null || !body.isObject()) {
            throw new IllegalArgumentException("A JSON object is required.");
        }
        return body;
    }

    private static String text(JsonNode body, String key) {
        JsonNode value = body.get(key);
        return value == null || value.isNull() ? null : value.asText();
    }

    private static String required(String value, String field) {
        if (value == null || value.trim().isEmpty()) {
            throw new IllegalArgumentException(field + " is required.");
        }
        return value.trim();
    }

    private Map<String, String> queryParameters(HttpExchange exchange)
            throws IOException {
        Map<String, String> parameters = new LinkedHashMap<>();
        String raw = exchange.getRequestURI().getRawQuery();
        if (raw == null || raw.isEmpty()) {
            return parameters;
        }
        for (String pair : raw.split("&")) {
            int separator = pair.indexOf('=');
            String key = separator < 0 ? pair : pair.substring(0, separator);
            String value = separator < 0 ? "" : pair.substring(separator + 1);
            parameters.put(
                URLDecoder.decode(key, "UTF-8"),
                URLDecoder.decode(value, "UTF-8"));
        }
        return parameters;
    }

    private void sendApiResponse(
            HttpExchange exchange, ApiResponse<?> response,
            int successStatus, int errorStatus) throws IOException {
        sendJson(exchange, response.isSuccess() ? successStatus : errorStatus,
            response);
    }

    private void sendError(
            HttpExchange exchange, int status, String message)
            throws IOException {
        sendJson(exchange, status, failure(message));
    }

    private void sendJson(
            HttpExchange exchange, int status, Object body)
            throws IOException {
        byte[] bytes = mapper.writeValueAsBytes(body);
        exchange.getResponseHeaders().set(
            "Content-Type", "application/json; charset=utf-8");
        exchange.sendResponseHeaders(status, bytes.length);
        try (OutputStream output = exchange.getResponseBody()) {
            output.write(bytes);
        }
    }

    private static Map<String, Object> success(Object data) {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("success", true);
        response.put("data", data);
        response.put("error", null);
        return response;
    }

    private static Map<String, Object> failure(String error) {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("success", false);
        response.put("data", null);
        response.put("error", error);
        return response;
    }

    private static final class UnauthorizedException
            extends RuntimeException {
        private UnauthorizedException(String message) {
            super(message);
        }
    }

    private static final class ForbiddenException extends RuntimeException {
        private ForbiddenException(String message) {
            super(message);
        }
    }

    private static void addCorsHeaders(HttpExchange exchange) {
        String origin = exchange.getRequestHeaders().getFirst("Origin");
        if ("http://127.0.0.1:8000".equals(origin)
                || "http://localhost:8000".equals(origin)) {
            exchange.getResponseHeaders().set(
                "Access-Control-Allow-Origin", origin);
            exchange.getResponseHeaders().set("Vary", "Origin");
        }
        exchange.getResponseHeaders().set(
            "Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
        exchange.getResponseHeaders().set(
            "Access-Control-Allow-Headers", "Content-Type, X-Session-Id");
    }
}
