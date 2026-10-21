package com.ticket.model;

import java.math.BigDecimal;

public class Seat {

    private final String label;
    private final String type;
    private final String deck;
    private final boolean womenOnly;
    private final boolean available;
    private final BigDecimal fare;

    public Seat(String label, String type, String deck,
            boolean womenOnly, boolean available, BigDecimal fare) {
        this.label = label;
        this.type = type;
        this.deck = deck;
        this.womenOnly = womenOnly;
        this.available = available;
        this.fare = fare;
    }

    public String getLabel() { return label; }
    public String getType() { return type; }
    public String getDeck() { return deck; }
    public boolean isWomenOnly() { return womenOnly; }
    public boolean isAvailable() { return available; }
    public BigDecimal getFare() { return fare; }
}
