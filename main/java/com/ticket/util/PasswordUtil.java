package com.ticket.util;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class PasswordUtil {

    public void validatePassword(String password) {
        if (password == null || password.length() < 8
                || password.length() > 128) {
            throw new IllegalArgumentException(
                "Password must contain between 8 and 128 characters.");
        }
    }

    public String hashPassword(Connection connection, String password)
            throws SQLException {
        validatePassword(password);
        try (PreparedStatement statement =
                 connection.prepareStatement("SELECT SHA2(?, 256)")) {
            statement.setString(1, password);
            try (ResultSet results = statement.executeQuery()) {
                results.next();
                return results.getString(1);
            }
        }
    }

    public boolean passwordMatches(
            Connection connection, String password, String storedHash)
            throws SQLException {
        if (password == null || password.isEmpty() || storedHash == null) {
            return false;
        }
        try (PreparedStatement statement =
                 connection.prepareStatement("SELECT SHA2(?, 256)")) {
            statement.setString(1, password);
            try (ResultSet results = statement.executeQuery()) {
                results.next();
                return results.getString(1).equalsIgnoreCase(storedHash);
            }
        }
    }
}
