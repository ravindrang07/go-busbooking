package com.ticket.dao;

import com.ticket.util.DatabaseConnection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class OperatorDAO {

    public List<Map<String, Object>> findAll() throws SQLException {
        String sql = "SELECT o.id, o.name, o.type, o.category_badge, o.email, "
            + "o.phone, o.license_number, o.status, o.rating, "
            + "(SELECT COUNT(*) FROM buses b WHERE b.operator_id = o.id) "
            + "AS fleet_count FROM operators o ORDER BY o.name";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql);
             ResultSet results = statement.executeQuery()) {
            List<Map<String, Object>> operators = new ArrayList<>();
            while (results.next()) {
                Map<String, Object> operator = new LinkedHashMap<>();
                operator.put("id", results.getString("id"));
                operator.put("name", results.getString("name"));
                operator.put("type", results.getString("type"));
                operator.put("categoryBadge", results.getString("category_badge"));
                operator.put("email", results.getString("email"));
                operator.put("phone", results.getString("phone"));
                operator.put("licenseNumber", results.getString("license_number"));
                operator.put("status", results.getString("status"));
                operator.put("rating", results.getBigDecimal("rating"));
                operator.put("fleetCount", results.getInt("fleet_count"));
                operators.add(operator);
            }
            return operators;
        }
    }

    public boolean updateStatus(String operatorId, String status)
            throws SQLException {
        String sql = "UPDATE operators SET status = ? WHERE id = ?";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, status);
            statement.setString(2, operatorId);
            return statement.executeUpdate() == 1;
        }
    }
}
