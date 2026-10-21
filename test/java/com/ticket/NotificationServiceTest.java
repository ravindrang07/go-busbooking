package com.ticket;

import com.ticket.dao.BookingDAO;
import com.ticket.dao.NotificationDAO;
import com.ticket.model.Booking;
import com.ticket.model.Notification;
import com.ticket.model.UserSession;
import com.ticket.service.CancellationService;
import com.ticket.service.NotificationService;
import org.junit.Test;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class NotificationServiceTest {

    @Test
    public void createsBookingAndCancellationNotifications()
            throws Exception {
        InMemoryNotificationDAO dao = new InMemoryNotificationDAO();
        NotificationService service = new NotificationService(dao);
        Booking booking = sampleBooking();

        Notification created = service.createBookingNotification(booking);
        Notification cancelled =
            service.createCancellationNotification(booking);

        assertEquals("BOOKING", created.getType());
        assertEquals("CANCELLATION", cancelled.getType());
        assertEquals("user-1", created.getUserId());
        assertEquals("booking-1", created.getBookingId());
        assertTrue(created.getMessage().contains("GB-1"));
        assertTrue(cancelled.getMessage().contains("cancelled"));
        assertFalse(created.isRead());
        assertEquals(2, dao.saved.size());
    }

    @Test
    public void listsAndMarksOnlyOwnedNotificationsRead() throws Exception {
        InMemoryNotificationDAO dao = new InMemoryNotificationDAO();
        NotificationService service = new NotificationService(dao);
        Notification notification =
            service.createBookingNotification(sampleBooking());

        assertEquals(1, service.getByUser("user-1").size());
        assertTrue(service.markRead(notification.getId(), "user-1"));
        assertFalse(service.markRead(notification.getId(), "another-user"));
    }

    @Test
    public void successfulCancellationCreatesNotification() throws Exception {
        InMemoryNotificationDAO notificationDAO =
            new InMemoryNotificationDAO();
        NotificationService notifications =
            new NotificationService(notificationDAO);
        CancellationService cancellations =
            new CancellationService(
                new FixedBookingDAO(sampleBooking()), notifications);
        UserSession passenger =
            new UserSession("user-1", "Sam", "sam@example.com",
                "passenger", null);

        cancellations.cancel("GB-1", passenger);

        assertEquals(1, notificationDAO.saved.size());
        assertEquals("CANCELLATION",
            notificationDAO.saved.get(0).getType());
    }

    @Test(expected = IllegalArgumentException.class)
    public void rejectsNullBooking() throws Exception {
        new NotificationService(new InMemoryNotificationDAO())
            .createBookingNotification(null);
    }

    private static Booking sampleBooking() {
        return new Booking("booking-1", "GB-1", "user-1", "schedule-1",
            "2030-01-01", "board-1", "drop-1", "Sam", "sam@example.com",
            "1234567890", "other", 25, new ArrayList<String>(),
            new BigDecimal("100.00"), new BigDecimal("5.00"),
            new BigDecimal("105.00"), "PENDING", "UPI", "PENDING");
    }

    private static class InMemoryNotificationDAO extends NotificationDAO {
        private final List<Notification> saved = new ArrayList<>();

        @Override
        public void create(Notification notification) throws SQLException {
            saved.add(notification);
        }

        @Override
        public List<Notification> findByUser(String userId)
                throws SQLException {
            List<Notification> matching = new ArrayList<>();
            for (Notification notification : saved) {
                if (userId.equals(notification.getUserId())) {
                    matching.add(notification);
                }
            }
            return matching;
        }

        @Override
        public boolean markRead(String notificationId, String userId)
                throws SQLException {
            for (Notification notification : saved) {
                if (notificationId.equals(notification.getId())
                        && userId.equals(notification.getUserId())) {
                    return true;
                }
            }
            return false;
        }
    }

    private static class FixedBookingDAO extends BookingDAO {
        private final Booking booking;

        FixedBookingDAO(Booking booking) {
            this.booking = booking;
        }

        @Override
        public Booking findByPnr(String pnr) throws SQLException {
            return booking;
        }

        @Override
        public boolean cancel(String pnr, String passengerId)
                throws SQLException {
            return true;
        }
    }
}
