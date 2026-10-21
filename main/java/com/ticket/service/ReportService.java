package com.ticket.service;

import com.ticket.util.DatabaseConnection;
import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedHashMap;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ReportService {

    public BigDecimal getPaidRevenue() throws SQLException {
        String sql = "SELECT COALESCE(SUM(grand_total), 0) AS total "
            + "FROM bookings WHERE payment_status = 'PAID'";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql);
             ResultSet results = statement.executeQuery()) {
            results.next();
            return results.getBigDecimal("total");
        }
    }

    public Map<String, Integer> getBookingCountsByStatus()
            throws SQLException {
        String sql = "SELECT status, COUNT(*) AS total FROM bookings "
            + "GROUP BY status ORDER BY status";
        Map<String, Integer> counts = new LinkedHashMap<>();
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql);
             ResultSet results = statement.executeQuery()) {
            while (results.next()) {
                counts.put(results.getString("status"),
                    results.getInt("total"));
            }
        }
        return counts;
    }

    public List<Map<String, Object>> getRevenueByOperatorType()
            throws SQLException {
        String sql = "SELECT o.type, COUNT(DISTINCT b.id) AS booking_count, "
            + "COALESCE(SUM(CASE WHEN b.payment_status = 'PAID' "
            + "THEN b.grand_total ELSE 0 END), 0) AS paid_revenue "
            + "FROM operators o LEFT JOIN buses bu ON bu.operator_id = o.id "
            + "LEFT JOIN schedules s ON s.bus_id = bu.id "
            + "LEFT JOIN bookings b ON b.schedule_id = s.id "
            + "GROUP BY o.type ORDER BY o.type";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql);
             ResultSet results = statement.executeQuery()) {
            List<Map<String, Object>> totals = new ArrayList<>();
            while (results.next()) {
                Map<String, Object> total = new LinkedHashMap<>();
                total.put("type", results.getString("type"));
                total.put("bookingCount", results.getInt("booking_count"));
                total.put("paidRevenue",
                    results.getBigDecimal("paid_revenue"));
                totals.add(total);
            }
            return totals;
        }
    }
}
