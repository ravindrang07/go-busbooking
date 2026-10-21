package com.ticket;

import org.junit.Test;

import com.ticket.model.Booking;
import com.ticket.util.DateTimeUtil;
import com.ticket.model.UserSession;
import com.ticket.service.EmailNotificationService;
import com.ticket.service.FareCalculator;
import com.ticket.service.SessionService;
import java.math.BigDecimal;
import java.sql.Date;
import java.util.Arrays;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class ExtraServicesTest {

    @Test
    public void calculatesFareAndTax() {
        FareCalculator calculator = new FareCalculator();
        BigDecimal total = calculator.calculateTotalFare(
            new BigDecimal("100.00"), 2);
        assertEquals(new BigDecimal("200.00"), total);
        assertEquals(new BigDecimal("10.00"), calculator.calculateTax(total));
        assertEquals(new BigDecimal("210.00"),
            calculator.calculateGrandTotal(total));
    }

    @Test
    public void recognizesTodayAsValidJourneyDate() {
        DateTimeUtil dates = new DateTimeUtil();
        String today = new Date(System.currentTimeMillis()).toString();
        assertTrue(dates.isTodayOrFuture(today));
        assertFalse(dates.isTodayOrFuture("2000-01-01"));
    }

    @Test
    public void buildsConfirmationMessageForBooking() {
        Booking booking = new Booking("bk-1", "GB-1", "usr-1", "sch-1",
            "2030-01-01", "bp-1", "dp-1", "Rahul Sharma",
            "rahul@example.com", "+91123456789", "male", 28,
            Arrays.asList("L01", "L02"), new BigDecimal("200.00"),
            new BigDecimal("10.00"), new BigDecimal("210.00"),
            "PENDING", "UPI", "PENDING");
        String message =
            new EmailNotificationService().createBookingConfirmation(booking);
        assertTrue(message.contains("GB-1"));
        assertTrue(message.contains("L01, L02"));
        assertTrue(message.contains("no email was sent"));
    }

    @Test
    public void startsAndEndsSimpleSession() {
        SessionService sessions = new SessionService();
        UserSession user =
            new UserSession("usr-1", "Rahul", "rahul@example.com",
                "passenger", null);
        SessionService.SessionInfo info = sessions.startSession(user);
        assertEquals(user, sessions.getUser(info.getSessionId()));
        sessions.endSession(info.getSessionId());
        assertEquals(null, sessions.getUser(info.getSessionId()));
    }
}
