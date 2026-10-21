package com.ticket.main;

import com.ticket.dao.BookingDAO;
import com.ticket.model.Booking;
import com.ticket.model.UserSession;
import com.ticket.service.BusService;
import com.ticket.service.EmailNotificationService;
import com.ticket.service.FareCalculator;
import com.ticket.service.NotificationService;
import com.ticket.service.ScheduleService;
import com.ticket.util.ApiResponse;
import com.ticket.util.ValidationUtil;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

public class BookingApi {

    private final BusService busService;
    private final BookingDAO bookingDAO;
    private final ScheduleService scheduleService;
    private final NotificationService notificationService;
    private static int nextId = 1;

    public BookingApi() {
        this(new BusService(), new BookingDAO(), new ScheduleService(),
            new NotificationService());
    }

    BookingApi(
            BusService busService, BookingDAO bookingDAO,
            ScheduleService scheduleService) {
        this(busService, bookingDAO, scheduleService,
            new NotificationService());
    }

    public BookingApi(
            BusService busService, BookingDAO bookingDAO,
            ScheduleService scheduleService,
            NotificationService notificationService) {
        this.busService = busService;
        this.bookingDAO = bookingDAO;
        this.scheduleService = scheduleService;
        this.notificationService = notificationService;
    }

    public ApiResponse<Booking> createBooking(
            UserSession user, BookingRequest request) throws SQLException {
        return createBooking(user, request, true);
    }

    public ApiResponse<Booking> createBooking(
            UserSession user, BookingRequest request, boolean createNotification)
            throws SQLException {
        requireRole(user, "passenger");
        if (request == null) {
            throw new IllegalArgumentException("Booking details are required.");
        }
        java.sql.Date date = ScheduleService.parseJourneyDate(request.journeyDate);
        scheduleService.validatePoints(
            request.scheduleId, request.boardingPointId, request.droppingPointId);
        BigDecimal fare = scheduleService.calculateFare(
            request.scheduleId, date, request.seatLabels);
        FareCalculator fareCalculator = new FareCalculator();
        BigDecimal tax = fareCalculator.calculateTax(fare);
        Booking booking = new Booking(
            createId("bk-"),
            createPnr(),
            user.getUserId(),
            ValidationUtil.requireText(request.scheduleId, "Schedule ID"),
            date.toString(),
            request.boardingPointId,
            request.droppingPointId,
            request.passengerName,
            request.passengerEmail,
            request.passengerPhone,
            request.passengerGender,
            request.passengerAge,
            request.seatLabels,
            fare,
            tax,
            fareCalculator.calculateGrandTotal(fare),
            "PENDING",
            request.paymentMethod,
            "PENDING");
        busService.createBooking(booking);
        if (createNotification) {
            notificationService.createBookingNotification(booking);
        }
        return ApiResponse.success(booking);
    }

    public String createConfirmationMessage(Booking booking) {
        return new EmailNotificationService()
            .createBookingConfirmation(booking);
    }

    public ApiResponse<List<Booking>> listBookings(UserSession user)
            throws SQLException {
        requireSignedIn(user);
        if (!"passenger".equals(user.getRole())
                && !"admin".equals(user.getRole())) {
            throw new IllegalArgumentException(
                "Only passengers and administrators can view bookings.");
        }
        List<Booking> bookings = "admin".equals(user.getRole())
            ? bookingDAO.findAll() : bookingDAO.findByPassenger(user.getUserId());
        return ApiResponse.success(bookings);
    }

    public ApiResponse<Booking> getBooking(UserSession user, String pnr)
            throws SQLException {
        requireSignedIn(user);
        if (!"passenger".equals(user.getRole())
                && !"admin".equals(user.getRole())) {
            throw new IllegalArgumentException(
                "Only passengers and administrators can view bookings.");
        }
        Booking booking = bookingDAO.findByPnr(pnr);
        if (booking == null) {
            return ApiResponse.error("Booking was not found.");
        }
        if (!"admin".equals(user.getRole())
                && !user.getUserId().equals(booking.getPassengerId())) {
            return ApiResponse.error("You cannot view another passenger's booking.");
        }
        return ApiResponse.success(booking);
    }

    private static void requireRole(UserSession user, String role) {
        requireSignedIn(user);
        if (!role.equals(user.getRole())) {
            throw new IllegalArgumentException(
                "This operation is not available for your account type.");
        }
    }

    private static void requireSignedIn(UserSession user) {
        if (user == null) {
            throw new IllegalArgumentException("Please log in first.");
        }
    }

    private static synchronized String createId(String prefix) {
        return prefix + System.currentTimeMillis() + "-" + nextId++;
    }

    private static synchronized String createPnr() {
        String time = Long.toString(System.currentTimeMillis());
        int sequence = nextId++ % 1000;
        String suffix = "00" + sequence;
        suffix = suffix.substring(suffix.length() - 3);
        return "GB" + time.substring(time.length() - 10) + suffix;
    }

    public static class BookingRequest {
        public String scheduleId;
        public String journeyDate;
        public String boardingPointId;
        public String droppingPointId;
        public String passengerName;
        public String passengerEmail;
        public String passengerPhone;
        public String passengerGender;
        public int passengerAge;
        public List<String> seatLabels;
        public String paymentMethod;
    }
}
