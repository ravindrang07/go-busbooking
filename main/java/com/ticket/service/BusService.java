package com.ticket.service;

import com.ticket.dao.BookingDAO;
import com.ticket.dao.BusDAO;
import com.ticket.dao.RouteDAO;
import com.ticket.model.Booking;
import com.ticket.model.Bus;
import com.ticket.model.Route;
import com.ticket.util.ValidationUtil;
import java.sql.SQLException;
import java.util.List;

public class BusService {

    private final BusDAO busDAO;
    private final RouteDAO routeDAO;
    private final BookingDAO bookingDAO;
    private final SearchService searchService;

    public BusService() {
        this(new BusDAO(), new RouteDAO(), new BookingDAO());
    }

    BusService(BusDAO busDAO, RouteDAO routeDAO, BookingDAO bookingDAO) {
        this.busDAO = busDAO;
        this.routeDAO = routeDAO;
        this.bookingDAO = bookingDAO;
        this.searchService = new SearchService(busDAO);
    }

    public List<Bus> getActiveBuses() throws SQLException {
        return busDAO.findActiveBuses();
    }

    public List<Bus> searchBuses(String source, String destination)
            throws SQLException {
        return searchService.search(source, destination);
    }

    public List<Route> getActiveRoutes() throws SQLException {
        return routeDAO.findActiveRoutes();
    }

    public void createBooking(Booking booking) throws SQLException {
        validateBooking(booking);
        bookingDAO.create(booking);
    }

    public Booking findBooking(String pnr) throws SQLException {
        return bookingDAO.findByPnr(
            ValidationUtil.requireText(pnr, "PNR"));
    }

    public static void validateBooking(Booking booking) {
        new BookingValidator().validate(booking);
    }
}
