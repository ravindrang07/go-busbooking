package com.ticket;

import com.ticket.util.PasswordUtil;
import com.ticket.util.ValidationUtil;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class ValidationUtilTest {

    @Test
    public void trimsValidPassengerFields() {
        assertEquals("Rahul Sharma", ValidationUtil.requireName(" Rahul Sharma "));
        assertEquals("rahul@example.com",
            ValidationUtil.requireEmail("Rahul@example.com"));
        assertEquals("+91 98765 43210",
            ValidationUtil.requirePhone("+91 98765 43210"));
    }

    @Test(expected = IllegalArgumentException.class)
    public void rejectsInvalidEmail() {
        ValidationUtil.requireEmail("not-an-email");
    }

    @Test(expected = IllegalArgumentException.class)
    public void rejectsShortPassword() {
        new PasswordUtil().validatePassword("short");
    }
}
