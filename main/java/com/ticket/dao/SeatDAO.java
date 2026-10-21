package com.ticket.dao;

import com.ticket.model.Seat;
import com.ticket.util.DatabaseConnection;
import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class SeatDAO {

    public List<Seat> findSeats(String scheduleId, Date journeyDate)
            throws SQLException {
        String sql = "SELECT se.seat_label, se.seat_type, se.deck, "
            + "se.is_women_only, s.base_fare, s.sleeper_fare, "
            + "CASE WHEN EXISTS (SELECT 1 FROM booking_seats bs "
            + "JOIN bookings bk ON bk.id = bs.booking_id "
            + "WHERE bs.schedule_id = s.id AND bs.journey_date = ? "
            + "AND bs.seat_label = se.seat_label AND bs.active_lock = 1 "
            + "AND (bk.status <> 'PENDING' OR "
            + "bk.booking_time >= DATE_SUB(NOW(), INTERVAL 15 MINUTE))) "
            + "THEN 0 ELSE 1 END AS available "
            + "FROM schedules s JOIN seats se ON se.bus_id = s.bus_id "
            + "WHERE s.id = ? AND s.is_active = TRUE "
            + "ORDER BY se.deck, se.row_no, se.col_no";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setDate(1, journeyDate);
            statement.setString(2, scheduleId);
            try (ResultSet results = statement.executeQuery()) {
                List<Seat> seats = new ArrayList<>();
                while (results.next()) {
                    String type = results.getString("seat_type");
                    BigDecimal fare = "sleeper".equals(type)
                        ? results.getBigDecimal("sleeper_fare")
                        : results.getBigDecimal("base_fare");
                    if (fare == null) {
                        throw new SQLException("Seat fare is not configured.");
                    }
                    seats.add(new Seat(
                        results.getString("seat_label"), type,
                        results.getString("deck"),
                        results.getBoolean("is_women_only"),
                        results.getBoolean("available"), fare));
                }
                return seats;
            }
        }
    }

    public boolean isSeatAvailable(
            String scheduleId, Date journeyDate, String seatLabel)
            throws SQLException {
        for (Seat seat : findSeats(scheduleId, journeyDate)) {
            if (seat.getLabel().equals(seatLabel)) {
                return seat.isAvailable();
            }
        }
        return false;
    }

    public BigDecimal calculateFare(
            String scheduleId, Date journeyDate, List<String> seatLabels)
            throws SQLException {
        List<Seat> seats = findSeats(scheduleId, journeyDate);
        BigDecimal total = BigDecimal.ZERO;
        for (String label : seatLabels) {
            Seat selectedSeat = null;
            for (Seat seat : seats) {
                if (seat.getLabel().equals(label)) {
                    selectedSeat = seat;
                    break;
                }
            }
            if (selectedSeat == null || !selectedSeat.isAvailable()) {
                throw new IllegalArgumentException(
                    "Seat is unavailable or does not exist: " + label);
            }
            total = total.add(selectedSeat.getFare());
        }
        return total;
    }
}
