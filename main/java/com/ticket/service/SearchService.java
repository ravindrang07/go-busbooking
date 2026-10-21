package com.ticket.service;

import com.ticket.dao.BusDAO;
import com.ticket.model.Bus;
import com.ticket.util.ValidationUtil;
import java.sql.SQLException;
import java.util.List;

public class SearchService {

    private final BusDAO busDAO;

    public SearchService() {
        this(new BusDAO());
    }

    SearchService(BusDAO busDAO) {
        this.busDAO = busDAO;
    }

    public List<Bus> search(String source, String destination)
            throws SQLException {
        String from = ValidationUtil.requireText(source, "Source city");
        String to = ValidationUtil.requireText(destination, "Destination city");
        if (from.equalsIgnoreCase(to)) {
            throw new IllegalArgumentException(
                "Source and destination must be different.");
        }
        return busDAO.searchSchedules(from, to);
    }
}
