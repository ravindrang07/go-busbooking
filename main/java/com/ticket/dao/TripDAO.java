package com.ticket.dao;

import com.ticket.util.DatabaseConnection;
import com.ticket.util.DateTimeUtil;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class TripDAO {

    private static final String SELECT_TRIP =
        "SELECT b.id AS bus_id, b.operator_id, b.name AS bus_name, "
        + "b.bus_type, b.registration_number, b.rating, b.total_reviews, "
        + "b.total_seats, b.status AS bus_status, b.image, "
        + "o.name AS operator_name, o.type AS operator_type, "
        + "s.id AS schedule_id, s.route_id, s.departure_time, "
        + "s.arrival_time, s.base_fare, s.sleeper_fare, "
        + "r.source, r.destination, r.distance_km, r.duration_hours "
        + "FROM schedules s JOIN buses b ON b.id = s.bus_id "
        + "JOIN routes r ON r.id = s.route_id "
        + "JOIN operators o ON o.id = b.operator_id ";

    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> search(
            String source, String destination, String journeyDate)
            throws SQLException {
        LocalDate date = LocalDate.parse(journeyDate);
        new DateTimeUtil().requireTodayOrFuture(date.toString());
        String day = date.format(DateTimeFormatter.ofPattern("EEE", Locale.ENGLISH));
        String sql = SELECT_TRIP
            + "WHERE s.is_active = TRUE AND b.status = 'active' "
            + "AND o.status = 'active' AND LOWER(r.source) = LOWER(?) "
            + "AND LOWER(r.destination) = LOWER(?) "
            + "AND FIND_IN_SET(?, s.days_of_operation) > 0 "
            + "ORDER BY s.departure_time";

        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, source.trim());
            statement.setString(2, destination.trim());
            statement.setString(3, day);
            try (ResultSet results = statement.executeQuery()) {
                List<Map<String, Object>> trips = new ArrayList<>();
                Map<String, Map<String, Object>> routes =
                    new LinkedHashMap<>();
                while (results.next()) {
                    Map<String, Object> trip = mapTrip(results);
                    Map<String, Object> schedule =
                        (Map<String, Object>) trip.get("schedule");
                    schedule.put("availableSeats", countAvailableSeats(
                        connection, (String) schedule.get("id"), date.toString(),
                        (String) schedule.get("busId")));
                    Map<String, Object> route =
                        (Map<String, Object>) trip.get("route");
                    String routeId = (String) route.get("id");
                    if (!routes.containsKey(routeId)) {
                        addPoints(connection, route);
                        routes.put(routeId, route);
                    } else {
                        trip.put("route", routes.get(routeId));
                    }
                    trips.add(trip);
                }
                return trips;
            }
        }
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> findByScheduleId(String scheduleId)
            throws SQLException {
        String sql = SELECT_TRIP
            + "WHERE s.id = ?";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, scheduleId);
            try (ResultSet results = statement.executeQuery()) {
                if (!results.next()) {
                    return null;
                }
                Map<String, Object> trip = mapTrip(results);
                Map<String, Object> schedule =
                    (Map<String, Object>) trip.get("schedule");
                schedule.put("availableSeats", countAvailableSeats(
                    connection, scheduleId, null,
                    (String) schedule.get("busId")));
                addPoints(connection,
                    (Map<String, Object>) trip.get("route"));
                return trip;
            }
        }
    }

    private Map<String, Object> mapTrip(ResultSet results)
            throws SQLException {
        Map<String, Object> bus = new LinkedHashMap<>();
        bus.put("id", results.getString("bus_id"));
        bus.put("operatorId", results.getString("operator_id"));
        bus.put("name", results.getString("bus_name"));
        bus.put("operatorName", results.getString("operator_name"));
        bus.put("operatorType", results.getString("operator_type"));
        bus.put("busType", results.getString("bus_type"));
        bus.put("registrationNumber", results.getString("registration_number"));
        bus.put("rating", results.getBigDecimal("rating"));
        bus.put("totalReviews", results.getInt("total_reviews"));
        bus.put("totalSeats", results.getInt("total_seats"));
        bus.put("status", results.getString("bus_status"));
        bus.put("image", results.getString("image"));

        Map<String, Object> schedule = new LinkedHashMap<>();
        schedule.put("id", results.getString("schedule_id"));
        schedule.put("busId", results.getString("bus_id"));
        schedule.put("routeId", results.getString("route_id"));
        schedule.put("departureTime", results.getString("departure_time"));
        schedule.put("arrivalTime", results.getString("arrival_time"));
        schedule.put("baseFare", results.getBigDecimal("base_fare"));
        schedule.put("sleeperFare", results.getBigDecimal("sleeper_fare"));
        schedule.put("isActive", true);

        Map<String, Object> route = new LinkedHashMap<>();
        route.put("id", results.getString("route_id"));
        route.put("source", results.getString("source"));
        route.put("destination", results.getString("destination"));
        route.put("distanceKm", results.getInt("distance_km"));
        route.put("durationHours", results.getString("duration_hours"));

        Map<String, Object> trip = new LinkedHashMap<>();
        trip.put("bus", bus);
        trip.put("schedule", schedule);
        trip.put("route", route);
        return trip;
    }

    private void addPoints(
            Connection connection, Map<String, Object> route)
            throws SQLException {
        String routeId = (String) route.get("id");
        route.put("boardingPoints",
            findPoints(connection, "boarding_points", routeId));
        route.put("droppingPoints",
            findPoints(connection, "dropping_points", routeId));
    }

    private List<Map<String, Object>> findPoints(
            Connection connection, String table, String routeId)
            throws SQLException {
        if (!"boarding_points".equals(table)
                && !"dropping_points".equals(table)) {
            throw new IllegalArgumentException("Unsupported point table.");
        }
        String sql = "SELECT id, time, location, landmark FROM "
            + table + " WHERE route_id = ? ORDER BY time";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, routeId);
            try (ResultSet results = statement.executeQuery()) {
                List<Map<String, Object>> points = new ArrayList<>();
                while (results.next()) {
                    Map<String, Object> point = new LinkedHashMap<>();
                    point.put("id", results.getString("id"));
                    point.put("time", results.getString("time"));
                    point.put("location", results.getString("location"));
                    point.put("landmark", results.getString("landmark"));
                    points.add(point);
                }
                return points;
            }
        }
    }

    private int countAvailableSeats(
            Connection connection, String scheduleId, String journeyDate,
            String busId) throws SQLException {
        String sql = "SELECT COUNT(*) FROM seats se WHERE se.bus_id = ? "
            + "AND NOT EXISTS (SELECT 1 FROM booking_seats bs "
            + "JOIN bookings bk ON bk.id = bs.booking_id "
            + "WHERE bs.schedule_id = ? AND bs.seat_label = se.seat_label "
            + "AND bs.active_lock = 1 "
            + (journeyDate == null ? "" : "AND bs.journey_date = ? ")
            + "AND (bk.status <> 'PENDING' OR "
            + "bk.booking_time >= DATE_SUB(NOW(), INTERVAL 15 MINUTE)))";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, busId);
            statement.setString(2, scheduleId);
            if (journeyDate != null) {
                statement.setDate(3, java.sql.Date.valueOf(journeyDate));
            }
            try (ResultSet results = statement.executeQuery()) {
                results.next();
                return results.getInt(1);
            }
        }
    }
}
