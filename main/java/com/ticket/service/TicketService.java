package com.ticket.service;

import com.ticket.dao.BookingDAO;
import com.ticket.model.Booking;
import com.ticket.util.ValidationUtil;
import java.sql.SQLException;

public class TicketService {

    private final BookingDAO bookingDAO;

    public TicketService() {
        this(new BookingDAO());
    }

    TicketService(BookingDAO bookingDAO) {
        this.bookingDAO = bookingDAO;
    }

    public Booking findTicket(String pnr) throws SQLException {
        return bookingDAO.findByPnr(
            ValidationUtil.requireText(pnr, "PNR"));
    }
}
