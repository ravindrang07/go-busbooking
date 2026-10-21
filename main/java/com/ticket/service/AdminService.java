package com.ticket.service;

import com.ticket.dao.BookingDAO;
import com.ticket.dao.BusDAO;
import com.ticket.model.Booking;
import com.ticket.model.Bus;
import com.ticket.util.ValidationUtil;
import java.sql.SQLException;
import java.util.List;

public class AdminService {

    private final BusDAO busDAO;
    private final BookingDAO bookingDAO;

    public AdminService() {
        this(new BusDAO(), new BookingDAO());
    }

    AdminService(BusDAO busDAO, BookingDAO bookingDAO) {
        this.busDAO = busDAO;
        this.bookingDAO = bookingDAO;
    }

    public List<Bus> getBuses() throws SQLException {
        return busDAO.findAllBuses();
    }

    public List<Booking> getBookings() throws SQLException {
        return bookingDAO.findAll();
    }

    public void updateBusStatus(String busId, String status)
            throws SQLException {
        ValidationUtil.requireText(busId, "Bus ID");
        if (!"active".equals(status) && !"inactive".equals(status)
                && !"maintenance".equals(status)) {
            throw new IllegalArgumentException("Invalid bus status.");
        }
        if (!bookingDAO.updateBusStatus(busId, status)) {
            throw new IllegalArgumentException("Bus was not found.");
        }
    }
}
