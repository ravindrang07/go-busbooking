package com.ticket;

import com.ticket.util.DatabaseConnection;
import org.junit.Assume;
import org.junit.Test;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import static org.junit.Assert.assertTrue;

public class DatabaseConnectionTest {

    public static void main(String[] args) {
        try (Connection connection = DatabaseConnection.getConnection();
             Statement statement = connection.createStatement();
             ResultSet result = statement.executeQuery(
                 "SELECT COUNT(*) FROM information_schema.tables " +
                 "WHERE table_schema = 'gobus'")) {
            if (result.next()) {
                System.out.println("MySQL connection successful.");
                System.out.println("GoBus tables and views: " + result.getInt(1));
            }
        } catch (Exception e) {
            System.err.println("MySQL connection failed: " + e.getMessage());
        }
    }

    @Test
    public void connectsToConfiguredGoBusDatabaseWhenEnabled()
            throws Exception {
        Assume.assumeTrue("Set GOBUS_RUN_DB_TESTS=true to enable database tests",
            "true".equalsIgnoreCase(System.getenv("GOBUS_RUN_DB_TESTS")));
        try (Connection connection = DatabaseConnection.getConnection();
             Statement statement = connection.createStatement();
             ResultSet result = statement.executeQuery(
                 "SELECT COUNT(*) FROM information_schema.tables " +
                 "WHERE table_schema = 'gobus'")) {
            assertTrue(result.next());
            assertTrue("Expected GoBus tables to exist", result.getInt(1) > 0);
        }
    }
}
