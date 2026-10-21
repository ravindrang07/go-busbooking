package com.ticket.service;

import com.ticket.dao.ScheduleDAO;
import com.ticket.dao.SeatDAO;
import com.ticket.model.Schedule;
import com.ticket.model.Seat;
import com.ticket.util.DateTimeUtil;
import com.ticket.util.ValidationUtil;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.sql.Date;
import java.util.List;

public class ScheduleService {

    private final ScheduleDAO scheduleDAO;
    private final SeatDAO seatDAO;

    public ScheduleService() {
        this(new ScheduleDAO(), new SeatDAO());
    }

    ScheduleService(ScheduleDAO scheduleDAO) {
        this(scheduleDAO, new SeatDAO());
    }

    ScheduleService(ScheduleDAO scheduleDAO, SeatDAO seatDAO) {
        this.scheduleDAO = scheduleDAO;
        this.seatDAO = seatDAO;
    }

    public List<Schedule> getActiveSchedules() throws SQLException {
        return scheduleDAO.findActiveSchedules();
    }

    public Schedule findActiveSchedule(String id)
            throws SQLException {
        return scheduleDAO.findActiveById(
            ValidationUtil.requireText(id, "Schedule ID"));
    }

    public List<Seat> getAvailableSeats(
            String scheduleId, String journeyDate) throws SQLException {
        Date date = parseJourneyDate(journeyDate);
        ensureDateNotPast(date);
        if (findActiveSchedule(scheduleId) == null) {
            throw new IllegalArgumentException(
                "Active schedule was not found.");
        }
        return seatDAO.findSeats(scheduleId, date);
    }

    public BigDecimal calculateFare(
            String scheduleId, Date journeyDate, List<String> seatLabels)
            throws SQLException {
        if (seatLabels == null || seatLabels.isEmpty()) {
            throw new IllegalArgumentException("At least one seat is required.");
        }
        if (seatLabels.size() != new java.util.HashSet<>(seatLabels).size()) {
            throw new IllegalArgumentException("Duplicate seats are not allowed.");
        }
        ensureDateNotPast(journeyDate);
        return seatDAO.calculateFare(scheduleId, journeyDate, seatLabels);
    }

    public void validatePoints(
            String scheduleId, String boardingPointId, String droppingPointId)
            throws SQLException {
        ValidationUtil.requireText(boardingPointId, "Boarding point");
        ValidationUtil.requireText(droppingPointId, "Dropping point");
        if (!scheduleDAO.hasValidPoints(
                scheduleId, boardingPointId, droppingPointId)) {
            throw new IllegalArgumentException(
                "Boarding and dropping points must belong to the selected route.");
        }
    }

    public static Date parseJourneyDate(String value) {
        try {
            return new DateTimeUtil().parseDate(value);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Journey date must use YYYY-MM-DD.");
        }
    }

    private static void ensureDateNotPast(Date date) {
        new DateTimeUtil().requireTodayOrFuture(date.toString());
    }
}
