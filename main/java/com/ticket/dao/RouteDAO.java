package com.ticket.dao;

import com.ticket.model.Route;
import com.ticket.util.DatabaseConnection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class RouteDAO {

    public List<Route> findActiveRoutes() throws SQLException {
        String sql =
            "SELECT DISTINCT r.id, r.operator_id, r.source, " +
            "r.destination, r.distance_km, r.duration_hours " +
            "FROM routes r " +
            "JOIN schedules s ON s.route_id = r.id " +
            "JOIN buses b ON b.id = s.bus_id " +
            "JOIN operators o ON o.id = b.operator_id " +
            "WHERE s.is_active = TRUE AND b.status = 'active' " +
            "AND o.status = 'active' ORDER BY r.source, r.destination";

        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql);
             ResultSet results = statement.executeQuery()) {
            List<Route> routes = new ArrayList<>();
            while (results.next()) {
                routes.add(new Route(
                    results.getString("id"),
                    results.getString("operator_id"),
                    results.getString("source"),
                    results.getString("destination"),
                    results.getInt("distance_km"),
                    results.getString("duration_hours")));
            }
            return routes;
        }
    }
}
