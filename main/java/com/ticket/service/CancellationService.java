package com.ticket.service;

import com.ticket.dao.BookingDAO;
import com.ticket.model.Booking;
import com.ticket.model.UserSession;
import com.ticket.util.ValidationUtil;
import java.sql.SQLException;

public class CancellationService {

    private final BookingDAO bookingDAO;
    private final NotificationService notificationService;

    public CancellationService() {
        this(new BookingDAO(), new NotificationService());
    }

    public CancellationService(BookingDAO bookingDAO) {
        this(bookingDAO, new NotificationService());
    }

    public CancellationService(
            BookingDAO bookingDAO, NotificationService notificationService) {
        this.bookingDAO = bookingDAO;
        this.notificationService = notificationService;
    }

    public void cancel(String pnr, UserSession user) throws SQLException {
        ValidationUtil.requireText(pnr, "PNR");
        if (user == null || (!"passenger".equals(user.getRole())
                && !"admin".equals(user.getRole()))) {
            throw new IllegalArgumentException(
                "Only the passenger or an administrator can cancel this booking.");
        }
        String ownerId = "admin".equals(user.getRole())
            ? "admin" : user.getUserId();
        Booking booking = bookingDAO.findByPnr(pnr.trim());
        if (booking == null) {
            throw new IllegalArgumentException(
                "Booking was not found or cannot be cancelled.");
        }
        if (!bookingDAO.cancel(pnr.trim(), ownerId)) {
            throw new IllegalArgumentException(
                "Booking was not found or cannot be cancelled.");
        }
        if (booking.getPassengerId() != null) {
            notificationService.createCancellationNotification(booking);
        }
    }
}
