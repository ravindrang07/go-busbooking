package com.ticket.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public final class DatabaseConnection {

    private static final String DEFAULT_URL =
        "jdbc:mysql://127.0.0.1:3306/gobus";

    private DatabaseConnection() {
    }

    private static String getSetting(
            String name, String defaultValue) {
        String value = System.getenv(name);

        if (value == null || value.trim().isEmpty()) {
            return defaultValue;
        }

        return value;
    }

    public static Connection getConnection()
            throws SQLException {

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            throw new SQLException("MySQL JDBC driver is not available.", e);
        }

        String url = getSetting(
            "GOBUS_DB_URL", DEFAULT_URL);

        String user = getSetting(
            "GOBUS_DB_USER", "root");

        String password = getSetting(
            "GOBUS_DB_PASSWORD", "");

        return DriverManager.getConnection(
            url, user, password);
    }
}
