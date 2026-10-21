package com.ticket.service;

import com.ticket.model.Seat;
import java.sql.SQLException;
import java.util.List;

public class SeatService {

    private final ScheduleService scheduleService;

    public SeatService() {
        this(new ScheduleService());
    }

    SeatService(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    public List<Seat> getAvailableSeats(
            String scheduleId, String journeyDate) throws SQLException {
        return scheduleService.getAvailableSeats(scheduleId, journeyDate);
    }
}
