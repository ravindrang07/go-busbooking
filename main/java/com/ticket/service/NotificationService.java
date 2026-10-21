package com.ticket.service;

import com.ticket.dao.NotificationDAO;
import com.ticket.model.Booking;
import com.ticket.model.Notification;
import com.ticket.util.ValidationUtil;
import java.sql.SQLException;
import java.util.List;

public class NotificationService {

    private final NotificationDAO notificationDAO;
    private static int nextId = 1;

    public NotificationService() {
        this(new NotificationDAO());
    }

    public NotificationService(NotificationDAO notificationDAO) {
        this.notificationDAO = notificationDAO;
    }

    public Notification createBookingNotification(Booking booking)
            throws SQLException {
        if (booking == null) {
            throw new IllegalArgumentException("Booking is required.");
        }
        return create(
            booking.getPassengerId(), booking.getId(), "BOOKING",
            "Your GoBus booking " + booking.getPnr() + " has been created.");
    }

    public Notification createCancellationNotification(Booking booking)
            throws SQLException {
        if (booking == null) {
            throw new IllegalArgumentException("Booking is required.");
        }
        return create(
            booking.getPassengerId(), booking.getId(), "CANCELLATION",
            "Your GoBus booking " + booking.getPnr() + " has been cancelled.");
    }

    public List<Notification> getByUser(String userId) throws SQLException {
        return notificationDAO.findByUser(
            ValidationUtil.requireText(userId, "User ID"));
    }

    public boolean markRead(String notificationId, String userId)
            throws SQLException {
        return notificationDAO.markRead(
            ValidationUtil.requireText(notificationId, "Notification ID"),
            ValidationUtil.requireText(userId, "User ID"));
    }

    private Notification create(
            String userId, String bookingId, String type, String message)
            throws SQLException {
        String recipientId = ValidationUtil.requireText(userId, "User ID");
        Notification notification = new Notification(
            createId(), recipientId, bookingId, type, message, false, null);
        notificationDAO.create(notification);
        return notification;
    }

    private static synchronized String createId() {
        return "nt-" + System.currentTimeMillis() + "-" + nextId++;
    }
}
