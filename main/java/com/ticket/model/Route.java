package com.ticket.model;

public class Route {

    private final String id;
    private final String operatorId;
    private final String source;
    private final String destination;
    private final int distanceKm;
    private final String duration;

    public Route(
            String id,
            String operatorId,
            String source,
            String destination,
            int distanceKm,
            String duration) {
        this.id = id;
        this.operatorId = operatorId;
        this.source = source;
        this.destination = destination;
        this.distanceKm = distanceKm;
        this.duration = duration;
    }

    public String getId() {
        return id;
    }

    public String getOperatorId() {
        return operatorId;
    }

    public String getSource() {
        return source;
    }

    public String getDestination() {
        return destination;
    }

    public int getDistanceKm() {
        return distanceKm;
    }

    public String getDuration() {
        return duration;
    }
}
