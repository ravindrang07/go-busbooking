package com.ticket.dao;

import com.ticket.model.Schedule;
import com.ticket.util.DatabaseConnection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;

public class ScheduleDAO {

    public List<Map<String, Object>> findSchedulesByOperator(String operatorId)
            throws SQLException {
        String sql = "SELECT s.id, s.bus_id, b.name AS bus_name, s.route_id, "
            + "r.source, r.destination, s.departure_time, s.arrival_time, "
            + "s.base_fare, s.days_of_operation, s.is_active FROM schedules s "
            + "JOIN buses b ON b.id = s.bus_id "
            + "JOIN routes r ON r.id = s.route_id "
            + "WHERE b.operator_id = ? ORDER BY s.departure_time";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, operatorId);
            try (ResultSet results = statement.executeQuery()) {
                List<Map<String, Object>> schedules = new ArrayList<>();
                while (results.next()) {
                    Map<String, Object> route = new LinkedHashMap<>();
                    route.put("source", results.getString("source"));
                    route.put("destination", results.getString("destination"));
                    Map<String, Object> schedule = new LinkedHashMap<>();
                    schedule.put("id", results.getString("id"));
                    schedule.put("busId", results.getString("bus_id"));
                    schedule.put("busName", results.getString("bus_name"));
                    schedule.put("routeId", results.getString("route_id"));
                    schedule.put("route", route);
                    schedule.put("departureTime",
                        results.getString("departure_time"));
                    schedule.put("arrivalTime", results.getString("arrival_time"));
                    schedule.put("baseFare", results.getBigDecimal("base_fare"));
                    schedule.put("daysOfOperation",
                        results.getString("days_of_operation"));
                    schedule.put("isActive", results.getBoolean("is_active"));
                    schedules.add(schedule);
                }
                return schedules;
            }
        }
    }

    public List<Map<String, Object>> findRoutesByOperator(String operatorId)
            throws SQLException {
        String sql = "SELECT DISTINCT r.id, r.source, r.destination, "
            + "r.distance_km, r.duration_hours FROM routes r "
            + "JOIN schedules s ON s.route_id = r.id "
            + "JOIN buses b ON b.id = s.bus_id WHERE b.operator_id = ? "
            + "ORDER BY r.source, r.destination";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, operatorId);
            try (ResultSet results = statement.executeQuery()) {
                List<Map<String, Object>> routes = new ArrayList<>();
                while (results.next()) {
                    Map<String, Object> route = new LinkedHashMap<>();
                    String routeId = results.getString("id");
                    route.put("id", routeId);
                    route.put("source", results.getString("source"));
                    route.put("destination", results.getString("destination"));
                    route.put("distanceKm", results.getInt("distance_km"));
                    route.put("durationHours",
                        results.getString("duration_hours"));
                    route.put("boardingPoints",
                        findPoints(connection, "boarding_points", routeId));
                    route.put("droppingPoints",
                        findPoints(connection, "dropping_points", routeId));
                    routes.add(route);
                }
                return routes;
            }
        }
    }

    private List<Map<String, Object>> findPoints(
            Connection connection, String table, String routeId)
            throws SQLException {
        String sql = "SELECT id, time, location, landmark FROM " + table
            + " WHERE route_id = ? ORDER BY time";
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

    public List<Schedule> findActiveSchedules() throws SQLException {
        String sql = "SELECT id, bus_id, route_id, departure_time, "
            + "arrival_time, base_fare, sleeper_fare, days_of_operation, "
            + "is_active FROM schedules WHERE is_active = TRUE "
            + "ORDER BY departure_time";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql);
             ResultSet results = statement.executeQuery()) {
            List<Schedule> schedules = new ArrayList<>();
            while (results.next()) schedules.add(map(results));
            return schedules;
        }
    }

    public Schedule findActiveById(String id) throws SQLException {
        String sql = "SELECT id, bus_id, route_id, departure_time, "
            + "arrival_time, base_fare, sleeper_fare, days_of_operation, "
            + "is_active FROM schedules WHERE id = ? AND is_active = TRUE";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, id);
            try (ResultSet results = statement.executeQuery()) {
                return results.next() ? map(results) : null;
            }
        }
    }

    public boolean hasValidPoints(
            String scheduleId, String boardingPointId, String droppingPointId)
            throws SQLException {
        String sql = "SELECT COUNT(*) FROM schedules s "
            + "JOIN boarding_points bp ON bp.route_id = s.route_id "
            + "JOIN dropping_points dp ON dp.route_id = s.route_id "
            + "WHERE s.id = ? AND s.is_active = TRUE "
            + "AND bp.id = ? AND dp.id = ?";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, scheduleId);
            statement.setString(2, boardingPointId);
            statement.setString(3, droppingPointId);
            try (ResultSet results = statement.executeQuery()) {
                return results.next() && results.getInt(1) > 0;
            }
        }
    }

    private Schedule map(ResultSet results) throws SQLException {
        return new Schedule(
            results.getString("id"), results.getString("bus_id"),
            results.getString("route_id"), results.getString("departure_time"),
            results.getString("arrival_time"), results.getBigDecimal("base_fare"),
            results.getBigDecimal("sleeper_fare"),
            results.getString("days_of_operation"),
            results.getBoolean("is_active"));
    }
}
