package com.ticket.main;

import com.ticket.model.Booking;
import com.ticket.model.Bus;
import com.ticket.model.UserSession;
import com.ticket.dao.OperatorDAO;
import com.ticket.service.AdminService;
import com.ticket.util.ApiResponse;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public class AdminApi {

    private final AdminService adminService = new AdminService();
    private final OperatorDAO operatorDAO = new OperatorDAO();

    public ApiResponse<List<Map<String, Object>>> listOperators(UserSession user)
            throws SQLException {
        requireAdmin(user);
        return ApiResponse.success(operatorDAO.findAll());
    }

    public ApiResponse<String> updateOperatorStatus(
            UserSession user, String operatorId, String status)
            throws SQLException {
        requireAdmin(user);
        if (!"active".equals(status) && !"pending".equals(status)
                && !"suspended".equals(status)) {
            throw new IllegalArgumentException("Invalid operator status.");
        }
        if (!operatorDAO.updateStatus(operatorId, status)) {
            throw new IllegalArgumentException("Operator was not found.");
        }
        return ApiResponse.success("Operator status updated.");
    }

    public ApiResponse<List<Bus>> listBuses(UserSession user)
            throws SQLException {
        requireAdmin(user);
        return ApiResponse.success(adminService.getBuses());
    }

    public ApiResponse<List<Booking>> listBookings(UserSession user)
            throws SQLException {
        requireAdmin(user);
        return ApiResponse.success(adminService.getBookings());
    }

    public ApiResponse<String> updateBusStatus(
            UserSession user, String busId, String status)
            throws SQLException {
        requireAdmin(user);
        adminService.updateBusStatus(busId, status);
        return ApiResponse.success("Bus status updated.");
    }

    private static void requireAdmin(UserSession user) {
        if (user == null || !"admin".equals(user.getRole())) {
            throw new IllegalArgumentException(
                "Only an administrator can perform this operation.");
        }
    }
}
