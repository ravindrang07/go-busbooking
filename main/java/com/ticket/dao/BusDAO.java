package com.ticket.dao;

import com.ticket.model.Bus;
import com.ticket.util.DatabaseConnection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

public class BusDAO {

    public String createForOperator(
            String operatorId, String name, String busType,
            String registrationNumber, int totalSeats) throws SQLException {
        if (operatorId == null || operatorId.trim().isEmpty()
                || name == null || name.trim().isEmpty()
                || registrationNumber == null
                || registrationNumber.trim().isEmpty()) {
            throw new IllegalArgumentException(
                "Bus name and registration number are required.");
        }
        if (!"AC Sleeper (2+1)".equals(busType)
                && !"Volvo Multi-Axle AC".equals(busType)
                && !"BharatBenz Executive (2+2)".equals(busType)
                && !"Express Non-AC".equals(busType)) {
            throw new IllegalArgumentException("Unsupported bus type.");
        }
        if (totalSeats < 4 || totalSeats > 60) {
            throw new IllegalArgumentException(
                "Bus capacity must be between 4 and 60 seats.");
        }
        String id = "bus-" + UUID.randomUUID().toString();
        String normalizedRegistration = registrationNumber.trim()
            .toUpperCase(Locale.ROOT);
        try (Connection connection = DatabaseConnection.getConnection()) {
            connection.setAutoCommit(false);
            try {
                try (PreparedStatement statement = connection.prepareStatement(
                        "INSERT INTO buses (id, operator_id, name, bus_type, "
                        + "registration_number, total_seats, status) "
                        + "SELECT ?, id, ?, ?, ?, ?, 'inactive' FROM operators "
                        + "WHERE id = ? AND status = 'active'")) {
                    statement.setString(1, id);
                    statement.setString(2, name.trim());
                    statement.setString(3, busType);
                    statement.setString(4, normalizedRegistration);
                    statement.setInt(5, totalSeats);
                    statement.setString(6, operatorId);
                    if (statement.executeUpdate() != 1) {
                        throw new IllegalArgumentException(
                            "Active operator account was not found.");
                    }
                }
                String seatSql = "INSERT INTO seats "
                    + "(bus_id, seat_label, seat_type, deck, row_no, col_no) "
                    + "VALUES (?, ?, ?, 'lower', ?, ?)";
                String seatType = "AC Sleeper (2+1)".equals(busType)
                    ? "sleeper" : "seater";
                try (PreparedStatement statement =
                         connection.prepareStatement(seatSql)) {
                    for (int seat = 0; seat < totalSeats; seat++) {
                        statement.setString(1, id);
                        statement.setString(2, "S" + (seat / 4 + 1)
                            + (char) ('A' + seat % 4));
                        statement.setString(3, seatType);
                        statement.setInt(4, seat / 4 + 1);
                        statement.setInt(5, seat % 4 + 1);
                        statement.addBatch();
                    }
                    statement.executeBatch();
                }
                connection.commit();
                return id;
            } catch (SQLException | RuntimeException e) {
                connection.rollback();
                throw e;
            } finally {
                connection.setAutoCommit(true);
            }
        }
    }

    public List<Bus> findActiveBuses() throws SQLException {
        String sql =
            "SELECT id, operator_id, name, bus_type, registration_number, " +
            "rating, total_seats, status FROM buses " +
            "WHERE status = 'active' ORDER BY name";

        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql);
             ResultSet results = statement.executeQuery()) {
            List<Bus> buses = new ArrayList<>();
            while (results.next()) {
                buses.add(mapBus(results));
            }
            return buses;
        }
    }

    public List<Bus> findAllBuses() throws SQLException {
        String sql =
            "SELECT id, operator_id, name, bus_type, registration_number, " +
            "rating, total_seats, status FROM buses ORDER BY name";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql);
             ResultSet results = statement.executeQuery()) {
            List<Bus> buses = new ArrayList<>();
            while (results.next()) {
                buses.add(mapBus(results));
            }
            return buses;
        }
    }

    public int countAll() throws SQLException {
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement =
                 connection.prepareStatement("SELECT COUNT(*) FROM buses");
             ResultSet results = statement.executeQuery()) {
            results.next();
            return results.getInt(1);
        }
    }

    public List<Bus> findByOperator(String operatorId) throws SQLException {
        String sql =
            "SELECT id, operator_id, name, bus_type, registration_number, " +
            "rating, total_seats, status FROM buses " +
            "WHERE operator_id = ? ORDER BY name";

        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, operatorId);
            try (ResultSet results = statement.executeQuery()) {
                List<Bus> buses = new ArrayList<>();
                while (results.next()) {
                    buses.add(mapBus(results));
                }
                return buses;
            }
        }
    }

    public boolean updateStatusForOperator(
            String busId, String operatorId, String status) throws SQLException {
        String sql = "UPDATE buses SET status = ? WHERE id = ? AND operator_id = ?";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, status);
            statement.setString(2, busId);
            statement.setString(3, operatorId);
            return statement.executeUpdate() == 1;
        }
    }

    public List<Bus> searchSchedules(
            String source, String destination) throws SQLException {
        String sql =
            "SELECT b.id, b.operator_id, b.name, b.bus_type, " +
            "b.registration_number, b.rating, b.total_seats, b.status, " +
            "s.id AS schedule_id, r.id AS route_id, r.source, " +
            "r.destination, s.departure_time, s.arrival_time, s.base_fare " +
            "FROM schedules s " +
            "JOIN buses b ON b.id = s.bus_id " +
            "JOIN routes r ON r.id = s.route_id " +
            "JOIN operators o ON o.id = b.operator_id " +
            "WHERE s.is_active = TRUE AND b.status = 'active' " +
            "AND o.status = 'active' " +
            "AND LOWER(r.source) = LOWER(?) " +
            "AND LOWER(r.destination) = LOWER(?) " +
            "ORDER BY s.departure_time";

        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, source);
            statement.setString(2, destination);
            try (ResultSet results = statement.executeQuery()) {
                List<Bus> buses = new ArrayList<>();
                while (results.next()) {
                    buses.add(mapScheduledBus(results));
                }
                return buses;
            }
        }
    }

    private Bus mapBus(ResultSet results) throws SQLException {
        return new Bus(
            results.getString("id"),
            results.getString("operator_id"),
            results.getString("name"),
            results.getString("bus_type"),
            results.getString("registration_number"),
            results.getBigDecimal("rating"),
            results.getInt("total_seats"),
            results.getString("status"));
    }

    private Bus mapScheduledBus(ResultSet results) throws SQLException {
        return new Bus(
            results.getString("id"),
            results.getString("operator_id"),
            results.getString("name"),
            results.getString("bus_type"),
            results.getString("registration_number"),
            results.getBigDecimal("rating"),
            results.getInt("total_seats"),
            results.getString("status"),
            results.getString("schedule_id"),
            results.getString("route_id"),
            results.getString("source"),
            results.getString("destination"),
            results.getString("departure_time"),
            results.getString("arrival_time"),
            results.getBigDecimal("base_fare"));
    }
}
