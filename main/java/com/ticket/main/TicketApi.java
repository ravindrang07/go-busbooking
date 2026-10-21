package com.ticket.main;

import com.ticket.model.Booking;
import com.ticket.model.UserSession;
import com.ticket.util.ApiResponse;
import java.sql.SQLException;

public class TicketApi {

    public ApiResponse<Booking> getTicket(UserSession user, String pnr)
            throws SQLException {
        ApiResponse<Booking> response =
            new BookingApi().getBooking(user, pnr);
        if (!response.isSuccess()) {
            return ApiResponse.error(response.getError());
        }
        return ApiResponse.success(response.getData());
    }
}
