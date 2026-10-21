package com.ticket.main;

import com.ticket.model.UserSession;
import com.ticket.service.CancellationService;
import com.ticket.util.ApiResponse;
import java.sql.SQLException;

public class CancellationApi {

    private final CancellationService cancellationService =
        new CancellationService();

    public ApiResponse<String> cancel(UserSession user, String pnr)
            throws SQLException {
        cancellationService.cancel(pnr, user);
        return ApiResponse.success(
            "Booking cancelled. Process any refund through the payment provider.");
    }
}
