package com.ticket.service;

import com.ticket.dao.PassengerDAO;
import com.ticket.model.Passenger;
import com.ticket.util.PasswordUtil;
import com.ticket.util.ValidationUtil;
import java.sql.SQLException;
public class RegisterService {

    private static int nextId = 1;
    private final PassengerDAO passengerDAO;

    public RegisterService() {
        this(new PassengerDAO());
    }

    RegisterService(PassengerDAO passengerDAO) {
        this.passengerDAO = passengerDAO;
    }

    public Passenger register(
            String name, String email, String phone, String password)
            throws SQLException {
        String validName = ValidationUtil.requireName(name);
        String validEmail = ValidationUtil.requireEmail(email);
        String validPhone = ValidationUtil.requirePhone(phone);
        new PasswordUtil().validatePassword(password);
        if (passengerDAO.findByEmail(validEmail) != null) {
            throw new IllegalArgumentException(
                "An account with this email already exists.");
        }
        String id = createId();
        Passenger passenger = new Passenger(id, validName, validEmail, validPhone);
        passengerDAO.create(passenger, password);
        return passenger;
    }

    private static synchronized String createId() {
        return "usr-" + System.currentTimeMillis() + "-" + nextId++;
    }
}
