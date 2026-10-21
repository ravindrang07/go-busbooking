package com.ticket.main;

import com.ticket.model.UserSession;
import com.ticket.service.ReportService;
import com.ticket.service.StatisticsService;
import java.sql.SQLException;
import java.util.LinkedHashMap;
import java.util.Map;

public class ReportApi {

    private final ReportService reportService;
    private final StatisticsService statisticsService;

    public ReportApi() {
        this(new ReportService(), new StatisticsService());
    }

    ReportApi(
            ReportService reportService, StatisticsService statisticsService) {
        this.reportService = reportService;
        this.statisticsService = statisticsService;
    }

    public Map<String, Object> getSummary(UserSession user)
            throws SQLException {
        if (user == null || !"admin".equals(user.getRole())) {
            throw new IllegalArgumentException(
                "Only an administrator can view reports.");
        }
        Map<String, Object> report = new LinkedHashMap<>();
        report.putAll(statisticsService.getSummary());
        report.put("bookingCounts", reportService.getBookingCountsByStatus());
        report.put("operatorTypeRevenue",
            reportService.getRevenueByOperatorType());
        return report;
    }
}
