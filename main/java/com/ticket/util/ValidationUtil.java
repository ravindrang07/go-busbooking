package com.ticket.util;

public final class ValidationUtil {

    private ValidationUtil() {
    }

    public static String requireText(String value, String field) {
        if (value == null || value.trim().isEmpty()) {
            throw new IllegalArgumentException(field + " is required.");
        }
        return value.trim();
    }

    public static String requireName(String value) {
        String name = requireText(value, "Name");
        if (name.length() > 120) {
            throw new IllegalArgumentException("Name is invalid.");
        }
        return name;
    }

    public static String requireEmail(String value) {
        String email = requireText(value, "Email").toLowerCase();
        int at = email.indexOf('@');
        if (email.length() > 120 || at <= 0
                || at != email.lastIndexOf('@')
                || email.indexOf('.', at) < at + 2
                || email.endsWith(".")) {
            throw new IllegalArgumentException("Email is invalid.");
        }
        return email;
    }

    public static String requirePhone(String value) {
        String phone = requireText(value, "Phone");
        int digits = 0;
        for (int i = 0; i < phone.length(); i++) {
            if (Character.isDigit(phone.charAt(i))) {
                digits++;
            } else if (!"+ ()-".contains(String.valueOf(phone.charAt(i)))) {
                throw new IllegalArgumentException("Phone number is invalid.");
            }
        }
        if (digits < 7 || digits > 15) {
            throw new IllegalArgumentException("Phone number is invalid.");
        }
        return phone;
    }

}
