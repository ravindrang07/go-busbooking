package com.ticket.service;

import com.ticket.model.Booking;
import com.ticket.util.DateTimeUtil;
import com.ticket.util.ValidationUtil;
import java.math.BigDecimal;
import java.util.HashSet;

public class BookingValidator {

    private final FareCalculator fareCalculator = new FareCalculator();

    public void validate(Booking booking) {
        if (booking == null) {
            throw new IllegalArgumentException("Booking is required.");
        }
        requireText(booking.getId(), "Booking ID");
        requireText(booking.getPnr(), "PNR");
        requireText(booking.getScheduleId(), "Schedule ID");
        requireText(booking.getBoardingPointId(), "Boarding point");
        requireText(booking.getDroppingPointId(), "Dropping point");
        ValidationUtil.requireName(booking.getPassengerName());
        ValidationUtil.requireEmail(booking.getPassengerEmail());
        ValidationUtil.requirePhone(booking.getPassengerPhone());
        new DateTimeUtil().requireTodayOrFuture(booking.getJourneyDate());

        if (booking.getPassengerAge() < 1 || booking.getPassengerAge() > 120) {
            throw new IllegalArgumentException("Invalid passenger age.");
        }
        if (!"male".equals(booking.getPassengerGender())
                && !"female".equals(booking.getPassengerGender())
                && !"other".equals(booking.getPassengerGender())) {
            throw new IllegalArgumentException("Invalid passenger gender.");
        }
        if (booking.getSeatLabels() == null || booking.getSeatLabels().isEmpty()) {
            throw new IllegalArgumentException(
                "At least one seat must be selected.");
        }
        if (booking.getSeatLabels().size()
                != new HashSet<>(booking.getSeatLabels()).size()) {
            throw new IllegalArgumentException(
                "A seat cannot be selected more than once.");
        }
        if (!"UPI".equals(booking.getPaymentMethod())
                && !"Credit/Debit Card".equals(booking.getPaymentMethod())
                && !"NetBanking".equals(booking.getPaymentMethod())) {
            throw new IllegalArgumentException("Invalid payment method.");
        }

        BigDecimal total = booking.getTotalFare();
        BigDecimal tax = booking.getTax();
        BigDecimal grandTotal = booking.getGrandTotal();
        if (total == null || tax == null || grandTotal == null
                || total.signum() <= 0 || tax.signum() < 0
                || tax.compareTo(fareCalculator.calculateTax(total)) != 0
                || grandTotal.compareTo(fareCalculator.calculateGrandTotal(total)) != 0) {
            throw new IllegalArgumentException(
                "Booking fare totals do not match.");
        }
    }

    private void requireText(String value, String field) {
        ValidationUtil.requireText(value, field);
    }
}
