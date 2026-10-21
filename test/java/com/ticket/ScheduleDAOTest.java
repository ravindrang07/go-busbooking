package com.ticket;

import com.ticket.dao.ScheduleDAO;
import com.ticket.model.Schedule;
import org.junit.Assume;
import org.junit.Test;

import java.util.List;

import static org.junit.Assert.assertNotNull;

public class ScheduleDAOTest {

    @Test
    public void readsSchedulesFromMySqlWhenDatabaseTestsAreEnabled()
            throws Exception {
        Assume.assumeTrue("Set GOBUS_RUN_DB_TESTS=true to enable database tests",
            "true".equalsIgnoreCase(System.getenv("GOBUS_RUN_DB_TESTS")));
        List<Schedule> schedules = new ScheduleDAO().findActiveSchedules();
        assertNotNull(schedules);
    }
}
