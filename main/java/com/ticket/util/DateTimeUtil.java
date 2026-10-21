package com.ticket.util;

import java.sql.Date;
import java.text.SimpleDateFormat;

public class DateTimeUtil {

    public Date parseDate(String value) {
        try {
            return Date.valueOf(ValidationUtil.requireText(value, "Date"));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Date must use YYYY-MM-DD.");
        }
    }

    public boolean isTodayOrFuture(String value) {
        Date date = parseDate(value);
        String todayText = new SimpleDateFormat("yyyy-MM-dd")
            .format(new java.util.Date());
        Date today = parseDate(todayText);
        return !date.before(today);
    }

    public void requireTodayOrFuture(String value) {
        if (!isTodayOrFuture(value)) {
            throw new IllegalArgumentException("Journey date cannot be in the past.");
        }
    }
}
