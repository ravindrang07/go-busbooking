package com.ticket;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Collections;

import com.ticket.model.Booking;
import com.ticket.service.BusService;
import org.junit.Test;

public class BusServiceTest {

    @Test
    public void acceptsValidBooking() {
        BusService.validateBooking(validBooking());
    }

    @Test
    public void rejectsIncorrectTaxTotal() {
        Booking booking = new Booking(
            "bk-test", "GB-TEST01", "usr-101", "sch-1",
            tomorrow(), "bp-1", "dp-2",
            "Rahul Sharma", "rahul@example.com", "+911234567890",
            "male", 28, Collections.singletonList("L01"),
            new BigDecimal("100.00"), new BigDecimal("4.00"),
            new BigDecimal("104.00"), "CONFIRMED", "UPI", "PENDING");

        assertInvalid(booking, "Booking fare totals do not match.");
    }

    @Test
    public void rejectsDuplicateSeats() {
        Booking booking = new Booking(
            "bk-test", "GB-TEST01", "usr-101", "sch-1",
            tomorrow(), "bp-1", "dp-2",
            "Rahul Sharma", "rahul@example.com", "+911234567890",
            "male", 28, Arrays.asList("L01", "L01"),
            new BigDecimal("200.00"), new BigDecimal("10.00"),
            new BigDecimal("210.00"), "CONFIRMED", "UPI", "PENDING");

        assertInvalid(booking, "A seat cannot be selected more than once.");
    }

    private Booking validBooking() {
        return new Booking(
            "bk-test", "GB-TEST01", "usr-101", "sch-1",
            tomorrow(), "bp-1", "dp-2",
            "Rahul Sharma", "rahul@example.com", "+911234567890",
            "male", 28, Arrays.asList("L01", "L02"),
            new BigDecimal("200.00"), new BigDecimal("10.00"),
            new BigDecimal("210.00"), "CONFIRMED", "UPI", "PENDING");
    }

    private String tomorrow() {
        return new java.sql.Date(
            System.currentTimeMillis() + 24L * 60 * 60 * 1000).toString();
    }

    private void assertInvalid(Booking booking, String expectedMessage) {
        try {
            BusService.validateBooking(booking);
            fail("Expected invalid booking to be rejected.");
        } catch (IllegalArgumentException e) {
            assertEquals(expectedMessage, e.getMessage());
        }
    }
}
