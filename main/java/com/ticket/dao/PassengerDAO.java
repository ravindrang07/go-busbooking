package com.ticket.dao;

import com.ticket.model.Passenger;
import com.ticket.util.DatabaseConnection;
import com.ticket.util.PasswordUtil;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
public class PassengerDAO {

    public Passenger findByEmail(String email)
            throws SQLException {
        String sql =
            "SELECT id, name, email, phone FROM users " +
            "WHERE email = ? AND role = 'passenger'";

        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, email);
            try (ResultSet results = statement.executeQuery()) {
                if (!results.next()) {
                    return null;
                }
                return new Passenger(
                    results.getString("id"),
                    results.getString("name"),
                    results.getString("email"),
                    results.getString("phone"));
            }
        }
    }

    public void create(Passenger passenger, String password)
            throws SQLException {
        String sql =
            "INSERT INTO users " +
            "(id, name, email, phone, password_hash, role, operator_id) " +
            "VALUES (?, ?, ?, ?, ?, 'passenger', NULL)";

        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            String passwordHash = new PasswordUtil()
                .hashPassword(connection, password);
            statement.setString(1, passenger.getId());
            statement.setString(2, passenger.getName());
            statement.setString(3, passenger.getEmail());
            statement.setString(4, passenger.getPhone());
            statement.setString(5, passwordHash);
            statement.executeUpdate();
        }
    }
}
