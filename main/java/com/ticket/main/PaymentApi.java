package com.ticket.main;

import com.fasterxml.jackson.databind.JsonNode;
import com.ticket.dao.BookingDAO;
import com.ticket.model.Booking;
import com.ticket.model.UserSession;
import java.math.RoundingMode;
import java.sql.SQLException;
import java.util.LinkedHashMap;
import java.util.Map;

public class PaymentApi {

    private final BookingDAO bookingDAO;
    private final RazorpayGateway gateway;

    public PaymentApi() {
        this(new BookingDAO(), new RazorpayGateway());
    }

    PaymentApi(BookingDAO bookingDAO, RazorpayGateway gateway) {
        this.bookingDAO = bookingDAO;
        this.gateway = gateway;
    }

    public Map<String, Object> getConfiguration(UserSession user) {
        if (user == null || !"passenger".equals(user.getRole())) {
            throw new IllegalArgumentException(
                "Only signed-in passengers can access checkout.");
        }
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("enabled", gateway.isConfigured());
        result.put("testMode", gateway.isConfigured()
            && gateway.getKeyId().startsWith("rzp_test_"));
        return result;
    }

    public Map<String, Object> createOrder(UserSession user, String pnr)
            throws SQLException, PaymentGatewayException {
        Booking booking = requirePassengerBooking(user, pnr);
        requirePending(booking);
        if (!gateway.isConfigured()) {
            throw new PaymentGatewayException(
                "Razorpay is not configured. Set RAZORPAY_KEY_ID and "
                + "RAZORPAY_KEY_SECRET on the Java API server.");
        }

        long amount = booking.getGrandTotal()
            .setScale(2, RoundingMode.UNNECESSARY)
            .movePointRight(2)
            .longValueExact();
        String existingOrderId = bookingDAO.findRazorpayOrder(
            booking.getPnr(), user.getUserId());
        if (existingOrderId != null) {
            return orderView(existingOrderId, amount, booking.getPnr());
        }
        JsonNode order = gateway.createOrder(amount, booking.getPnr());
        String orderId = requiredProviderValue(order, "id");
        if (order.path("amount").asLong(-1) != amount
                || !"INR".equals(order.path("currency").asText())) {
            throw new PaymentGatewayException(
                "Razorpay returned an order with an unexpected amount or currency.");
        }
        if (!bookingDAO.attachRazorpayOrder(
                booking.getPnr(), user.getUserId(), orderId)) {
            throw new IllegalArgumentException(
                "The reservation is no longer pending. Refresh your bookings.");
        }

        return orderView(orderId, amount, booking.getPnr());
    }

    private Map<String, Object> orderView(
            String orderId, long amount, String pnr) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("keyId", gateway.getKeyId());
        result.put("orderId", orderId);
        result.put("amount", amount);
        result.put("currency", "INR");
        result.put("name", "GoBus");
        result.put("description", "Bus reservation " + pnr);
        result.put("testMode", gateway.getKeyId().startsWith("rzp_test_"));
        return result;
    }

    public Map<String, Object> verifyPayment(
            UserSession user, String pnr, String orderId, String paymentId,
            String signature) throws SQLException, PaymentGatewayException {
        Booking booking = requirePassengerBooking(user, pnr);
        requirePending(booking);
        requireValue(orderId, "Razorpay order ID");
        requireValue(paymentId, "Razorpay payment ID");
        requireValue(signature, "Razorpay signature");
        if (!orderId.equals(bookingDAO.findRazorpayOrder(
                booking.getPnr(), user.getUserId()))) {
            throw new IllegalArgumentException(
                "This payment order does not belong to the reservation.");
        }
        if (!orderId.matches("order_[A-Za-z0-9]+")
                || !paymentId.matches("pay_[A-Za-z0-9]+")
                || !signature.matches("[A-Fa-f0-9]{64}")
                || !gateway.verifySignature(orderId, paymentId, signature)) {
            throw new IllegalArgumentException(
                "Razorpay payment signature is invalid.");
        }

        JsonNode payment = gateway.fetchPayment(paymentId);
        long expectedAmount = booking.getGrandTotal()
            .setScale(2, RoundingMode.UNNECESSARY)
            .movePointRight(2)
            .longValueExact();
        if (!orderId.equals(payment.path("order_id").asText())
                || payment.path("amount").asLong(-1) != expectedAmount
                || !"INR".equals(payment.path("currency").asText())
                || !payment.path("captured").asBoolean(false)
                || !"captured".equals(payment.path("status").asText())) {
            throw new PaymentGatewayException(
                "Razorpay has not confirmed a captured payment for this reservation.");
        }
        if (!bookingDAO.markRazorpayPaymentPaid(
                booking.getPnr(), user.getUserId(), orderId, paymentId)) {
            throw new IllegalArgumentException(
                "The reservation could not be confirmed. Check your bookings.");
        }
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("pnr", booking.getPnr());
        result.put("status", "CONFIRMED");
        result.put("paymentStatus", "PAID");
        return result;
    }

    private Booking requirePassengerBooking(UserSession user, String pnr)
            throws SQLException {
        if (user == null || !"passenger".equals(user.getRole())) {
            throw new IllegalArgumentException(
                "Only signed-in passengers can make payments.");
        }
        if (pnr == null || !pnr.matches("[A-Za-z0-9-]{3,30}")) {
            throw new IllegalArgumentException("A valid booking PNR is required.");
        }
        Booking booking = bookingDAO.findByPnr(pnr);
        if (booking == null || !user.getUserId().equals(booking.getPassengerId())) {
            throw new IllegalArgumentException(
                "The reservation was not found for this passenger.");
        }
        return booking;
    }

    private static void requirePending(Booking booking) {
        if (!"PENDING".equals(booking.getStatus())
                || !"PENDING".equals(booking.getPaymentStatus())) {
            throw new IllegalArgumentException(
                "Only pending reservations can be paid.");
        }
    }

    private static void requireValue(String value, String field) {
        if (value == null || value.trim().isEmpty()) {
            throw new IllegalArgumentException(field + " is required.");
        }
    }

    private static String requiredProviderValue(JsonNode body, String key)
            throws PaymentGatewayException {
        String value = body.path(key).asText();
        if (value == null || value.trim().isEmpty()) {
            throw new PaymentGatewayException(
                "Razorpay returned an incomplete order response.");
        }
        return value;
    }
}
