package com.ticket.service;

import com.ticket.dao.BookingDAO;
import com.ticket.dao.BusDAO;
import com.ticket.model.Booking;
import com.ticket.model.Bus;
import com.ticket.util.ValidationUtil;
import java.sql.SQLException;
import java.util.List;

public class OperatorService {

    private final BusDAO busDAO;
    private final BookingDAO bookingDAO;

    public OperatorService() {
        this(new BusDAO(), new BookingDAO());
    }

    OperatorService(BusDAO busDAO, BookingDAO bookingDAO) {
        this.busDAO = busDAO;
        this.bookingDAO = bookingDAO;
    }

    public List<Bus> getBuses(String operatorId) throws SQLException {
        return busDAO.findByOperator(
            ValidationUtil.requireText(operatorId, "Operator ID"));
    }

    public List<Booking> getBookings(String operatorId) throws SQLException {
        return bookingDAO.findByOperator(
            ValidationUtil.requireText(operatorId, "Operator ID"));
    }

    public void updateBusStatus(
            String operatorId, String busId, String status)
            throws SQLException {
        String validOperatorId =
            ValidationUtil.requireText(operatorId, "Operator ID");
        String validBusId = ValidationUtil.requireText(busId, "Bus ID");
        if (!"active".equals(status) && !"inactive".equals(status)
                && !"maintenance".equals(status)) {
            throw new IllegalArgumentException("Invalid bus status.");
        }
        if (!busDAO.updateStatusForOperator(
                validBusId, validOperatorId, status)) {
            throw new IllegalArgumentException("Bus was not found.");
        }
    }
}
