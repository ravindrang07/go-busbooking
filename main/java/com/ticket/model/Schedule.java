package com.ticket.model;

import java.math.BigDecimal;

public final class Schedule {

    private final String id;
    private final String busId;
    private final String routeId;
    private final String departureTime;
    private final String arrivalTime;
    private final BigDecimal baseFare;
    private final BigDecimal sleeperFare;
    private final String daysOfOperation;
    private final boolean active;

    public Schedule(
            String id, String busId, String routeId, String departureTime,
            String arrivalTime, BigDecimal baseFare, BigDecimal sleeperFare,
            String daysOfOperation, boolean active) {
        this.id = id;
        this.busId = busId;
        this.routeId = routeId;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.baseFare = baseFare;
        this.sleeperFare = sleeperFare;
        this.daysOfOperation = daysOfOperation;
        this.active = active;
    }

    public String getId() { return id; }
    public String getBusId() { return busId; }
    public String getRouteId() { return routeId; }
    public String getDepartureTime() { return departureTime; }
    public String getArrivalTime() { return arrivalTime; }
    public BigDecimal getBaseFare() { return baseFare; }
    public BigDecimal getSleeperFare() { return sleeperFare; }
    public String getDaysOfOperation() { return daysOfOperation; }
    public boolean isActive() { return active; }
}
