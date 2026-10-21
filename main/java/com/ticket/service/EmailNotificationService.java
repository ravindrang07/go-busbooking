package com.ticket.service;

import com.ticket.model.Booking;

public class EmailNotificationService {

    public String createBookingConfirmation(Booking booking) {
        if (booking == null) {
            throw new IllegalArgumentException("Booking is required.");
        }
        StringBuilder message = new StringBuilder();
        message.append("To: ").append(booking.getPassengerEmail()).append('\n');
        message.append("Subject: GoBus booking confirmation\n\n");
        message.append("Hello ").append(booking.getPassengerName()).append(",\n");
        message.append("Your booking reference is ")
            .append(booking.getPnr()).append(".\n");
        message.append("Route schedule: ").append(booking.getScheduleId())
            .append(" on ").append(booking.getJourneyDate()).append(".\n");
        message.append("Seats: ");
        for (int i = 0; i < booking.getSeatLabels().size(); i++) {
            if (i > 0) message.append(", ");
            message.append(booking.getSeatLabels().get(i));
        }
        message.append("\nTotal: Rs.").append(booking.getGrandTotal());
        message.append("\n\nThis is a console/demo message; no email was sent.");
        return message.toString();
    }

    public void showBookingConfirmation(Booking booking) {
        System.out.println(createBookingConfirmation(booking));
    }
}
