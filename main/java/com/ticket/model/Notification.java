package com.ticket.model;

public class Notification {

    private final String id;
    private final String userId;
    private final String bookingId;
    private final String type;
    private final String message;
    private final boolean read;
    private final String createdAt;

    public Notification(
            String id, String userId, String bookingId, String type,
            String message, boolean read, String createdAt) {
        this.id = id;
        this.userId = userId;
        this.bookingId = bookingId;
        this.type = type;
        this.message = message;
        this.read = read;
        this.createdAt = createdAt;
    }

    public String getId() { return id; }
    public String getUserId() { return userId; }
    public String getBookingId() { return bookingId; }
    public String getType() { return type; }
    public String getMessage() { return message; }
    public boolean isRead() { return read; }
    public String getCreatedAt() { return createdAt; }
}
