package com.ticket.service;

import com.ticket.model.UserSession;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class SessionService {

    private final Map<String, UserSession> sessions =
        new HashMap<String, UserSession>();
    public synchronized SessionInfo startSession(UserSession user) {
        if (user == null) {
            throw new IllegalArgumentException("User is required.");
        }
        String sessionId = UUID.randomUUID().toString();
        sessions.put(sessionId, user);
        return new SessionInfo(sessionId, user);
    }

    public synchronized UserSession getUser(String sessionId) {
        return sessions.get(sessionId);
    }

    public synchronized void endSession(String sessionId) {
        sessions.remove(sessionId);
    }

    public static class SessionInfo {
        private final String sessionId;
        private final UserSession user;

        public SessionInfo(String sessionId, UserSession user) {
            this.sessionId = sessionId;
            this.user = user;
        }

        public String getSessionId() { return sessionId; }
        public UserSession getUser() { return user; }
    }
}
