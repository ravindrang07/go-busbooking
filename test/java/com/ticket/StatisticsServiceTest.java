package com.ticket;

import com.ticket.dao.BookingDAO;
import com.ticket.dao.BusDAO;
import com.ticket.service.ReportService;
import com.ticket.service.StatisticsService;
import org.junit.Test;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.Map;

import static org.junit.Assert.assertEquals;

public class StatisticsServiceTest {

    @Test
    public void calculatesBookingBusAndPaidRevenueStatistics()
            throws Exception {
        StatisticsService service = new StatisticsService(
            new FixedBookingDAO(12),
            new FixedBusDAO(4),
            new FixedReportService(new BigDecimal("2450.75")));

        Map<String, Object> summary = service.getSummary();

        assertEquals(Integer.valueOf(12), summary.get("totalBookings"));
        assertEquals(Integer.valueOf(4), summary.get("busCount"));
        assertEquals(new BigDecimal("2450.75"), summary.get("paidRevenue"));
        assertEquals(12, service.getTotalBookings());
        assertEquals(4, service.getBusCount());
        assertEquals(new BigDecimal("2450.75"), service.getPaidRevenue());
    }

    private static class FixedBookingDAO extends BookingDAO {
        private final int count;

        FixedBookingDAO(int count) {
            this.count = count;
        }

        @Override
        public int countAll() throws SQLException {
            return count;
        }
    }

    private static class FixedBusDAO extends BusDAO {
        private final int count;

        FixedBusDAO(int count) {
            this.count = count;
        }

        @Override
        public int countAll() throws SQLException {
            return count;
        }
    }

    private static class FixedReportService extends ReportService {
        private final BigDecimal revenue;

        FixedReportService(BigDecimal revenue) {
            this.revenue = revenue;
        }

        @Override
        public BigDecimal getPaidRevenue() throws SQLException {
            return revenue;
        }
    }
}
