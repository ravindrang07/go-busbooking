package com.ticket.model;

import java.math.BigDecimal;

public final class Payment {

    private final String bookingId;
    private final String pnr;
    private final String method;
    private final String status;
    private final BigDecimal amount;

    public Payment(
            String bookingId, String pnr, String method, String status,
            BigDecimal amount) {
        this.bookingId = bookingId;
        this.pnr = pnr;
        this.method = method;
        this.status = status;
        this.amount = amount;
    }

    public String getBookingId() { return bookingId; }
    public String getPnr() { return pnr; }
    public String getMethod() { return method; }
    public String getStatus() { return status; }
    public BigDecimal getAmount() { return amount; }
}
