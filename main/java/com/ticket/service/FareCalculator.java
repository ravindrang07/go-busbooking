package com.ticket.service;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class FareCalculator {

    private static final BigDecimal TAX_RATE = new BigDecimal("0.05");

    public BigDecimal calculateTotalFare(BigDecimal fare, int seatCount) {
        if (fare == null || fare.signum() <= 0 || seatCount < 1) {
            throw new IllegalArgumentException("Fare and seat count must be valid.");
        }
        return fare.multiply(BigDecimal.valueOf(seatCount));
    }

    public BigDecimal calculateTax(BigDecimal totalFare) {
        if (totalFare == null || totalFare.signum() < 0) {
            throw new IllegalArgumentException("Fare cannot be negative.");
        }
        return totalFare.multiply(TAX_RATE).setScale(2, RoundingMode.HALF_UP);
    }

    public BigDecimal calculateGrandTotal(BigDecimal totalFare) {
        return totalFare.add(calculateTax(totalFare));
    }
}
