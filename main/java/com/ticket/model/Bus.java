package com.ticket.model;

import java.math.BigDecimal;

public class Bus {

    private final String id;
    private final String operatorId;
    private final String name;
    private final String busType;
    private final String registrationNumber;
    private final BigDecimal rating;
    private final int totalSeats;
    private final String status;
    private final String scheduleId;
    private final String routeId;
    private final String source;
    private final String destination;
    private final String departureTime;
    private final String arrivalTime;
    private final BigDecimal baseFare;

    public Bus(
            String id,
            String operatorId,
            String name,
            String busType,
            String registrationNumber,
            BigDecimal rating,
            int totalSeats,
            String status) {
        this(id, operatorId, name, busType, registrationNumber, rating,
            totalSeats, status, null, null, null, null, null, null, null);
    }

    public Bus(
            String id,
            String operatorId,
            String name,
            String busType,
            String registrationNumber,
            BigDecimal rating,
            int totalSeats,
            String status,
            String scheduleId,
            String routeId,
            String source,
            String destination,
            String departureTime,
            String arrivalTime,
            BigDecimal baseFare) {
        this.id = id;
        this.operatorId = operatorId;
        this.name = name;
        this.busType = busType;
        this.registrationNumber = registrationNumber;
        this.rating = rating;
        this.totalSeats = totalSeats;
        this.status = status;
        this.scheduleId = scheduleId;
        this.routeId = routeId;
        this.source = source;
        this.destination = destination;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.baseFare = baseFare;
    }

    public String getId() {
        return id;
    }

    public String getOperatorId() {
        return operatorId;
    }

    public String getName() {
        return name;
    }

    public String getBusType() {
        return busType;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public BigDecimal getRating() {
        return rating;
    }

    public int getTotalSeats() {
        return totalSeats;
    }

    public String getStatus() {
        return status;
    }

    public String getScheduleId() {
        return scheduleId;
    }

    public String getRouteId() {
        return routeId;
    }

    public String getSource() {
        return source;
    }

    public String getDestination() {
        return destination;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public BigDecimal getBaseFare() {
        return baseFare;
    }
}
