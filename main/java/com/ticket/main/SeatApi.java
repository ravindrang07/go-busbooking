package com.ticket.main;

import com.ticket.model.Seat;
import com.ticket.service.SeatService;
import com.ticket.util.ApiResponse;
import java.sql.SQLException;
import java.util.List;

public class SeatApi {

    public ApiResponse<List<Seat>> getAvailableSeats(
            String scheduleId, String date) throws SQLException {
        return ApiResponse.success(
            new SeatService().getAvailableSeats(scheduleId, date));
    }
}
