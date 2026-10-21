package com.ticket;

import com.ticket.dao.FeedbackDAO;
import com.ticket.main.FeedbackApi;
import com.ticket.model.Feedback;
import com.ticket.model.UserSession;
import com.ticket.service.FeedbackService;
import org.junit.Test;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.fail;

public class FeedbackServiceTest {

    @Test
    public void savesValidPassengerFeedback() throws Exception {
        InMemoryFeedbackDAO dao = new InMemoryFeedbackDAO();
        FeedbackService service = new FeedbackService(dao);

        Feedback feedback =
            service.submit("user-1", "booking-1", 5, "Great trip!");

        assertEquals("user-1", feedback.getUserId());
        assertEquals("booking-1", feedback.getBookingId());
        assertEquals(5, feedback.getRating());
        assertEquals("Great trip!", feedback.getComments());
        assertNotNull(feedback.getId());
        assertEquals(feedback, dao.saved);
    }

    @Test
    public void rejectsRatingsOutsideOneToFive() throws Exception {
        FeedbackService service = new FeedbackService(new InMemoryFeedbackDAO());

        assertInvalid(() ->
            service.submit("user-1", "booking-1", 0, "Not good"));
        assertInvalid(() ->
            service.submit("user-1", "booking-1", 6, "Excellent"));
    }

    @Test
    public void rejectsBlankCommentsAndDuplicateOrUnknownBooking()
            throws Exception {
        InMemoryFeedbackDAO dao = new InMemoryFeedbackDAO();
        FeedbackService service = new FeedbackService(dao);
        assertInvalid(() ->
            service.submit("user-1", "booking-1", 4, "  "));

        dao.acceptFeedback = false;
        assertInvalid(() ->
            service.submit("user-1", "booking-1", 4, "Good trip"));
    }

    @Test
    public void feedbackApiRequiresPassengerRole() throws Exception {
        FeedbackApi api =
            new FeedbackApi(new FeedbackService(new InMemoryFeedbackDAO()));
        UserSession admin =
            new UserSession("admin-1", "Admin", "admin@example.com",
                "admin", null);
        assertInvalid(() -> api.submit(admin, "booking-1", 5, "Good"));
    }

    private static void assertInvalid(CheckedRunnable action)
            throws Exception {
        try {
            action.run();
            fail("Expected invalid feedback to be rejected.");
        } catch (IllegalArgumentException expected) {
            assertNotNull(expected.getMessage());
        }
    }

    private interface CheckedRunnable {
        void run() throws Exception;
    }

    private static class InMemoryFeedbackDAO extends FeedbackDAO {
        private Feedback saved;
        private boolean acceptFeedback = true;
        private final List<Feedback> feedback = new ArrayList<>();

        @Override
        public boolean create(Feedback value) throws SQLException {
            if (!acceptFeedback) {
                return false;
            }
            saved = value;
            feedback.add(value);
            return true;
        }

        @Override
        public List<Feedback> findByPassenger(String userId)
                throws SQLException {
            return feedback;
        }

        @Override
        public List<Feedback> findAll() throws SQLException {
            return feedback;
        }
    }
}
