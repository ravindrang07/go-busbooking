package com.ticket.model;

public final class UserSession {

    private final String userId;
    private final String name;
    private final String email;
    private final String phone;
    private final String role;
    private final String operatorId;
    private final String operatorType;

    public UserSession(
            String userId, String name, String email, String role,
            String operatorId) {
        this(userId, name, email, null, role, operatorId);
    }

    public UserSession(
            String userId, String name, String email, String phone,
            String role, String operatorId) {
        this(userId, name, email, phone, role, operatorId, null);
    }

    public UserSession(
            String userId, String name, String email, String phone,
            String role, String operatorId, String operatorType) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.operatorId = operatorId;
        this.operatorType = operatorType;
    }

    public String getUserId() { return userId; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getRole() { return role; }
    public String getOperatorId() { return operatorId; }
    public String getOperatorType() { return operatorType; }
}
