package com.ticket.main;

import com.ticket.model.Booking;
import com.ticket.model.Bus;
import com.ticket.model.UserSession;
import com.ticket.service.OperatorService;
import com.ticket.util.ApiResponse;
import java.sql.SQLException;
import java.util.List;

public class OperatorApi {

    private final OperatorService operatorService = new OperatorService();

    public ApiResponse<List<Bus>> listBuses(UserSession user)
            throws SQLException {
        requireOperator(user);
        return ApiResponse.success(operatorService.getBuses(user.getOperatorId()));
    }

    public ApiResponse<List<Booking>> listBookings(UserSession user)
            throws SQLException {
        requireOperator(user);
        return ApiResponse.success(
            operatorService.getBookings(user.getOperatorId()));
    }

    public ApiResponse<String> updateBusStatus(
            UserSession user, String busId, String status)
            throws SQLException {
        requireOperator(user);
        operatorService.updateBusStatus(
            user.getOperatorId(), busId, status);
        return ApiResponse.success("Bus status updated.");
    }

    private static void requireOperator(UserSession user) {
        if (user == null || !"operator".equals(user.getRole())) {
            throw new IllegalArgumentException(
                "Only a bus operator can perform this operation.");
        }
    }
}
