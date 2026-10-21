package com.ticket.dao;

import com.ticket.model.Booking;
import com.ticket.util.DatabaseConnection;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
public class BookingDAO {

    public Booking findByPnr(String pnr) throws SQLException {
        String sql =
            "SELECT id, pnr, user_id, schedule_id, journey_date, " +
            "boarding_point_id, dropping_point_id, passenger_name, " +
            "passenger_email, passenger_phone, passenger_gender, " +
            "passenger_age, total_fare, tax, grand_total, status, " +
            "payment_method, payment_status " +
            "FROM bookings WHERE pnr = ?";

        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, pnr);
            try (ResultSet results = statement.executeQuery()) {
                if (!results.next()) {
                    return null;
                }
                return mapBooking(connection, results);
            }
        }
    }

    public List<Booking> findByPassenger(String passengerId)
            throws SQLException {
        String sql =
            "SELECT id, pnr, user_id, schedule_id, journey_date, " +
            "boarding_point_id, dropping_point_id, passenger_name, " +
            "passenger_email, passenger_phone, passenger_gender, " +
            "passenger_age, total_fare, tax, grand_total, status, " +
            "payment_method, payment_status " +
            "FROM bookings WHERE user_id = ? ORDER BY booking_time DESC";

        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, passengerId);
            try (ResultSet results = statement.executeQuery()) {
                List<Booking> bookings = new ArrayList<>();
                while (results.next()) {
                    bookings.add(mapBooking(connection, results));
                }
                return bookings;
            }
        }
    }

    public List<Booking> findAll() throws SQLException {
        String sql =
            "SELECT id, pnr, user_id, schedule_id, journey_date, " +
            "boarding_point_id, dropping_point_id, passenger_name, " +
            "passenger_email, passenger_phone, passenger_gender, " +
            "passenger_age, total_fare, tax, grand_total, status, " +
            "payment_method, payment_status FROM bookings " +
            "ORDER BY booking_time DESC";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql);
             ResultSet results = statement.executeQuery()) {
            List<Booking> bookings = new ArrayList<>();
            while (results.next()) {
                bookings.add(mapBooking(connection, results));
            }
            return bookings;
        }
    }

    public int countAll() throws SQLException {
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement =
                 connection.prepareStatement("SELECT COUNT(*) FROM bookings");
             ResultSet results = statement.executeQuery()) {
            results.next();
            return results.getInt(1);
        }
    }

    public List<Booking> findByOperator(String operatorId)
            throws SQLException {
        String sql =
            "SELECT bk.id, bk.pnr, bk.user_id, bk.schedule_id, bk.journey_date, " +
            "bk.boarding_point_id, bk.dropping_point_id, bk.passenger_name, " +
            "bk.passenger_email, bk.passenger_phone, bk.passenger_gender, " +
            "bk.passenger_age, bk.total_fare, bk.tax, bk.grand_total, bk.status, " +
            "bk.payment_method, bk.payment_status FROM bookings bk " +
            "JOIN schedules s ON s.id = bk.schedule_id " +
            "JOIN buses b ON b.id = s.bus_id WHERE b.operator_id = ? " +
            "ORDER BY bk.booking_time DESC";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, operatorId);
            try (ResultSet results = statement.executeQuery()) {
                List<Booking> bookings = new ArrayList<>();
                while (results.next()) {
                    bookings.add(mapBooking(connection, results));
                }
                return bookings;
            }
        }
    }

    public void create(Booking booking) throws SQLException {
        String bookingSql =
            "INSERT INTO bookings " +
            "(id, pnr, user_id, schedule_id, journey_date, " +
            "boarding_point_id, dropping_point_id, passenger_name, " +
            "passenger_email, passenger_phone, passenger_gender, " +
            "passenger_age, total_fare, tax, grand_total, status, " +
            "payment_method, payment_status) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        String seatSql =
            "INSERT INTO booking_seats " +
            "(booking_id, schedule_id, journey_date, seat_label, active_lock) " +
            "VALUES (?, ?, ?, ?, 1)";

        try (Connection connection = DatabaseConnection.getConnection()) {
            connection.setAutoCommit(false);
            try {
                try (PreparedStatement cleanup =
                         connection.prepareStatement(
                             "UPDATE booking_seats bs JOIN bookings b " +
                             "ON b.id = bs.booking_id SET bs.active_lock = NULL " +
                             "WHERE b.status = 'PENDING' " +
                             "AND b.booking_time < DATE_SUB(NOW(), INTERVAL 15 MINUTE) " +
                             "AND bs.active_lock = 1")) {
                    cleanup.executeUpdate();
                }
                try (PreparedStatement statement =
                         connection.prepareStatement(bookingSql)) {
                    statement.setString(1, booking.getId());
                    statement.setString(2, booking.getPnr());
                    statement.setString(3, booking.getPassengerId());
                    statement.setString(4, booking.getScheduleId());
                    statement.setDate(5, Date.valueOf(booking.getJourneyDate()));
                    statement.setString(6, booking.getBoardingPointId());
                    statement.setString(7, booking.getDroppingPointId());
                    statement.setString(8, booking.getPassengerName());
                    statement.setString(9, booking.getPassengerEmail());
                    statement.setString(10, booking.getPassengerPhone());
                    statement.setString(11, booking.getPassengerGender());
                    statement.setInt(12, booking.getPassengerAge());
                    statement.setBigDecimal(13, booking.getTotalFare());
                    statement.setBigDecimal(14, booking.getTax());
                    statement.setBigDecimal(15, booking.getGrandTotal());
                    statement.setString(16, booking.getStatus());
                    statement.setString(17, booking.getPaymentMethod());
                    statement.setString(18, booking.getPaymentStatus());
                    statement.executeUpdate();
                }

                try (PreparedStatement statement =
                         connection.prepareStatement(seatSql)) {
                    for (String seatLabel : booking.getSeatLabels()) {
                        statement.setString(1, booking.getId());
                        statement.setString(2, booking.getScheduleId());
                        statement.setDate(
                            3, Date.valueOf(booking.getJourneyDate()));
                        statement.setString(4, seatLabel);
                        statement.addBatch();
                    }
                    statement.executeBatch();
                }

                connection.commit();
            } catch (SQLException e) {
                try {
                    connection.rollback();
                } catch (SQLException rollbackError) {
                    e.addSuppressed(rollbackError);
                }
                throw e;
            } finally {
                connection.setAutoCommit(true);
            }
        }
    }

    public boolean cancel(String pnr, String passengerId)
            throws SQLException {
        String bookingSql =
            "UPDATE bookings SET status = 'CANCELLED' " +
            "WHERE pnr = ? AND (user_id = ? OR ? = 'admin') " +
            "AND status IN ('PENDING','CONFIRMED')";
        try (Connection connection = DatabaseConnection.getConnection()) {
            connection.setAutoCommit(false);
            try {
                int updated;
                try (PreparedStatement statement =
                         connection.prepareStatement(bookingSql)) {
                    statement.setString(1, pnr);
                    statement.setString(2, passengerId);
                    statement.setString(3, passengerId);
                    updated = statement.executeUpdate();
                }
                if (updated == 0) {
                    connection.rollback();
                    return false;
                }
                try (PreparedStatement statement = connection.prepareStatement(
                        "UPDATE booking_seats SET active_lock = NULL " +
                        "WHERE booking_id = (SELECT id FROM bookings WHERE pnr = ?)")) {
                    statement.setString(1, pnr);
                    statement.executeUpdate();
                }
                connection.commit();
                return true;
            } catch (SQLException e) {
                try {
                    connection.rollback();
                } catch (SQLException rollbackError) {
                    e.addSuppressed(rollbackError);
                }
                throw e;
            } finally {
                connection.setAutoCommit(true);
            }
        }
    }

    public boolean updatePaymentStatus(String pnr, String paymentStatus)
            throws SQLException {
        if (!"PAID".equals(paymentStatus) && !"REFUNDED".equals(paymentStatus)) {
            throw new IllegalArgumentException("Invalid payment status.");
        }
        String bookingStatus = "PAID".equals(paymentStatus) ? "CONFIRMED" : null;
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(
                 "UPDATE bookings SET payment_status = ?, " +
                 "status = COALESCE(?, status) WHERE pnr = ? " +
                 "AND ((? = 'PAID' AND payment_status = 'PENDING' " +
                 "AND status = 'PENDING') OR (? = 'REFUNDED' " +
                 "AND payment_status = 'PAID' AND status = 'CANCELLED'))")) {
            statement.setString(1, paymentStatus);
            statement.setString(2, bookingStatus);
            statement.setString(3, pnr);
            statement.setString(4, paymentStatus);
            statement.setString(5, paymentStatus);
            return statement.executeUpdate() == 1;
        }
    }

    public boolean attachRazorpayOrder(
            String pnr, String passengerId, String orderId) throws SQLException {
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(
                 "UPDATE bookings SET razorpay_order_id = ? WHERE pnr = ? "
                 + "AND user_id = ? AND status = 'PENDING' "
                 + "AND payment_status = 'PENDING' "
                 + "AND razorpay_order_id IS NULL")) {
            statement.setString(1, orderId);
            statement.setString(2, pnr);
            statement.setString(3, passengerId);
            return statement.executeUpdate() == 1;
        }
    }

    public String findRazorpayOrder(
            String pnr, String passengerId) throws SQLException {
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(
                 "SELECT razorpay_order_id FROM bookings "
                 + "WHERE pnr = ? AND user_id = ?")) {
            statement.setString(1, pnr);
            statement.setString(2, passengerId);
            try (ResultSet results = statement.executeQuery()) {
                return results.next()
                    ? results.getString("razorpay_order_id") : null;
            }
        }
    }

    public boolean markRazorpayPaymentPaid(
            String pnr, String passengerId, String orderId, String paymentId)
            throws SQLException {
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(
                 "UPDATE bookings SET payment_status = 'PAID', "
                 + "status = 'CONFIRMED', razorpay_payment_id = ? "
                 + "WHERE pnr = ? AND user_id = ? AND razorpay_order_id = ? "
                 + "AND status = 'PENDING' AND payment_status = 'PENDING'")) {
            statement.setString(1, paymentId);
            statement.setString(2, pnr);
            statement.setString(3, passengerId);
            statement.setString(4, orderId);
            return statement.executeUpdate() == 1;
        }
    }

    public boolean updateBusStatus(String busId, String status)
            throws SQLException {
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(
                 "UPDATE buses SET status = ? WHERE id = ?")) {
            statement.setString(1, status);
            statement.setString(2, busId);
            return statement.executeUpdate() == 1;
        }
    }

    private Booking mapBooking(Connection connection, ResultSet result)
            throws SQLException {
        String bookingId = result.getString("id");
        List<String> seats = new ArrayList<>();
        String seatSql =
            "SELECT seat_label FROM booking_seats " +
            "WHERE booking_id = ? ORDER BY seat_label";
        try (PreparedStatement statement = connection.prepareStatement(seatSql)) {
            statement.setString(1, bookingId);
            try (ResultSet seatResults = statement.executeQuery()) {
                while (seatResults.next()) {
                    seats.add(seatResults.getString("seat_label"));
                }
            }
        }

        return new Booking(
            bookingId,
            result.getString("pnr"),
            result.getString("user_id"),
            result.getString("schedule_id"),
            result.getDate("journey_date").toString(),
            result.getString("boarding_point_id"),
            result.getString("dropping_point_id"),
            result.getString("passenger_name"),
            result.getString("passenger_email"),
            result.getString("passenger_phone"),
            result.getString("passenger_gender"),
            result.getInt("passenger_age"),
            seats,
            result.getBigDecimal("total_fare"),
            result.getBigDecimal("tax"),
            result.getBigDecimal("grand_total"),
            result.getString("status"),
            result.getString("payment_method"),
            result.getString("payment_status"));
    }
}
