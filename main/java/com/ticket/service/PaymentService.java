package com.ticket.service;

import com.ticket.dao.BookingDAO;
import com.ticket.model.Booking;
import com.ticket.model.Payment;
import com.ticket.model.UserSession;
import com.ticket.util.ApiResponse;
import com.ticket.util.ValidationUtil;
import java.sql.SQLException;

public class PaymentService {

    private final BookingDAO bookingDAO;

    public PaymentService() {
        this(new BookingDAO());
    }

    PaymentService(BookingDAO bookingDAO) {
        this.bookingDAO = bookingDAO;
    }

    public Payment findPayment(String pnr) throws SQLException {
        Booking booking = bookingDAO.findByPnr(
            ValidationUtil.requireText(pnr, "PNR"));
        if (booking == null) return null;
        return new Payment(booking.getId(), booking.getPnr(),
            booking.getPaymentMethod(), booking.getPaymentStatus(),
            booking.getGrandTotal());
    }

    public ApiResponse<Payment> findPaymentForUser(
            String pnr, UserSession user) throws SQLException {
        if (user == null) {
            return ApiResponse.error("Please log in first.");
        }
        Payment payment = findPayment(pnr);
        if (payment == null) {
            return ApiResponse.error("Payment was not found.");
        }
        Booking booking = bookingDAO.findByPnr(pnr);
        if (!"admin".equals(user.getRole())
                && (booking.getPassengerId() == null
                || !booking.getPassengerId().equals(user.getUserId()))) {
            return ApiResponse.error("You cannot view another passenger's payment.");
        }
        return ApiResponse.success(payment);
    }

    public void updatePaymentStatus(String pnr, String status)
            throws SQLException {
        if (!"PAID".equals(status) && !"REFUNDED".equals(status)) {
            throw new IllegalArgumentException("Invalid payment status.");
        }
        if (!bookingDAO.updatePaymentStatus(pnr, status)) {
            throw new IllegalArgumentException(
                "Payment status could not be updated.");
        }
    }
}
