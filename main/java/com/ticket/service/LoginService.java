package com.ticket.service;

import com.ticket.model.UserSession;
import com.ticket.util.DatabaseConnection;
import com.ticket.util.PasswordUtil;
import com.ticket.util.ValidationUtil;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class LoginService {

    public UserSession login(String email, String password)
            throws SQLException {
        String validEmail = ValidationUtil.requireEmail(email);
        if (password == null || password.trim().isEmpty()) {
            throw new IllegalArgumentException("Password is required.");
        }

        String sql = "SELECT u.id, u.name, u.email, u.phone, "
            + "u.password_hash, u.role, u.operator_id, o.type AS operator_type "
            + "FROM users u LEFT JOIN operators o ON o.id = u.operator_id "
            + "WHERE u.email = ?";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, validEmail);
            try (ResultSet results = statement.executeQuery()) {
                if (!results.next()
                        || !new PasswordUtil().passwordMatches(
                            connection, password,
                            results.getString("password_hash"))) {
                    return null;
                }
                return new UserSession(
                    results.getString("id"), results.getString("name"),
                    results.getString("email"), results.getString("phone"),
                    results.getString("role"),
                    results.getString("operator_id"),
                    results.getString("operator_type"));
            }
        }
    }
}
