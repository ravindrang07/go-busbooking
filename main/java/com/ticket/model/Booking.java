package com.ticket.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Booking {

    private final String id;
    private final String pnr;
    private final String passengerId;
    private final String scheduleId;
    private final String journeyDate;
    private final String boardingPointId;
    private final String droppingPointId;
    private final String passengerName;
    private final String passengerEmail;
    private final String passengerPhone;
    private final String passengerGender;
    private final int passengerAge;
    private final List<String> seatLabels;
    private final BigDecimal totalFare;
    private final BigDecimal tax;
    private final BigDecimal grandTotal;
    private final String status;
    private final String paymentMethod;
    private final String paymentStatus;

    public Booking(
            String id,
            String pnr,
            String passengerId,
            String scheduleId,
            String journeyDate,
            String boardingPointId,
            String droppingPointId,
            String passengerName,
            String passengerEmail,
            String passengerPhone,
            String passengerGender,
            int passengerAge,
            List<String> seatLabels,
            BigDecimal totalFare,
            BigDecimal tax,
            BigDecimal grandTotal,
            String status,
            String paymentMethod,
            String paymentStatus) {
        this.id = id;
        this.pnr = pnr;
        this.passengerId = passengerId;
        this.scheduleId = scheduleId;
        this.journeyDate = journeyDate;
        this.boardingPointId = boardingPointId;
        this.droppingPointId = droppingPointId;
        this.passengerName = passengerName;
        this.passengerEmail = passengerEmail;
        this.passengerPhone = passengerPhone;
        this.passengerGender = passengerGender;
        this.passengerAge = passengerAge;
        this.seatLabels = Collections.unmodifiableList(
            new ArrayList<>(seatLabels));
        this.totalFare = totalFare;
        this.tax = tax;
        this.grandTotal = grandTotal;
        this.status = status;
        this.paymentMethod = paymentMethod;
        this.paymentStatus = paymentStatus;
    }

    public String getId() {
        return id;
    }

    public String getPnr() {
        return pnr;
    }

    public String getPassengerId() {
        return passengerId;
    }

    public String getScheduleId() {
        return scheduleId;
    }

    public String getJourneyDate() {
        return journeyDate;
    }

    public String getBoardingPointId() {
        return boardingPointId;
    }

    public String getDroppingPointId() {
        return droppingPointId;
    }

    public String getPassengerName() {
        return passengerName;
    }

    public String getPassengerEmail() {
        return passengerEmail;
    }

    public String getPassengerPhone() {
        return passengerPhone;
    }

    public String getPassengerGender() {
        return passengerGender;
    }

    public int getPassengerAge() {
        return passengerAge;
    }

    public List<String> getSeatLabels() {
        return seatLabels;
    }

    public BigDecimal getTotalFare() {
        return totalFare;
    }

    public BigDecimal getTax() {
        return tax;
    }

    public BigDecimal getGrandTotal() {
        return grandTotal;
    }

    public String getStatus() {
        return status;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }
}
