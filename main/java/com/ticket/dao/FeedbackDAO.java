package com.ticket.dao;

import com.ticket.model.Feedback;
import com.ticket.util.DatabaseConnection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class FeedbackDAO {

    public boolean create(Feedback feedback) throws SQLException {
        String sql =
            "INSERT INTO feedback (id, user_id, booking_id, rating, comments) " +
            "SELECT ?, ?, id, ?, ? FROM bookings " +
            "WHERE id = ? AND user_id = ?";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, feedback.getId());
            statement.setString(2, feedback.getUserId());
            statement.setInt(3, feedback.getRating());
            statement.setString(4, feedback.getComments());
            statement.setString(5, feedback.getBookingId());
            statement.setString(6, feedback.getUserId());
            return statement.executeUpdate() == 1;
        }
    }

    public List<Feedback> findByPassenger(String userId) throws SQLException {
        String sql =
            "SELECT id, user_id, booking_id, rating, comments, created_at " +
            "FROM feedback WHERE user_id = ? ORDER BY created_at DESC";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, userId);
            try (ResultSet results = statement.executeQuery()) {
                List<Feedback> feedback = new ArrayList<>();
                while (results.next()) {
                    feedback.add(mapFeedback(results));
                }
                return feedback;
            }
        }
    }

    public List<Feedback> findAll() throws SQLException {
        String sql =
            "SELECT id, user_id, booking_id, rating, comments, created_at " +
            "FROM feedback ORDER BY created_at DESC";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql);
             ResultSet results = statement.executeQuery()) {
            List<Feedback> feedback = new ArrayList<>();
            while (results.next()) {
                feedback.add(mapFeedback(results));
            }
            return feedback;
        }
    }

    private Feedback mapFeedback(ResultSet results) throws SQLException {
        Timestamp createdAt = results.getTimestamp("created_at");
        return new Feedback(
            results.getString("id"),
            results.getString("user_id"),
            results.getString("booking_id"),
            results.getInt("rating"),
            results.getString("comments"),
            createdAt == null ? null : createdAt.toString());
    }
}
