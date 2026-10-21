package com.ticket.service;

import com.ticket.dao.FeedbackDAO;
import com.ticket.model.Feedback;
import com.ticket.util.ValidationUtil;
import java.sql.SQLException;
import java.util.List;

public class FeedbackService {

    private final FeedbackDAO feedbackDAO;
    private static int nextId = 1;

    public FeedbackService() {
        this(new FeedbackDAO());
    }

    public FeedbackService(FeedbackDAO feedbackDAO) {
        this.feedbackDAO = feedbackDAO;
    }

    public Feedback submit(
            String userId, String bookingId, int rating, String comments)
            throws SQLException {
        String passengerId = ValidationUtil.requireText(userId, "Passenger ID");
        String bookedId = ValidationUtil.requireText(bookingId, "Booking ID");
        if (rating < 1 || rating > 5) {
            throw new IllegalArgumentException(
                "Rating must be between 1 and 5.");
        }
        String review = ValidationUtil.requireText(comments, "Feedback");
        if (review.length() > 1000) {
            throw new IllegalArgumentException(
                "Feedback cannot be longer than 1000 characters.");
        }

        Feedback feedback = new Feedback(
            createId(), passengerId, bookedId, rating, review, null);
        if (!feedbackDAO.create(feedback)) {
            throw new IllegalArgumentException(
                "Booking was not found or feedback was already submitted.");
        }
        return feedback;
    }

    public List<Feedback> getByPassenger(String userId) throws SQLException {
        return feedbackDAO.findByPassenger(
            ValidationUtil.requireText(userId, "Passenger ID"));
    }

    public List<Feedback> getAll() throws SQLException {
        return feedbackDAO.findAll();
    }

    private static synchronized String createId() {
        return "fb-" + System.currentTimeMillis() + "-" + nextId++;
    }
}
