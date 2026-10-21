package com.ticket.main;

import com.ticket.model.Schedule;
import com.ticket.service.ScheduleService;
import com.ticket.util.ApiResponse;
import java.sql.SQLException;
import java.util.List;

public class ScheduleApi {

    public ApiResponse<List<Schedule>> listSchedules() throws SQLException {
        return ApiResponse.success(
            new ScheduleService().getActiveSchedules());
    }
}
