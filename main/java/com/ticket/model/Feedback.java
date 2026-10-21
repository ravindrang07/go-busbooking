package com.ticket.model;

public class Feedback {

    private final String id;
    private final String userId;
    private final String bookingId;
    private final int rating;
    private final String comments;
    private final String createdAt;

    public Feedback(
            String id, String userId, String bookingId, int rating,
            String comments, String createdAt) {
        this.id = id;
        this.userId = userId;
        this.bookingId = bookingId;
        this.rating = rating;
        this.comments = comments;
        this.createdAt = createdAt;
    }

    public String getId() { return id; }
    public String getUserId() { return userId; }
    public String getBookingId() { return bookingId; }
    public int getRating() { return rating; }
    public String getComments() { return comments; }
    public String getCreatedAt() { return createdAt; }
}
