package com.ticket.main;

import com.ticket.model.Bus;
import com.ticket.service.BusService;
import com.ticket.util.ApiResponse;
import java.sql.SQLException;
import java.util.List;

public class BusApi {

    private final BusService busService = new BusService();

    public ApiResponse<List<Bus>> listBuses() throws SQLException {
        return ApiResponse.success(busService.getActiveBuses());
    }

    public ApiResponse<List<Bus>> searchBuses(String source, String destination)
            throws SQLException {
        return ApiResponse.success(busService.searchBuses(source, destination));
    }
}
