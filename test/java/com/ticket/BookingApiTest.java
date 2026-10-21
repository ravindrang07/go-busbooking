package com.ticket;

import com.ticket.dao.BookingDAO;
import com.ticket.dao.NotificationDAO;
import com.ticket.main.BookingApi;
import com.ticket.model.Booking;
import com.ticket.model.Notification;
import com.ticket.model.UserSession;
import com.ticket.service.BusService;
import com.ticket.service.NotificationService;
import com.ticket.service.ScheduleService;
import com.ticket.util.ApiResponse;
import org.junit.Test;

import java.math.BigDecimal;
import java.sql.Date;
import java.sql.SQLException;
import java.util.Arrays;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class BookingApiTest {

    @Test
    public void successfulBookingCreatesNotification() throws Exception {
        InMemoryNotificationDAO notificationDAO =
            new InMemoryNotificationDAO();
        CapturingBusService busService = new CapturingBusService();
        NotificationService notificationService =
            new NotificationService(notificationDAO);
        BookingApi api = new BookingApi(
            busService,
            new BookingDAO(),
            new FixedScheduleService(),
            notificationService);
        UserSession passenger =
            new UserSession("user-1", "Sam", "sam@example.com",
                "passenger", null);
        BookingApi.BookingRequest request = new BookingApi.BookingRequest();
        request.scheduleId = "schedule-1";
        request.journeyDate =
            new Date(System.currentTimeMillis()).toString();
        request.boardingPointId = "board-1";
        request.droppingPointId = "drop-1";
        request.passengerName = "Sam";
        request.passengerEmail = "sam@example.com";
        request.passengerPhone = "1234567890";
        request.passengerGender = "other";
        request.passengerAge = 25;
        request.seatLabels = Arrays.asList("A1");
        request.paymentMethod = "UPI";

        ApiResponse<Booking> response = api.createBooking(passenger, request);

        assertTrue(response.isSuccess());
        assertEquals("user-1", busService.booking.getPassengerId());
        assertEquals(1, notificationDAO.notifications.size());
        assertEquals("BOOKING", notificationDAO.notifications.get(0).getType());
        assertEquals(busService.booking.getId(),
            notificationDAO.notifications.get(0).getBookingId());
    }

    private static class CapturingBusService extends BusService {
        private Booking booking;

        @Override
        public void createBooking(Booking value) throws SQLException {
            booking = value;
        }
    }

    private static class FixedScheduleService extends ScheduleService {
        @Override
        public void validatePoints(
                String scheduleId, String boardingPointId,
                String droppingPointId) {
        }

        @Override
        public BigDecimal calculateFare(
                String scheduleId, Date journeyDate,
                java.util.List<String> seatLabels) {
            return new BigDecimal("100.00");
        }
    }

    private static class InMemoryNotificationDAO extends NotificationDAO {
        private final java.util.List<Notification> notifications =
            new java.util.ArrayList<>();

        @Override
        public void create(Notification notification) throws SQLException {
            notifications.add(notification);
        }
    }
}
