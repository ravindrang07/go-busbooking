package com.ticket.service;

import com.ticket.dao.BookingDAO;
import com.ticket.dao.BusDAO;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.LinkedHashMap;
import java.util.Map;

public class StatisticsService {

    private final BookingDAO bookingDAO;
    private final BusDAO busDAO;
    private final ReportService reportService;

    public StatisticsService() {
        this(new BookingDAO(), new BusDAO(), new ReportService());
    }

    public StatisticsService(
            BookingDAO bookingDAO, BusDAO busDAO, ReportService reportService) {
        this.bookingDAO = bookingDAO;
        this.busDAO = busDAO;
        this.reportService = reportService;
    }

    public int getTotalBookings() throws SQLException {
        return bookingDAO.countAll();
    }

    public int getBusCount() throws SQLException {
        return busDAO.countAll();
    }

    public BigDecimal getPaidRevenue() throws SQLException {
        return reportService.getPaidRevenue();
    }

    public Map<String, Object> getSummary() throws SQLException {
        Map<String, Object> summary = new LinkedHashMap<>();
        summary.put("totalBookings", getTotalBookings());
        summary.put("busCount", getBusCount());
        summary.put("paidRevenue", getPaidRevenue());
        return summary;
    }
}
