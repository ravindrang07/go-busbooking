package com.ticket.main;

import com.ticket.model.Passenger;
import com.ticket.model.UserSession;
import com.ticket.service.LoginService;
import com.ticket.service.RegisterService;
import com.ticket.service.SessionService;
import com.ticket.util.ApiResponse;
import java.sql.SQLException;

public class AuthApi {

    private final LoginService loginService;
    private final RegisterService registerService;
    private final SessionService sessionService;

    public AuthApi() {
        this(new LoginService(), new RegisterService(), new SessionService());
    }

    AuthApi(
            LoginService loginService, RegisterService registerService,
            SessionService sessionService) {
        this.loginService = loginService;
        this.registerService = registerService;
        this.sessionService = sessionService;
    }

    public ApiResponse<SessionService.SessionInfo> login(
            String email, String password)
            throws SQLException {
        UserSession user = loginService.login(email, password);
        return user != null
            ? ApiResponse.success(sessionService.startSession(user))
            : ApiResponse.error("Email or password is incorrect.");
    }

    public ApiResponse<SessionService.SessionInfo> register(
            String name, String email, String phone, String password)
            throws SQLException {
        Passenger passenger =
            registerService.register(name, email, phone, password);
        UserSession user = new UserSession(passenger.getId(),
            passenger.getName(), passenger.getEmail(), passenger.getPhone(),
            "passenger", null);
        return ApiResponse.success(sessionService.startSession(user));
    }

    public UserSession getCurrentUser(String sessionId) {
        if (sessionId == null || sessionId.trim().isEmpty()) {
            return null;
        }
        return sessionService.getUser(sessionId);
    }

    public void logout(String sessionId) {
        sessionService.endSession(sessionId);
    }
}
