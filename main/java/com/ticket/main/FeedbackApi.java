package com.ticket.main;

import com.ticket.model.Feedback;
import com.ticket.model.UserSession;
import com.ticket.service.FeedbackService;
import com.ticket.util.ApiResponse;
import java.sql.SQLException;
import java.util.List;

public class FeedbackApi {

    private final FeedbackService feedbackService;

    public FeedbackApi() {
        this(new FeedbackService());
    }

    public FeedbackApi(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    public ApiResponse<Feedback> submit(
            UserSession user, String bookingId, int rating, String comments)
            throws SQLException {
        requirePassenger(user);
        return ApiResponse.success(feedbackService.submit(
            user.getUserId(), bookingId, rating, comments));
    }

    public ApiResponse<List<Feedback>> list(UserSession user)
            throws SQLException {
        if (user == null) {
            throw new IllegalArgumentException("Please log in first.");
        }
        if ("admin".equals(user.getRole())) {
            return ApiResponse.success(feedbackService.getAll());
        }
        requirePassenger(user);
        return ApiResponse.success(
            feedbackService.getByPassenger(user.getUserId()));
    }

    private static void requirePassenger(UserSession user) {
        if (user == null || !"passenger".equals(user.getRole())) {
            throw new IllegalArgumentException(
                "Only passengers can submit feedback.");
        }
    }
}
