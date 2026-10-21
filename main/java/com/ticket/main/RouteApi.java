package com.ticket.main;

import com.ticket.model.Route;
import com.ticket.service.BusService;
import com.ticket.util.ApiResponse;
import java.sql.SQLException;
import java.util.List;

public class RouteApi {

    public ApiResponse<List<Route>> listRoutes() throws SQLException {
        return ApiResponse.success(new BusService().getActiveRoutes());
    }
}
