package com.ticket.dao;

import com.ticket.model.Notification;
import com.ticket.util.DatabaseConnection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class NotificationDAO {

    public void create(Notification notification) throws SQLException {
        String sql =
            "INSERT INTO notifications " +
            "(id, user_id, booking_id, type, message) VALUES (?, ?, ?, ?, ?)";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, notification.getId());
            statement.setString(2, notification.getUserId());
            statement.setString(3, notification.getBookingId());
            statement.setString(4, notification.getType());
            statement.setString(5, notification.getMessage());
            statement.executeUpdate();
        }
    }

    public List<Notification> findByUser(String userId) throws SQLException {
        String sql =
            "SELECT id, user_id, booking_id, type, message, is_read, created_at " +
            "FROM notifications WHERE user_id = ? ORDER BY created_at DESC";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, userId);
            try (ResultSet results = statement.executeQuery()) {
                List<Notification> notifications = new ArrayList<>();
                while (results.next()) {
                    notifications.add(mapNotification(results));
                }
                return notifications;
            }
        }
    }

    public boolean markRead(String notificationId, String userId)
            throws SQLException {
        String sql =
            "UPDATE notifications SET is_read = TRUE " +
            "WHERE id = ? AND user_id = ?";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, notificationId);
            statement.setString(2, userId);
            return statement.executeUpdate() == 1;
        }
    }

    private Notification mapNotification(ResultSet results)
            throws SQLException {
        Timestamp createdAt = results.getTimestamp("created_at");
        return new Notification(
            results.getString("id"),
            results.getString("user_id"),
            results.getString("booking_id"),
            results.getString("type"),
            results.getString("message"),
            results.getBoolean("is_read"),
            createdAt == null ? null : createdAt.toString());
    }
}
