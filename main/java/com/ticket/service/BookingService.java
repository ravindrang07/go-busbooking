
package com.ticket.service;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.math.BigDecimal;
import java.math.RoundingMode;

public class BookingService {

    private static final String URL =
        "jdbc:mysql://127.0.0.1:3306/gobus";
    private static final String USER = "root";
    private static final String PASSWORD = "";

    public static boolean isSeatAvailable(
            String scheduleId, String date, String seatLabel)
            throws SQLException {

        String sql =
            "SELECT COUNT(*) FROM booking_seats " +
            "WHERE schedule_id = ? AND journey_date = ? " +
            "AND seat_label = ? AND active_lock = 1";

        try (Connection con =
                 DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, scheduleId);
            ps.setDate(2, Date.valueOf(date));
            ps.setString(3, seatLabel);

            try (ResultSet rs = ps.executeQuery()) {
                return rs.next() && rs.getInt(1) == 0;
            }
        }
    }

    public static BigDecimal calculateTax(BigDecimal fare) {
        return fare.multiply(new BigDecimal("0.05"))
                   .setScale(2, RoundingMode.HALF_UP);
    }

    public static String saveDemoBooking(
            String scheduleId,
            String date,
            String seatLabel,
            String boardingPointId,
            String droppingPointId,
            String passengerName,
            String email,
            String phone,
            String gender,
            int age,
            String paymentMethod) throws SQLException {

        if (age < 1 || age > 120) {
            throw new IllegalArgumentException("Invalid passenger age.");
        }

        if (!gender.equals("male") &&
            !gender.equals("female") &&
            !gender.equals("other")) {
            throw new IllegalArgumentException("Invalid gender.");
        }

        if (!paymentMethod.equals("UPI") &&
            !paymentMethod.equals("Credit/Debit Card") &&
            !paymentMethod.equals("NetBanking")) {
            throw new IllegalArgumentException("Invalid payment method.");
        }

        Date journeyDate = Date.valueOf(date);

        if (journeyDate.before(new Date(System.currentTimeMillis()))) {
            throw new IllegalArgumentException(
                "Journey date cannot be in the past.");
        }

        String bookingId = "bk-" + System.currentTimeMillis();
        String time = Long.toString(System.currentTimeMillis());
        String pnr = "GB" + time.substring(time.length() - 10);

        try (Connection con =
                 DriverManager.getConnection(URL, USER, PASSWORD)) {

            con.setAutoCommit(false);

            try {
                BigDecimal fare;

                String fareSql =
                    "SELECT s.base_fare, s.sleeper_fare, se.seat_type, " +
                    "s.route_id, b.id AS bus_id " +
                    "FROM schedules s " +
                    "JOIN buses b ON b.id = s.bus_id " +
                    "JOIN seats se ON se.bus_id = s.bus_id " +
                    "WHERE s.id = ? AND se.seat_label = ? " +
                    "AND s.is_active = 1 FOR UPDATE";

                try (PreparedStatement ps =
                         con.prepareStatement(fareSql)) {
                    ps.setString(1, scheduleId);
                    ps.setString(2, seatLabel);

                    try (ResultSet rs = ps.executeQuery()) {
                        if (!rs.next()) {
                            throw new SQLException(
                                "Schedule or seat not found.");
                        }

                        String routeId = rs.getString("route_id");
                        String seatType = rs.getString("seat_type");

                        fare = "sleeper".equals(seatType)
                            ? rs.getBigDecimal("sleeper_fare")
                            : rs.getBigDecimal("base_fare");

                        if (fare == null) {
                            throw new SQLException("Fare not configured.");
                        }

                        checkPoint(con, "boarding_points",
                            boardingPointId, routeId);
                        checkPoint(con, "dropping_points",
                            droppingPointId, routeId);
                    }
                }

                String seatSql =
                    "SELECT COUNT(*) FROM booking_seats " +
                    "WHERE schedule_id = ? AND journey_date = ? " +
                    "AND seat_label = ? AND active_lock = 1";

                try (PreparedStatement ps =
                         con.prepareStatement(seatSql)) {
                    ps.setString(1, scheduleId);
                    ps.setDate(2, journeyDate);
                    ps.setString(3, seatLabel);

                    try (ResultSet rs = ps.executeQuery()) {
                        rs.next();
                        if (rs.getInt(1) > 0) {
                            throw new SQLException(
                                "This seat is already booked.");
                        }
                    }
                }

                BigDecimal tax = calculateTax(fare);
                BigDecimal total = fare.add(tax);

                String insertBooking =
                    "INSERT INTO bookings " +
                    "(id, pnr, user_id, schedule_id, journey_date, " +
                    "boarding_point_id, dropping_point_id, " +
                    "passenger_name, passenger_email, passenger_phone, " +
                    "passenger_gender, passenger_age, total_fare, tax, " +
                    "grand_total, status, payment_method, payment_status) " +
                    "VALUES (?, ?, NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, " +
                    "?, 'CONFIRMED', ?, 'PENDING')";

                try (PreparedStatement ps =
                         con.prepareStatement(insertBooking)) {
                    ps.setString(1, bookingId);
                    ps.setString(2, pnr);
                    ps.setString(3, scheduleId);
                    ps.setDate(4, journeyDate);
                    ps.setString(5, boardingPointId);
                    ps.setString(6, droppingPointId);
                    ps.setString(7, passengerName);
                    ps.setString(8, email);
                    ps.setString(9, phone);
                    ps.setString(10, gender);
                    ps.setInt(11, age);
                    ps.setBigDecimal(12, fare);
                    ps.setBigDecimal(13, tax);
                    ps.setBigDecimal(14, total);
                    ps.setString(15, paymentMethod);
                    ps.executeUpdate();
                }

                String insertSeat =
                    "INSERT INTO booking_seats " +
                    "(booking_id, schedule_id, journey_date, " +
                    "seat_label, active_lock) VALUES (?, ?, ?, ?, 1)";

                try (PreparedStatement ps =
                         con.prepareStatement(insertSeat)) {
                    ps.setString(1, bookingId);
                    ps.setString(2, scheduleId);
                    ps.setDate(3, journeyDate);
                    ps.setString(4, seatLabel);
                    ps.executeUpdate();
                }

                con.commit();

                System.out.println(
                    "DEMO ONLY — no real payment has been processed.");
                System.out.println("PNR: " + pnr);
                System.out.println("Fare: Rs." + fare);
                System.out.println("Tax: Rs." + tax);
                System.out.println("Total: Rs." + total);
                System.out.println("Payment status: PENDING");

                return pnr;

            } catch (Exception e) {
                con.rollback();
                if (e instanceof SQLException) {
                    throw (SQLException) e;
                }
                throw new SQLException("Booking failed.", e);
            } finally {
                con.setAutoCommit(true);
            }
        }
    }

    private static void checkPoint(
            Connection con, String table, String pointId, String routeId)
            throws SQLException {

        if (!table.equals("boarding_points") &&
            !table.equals("dropping_points")) {
            throw new IllegalArgumentException("Invalid point table.");
        }

        String sql = "SELECT COUNT(*) FROM " + table +
                     " WHERE id = ? AND route_id = ?";

        try (PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, pointId);
            ps.setString(2, routeId);

            try (ResultSet rs = ps.executeQuery()) {
                rs.next();
                if (rs.getInt(1) == 0) {
                    throw new SQLException(
                        "Invalid boarding or dropping point.");
                }
            }
        }
    }
}
