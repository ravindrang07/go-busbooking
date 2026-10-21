GoBus MySQL database (MySQL 8.0+)

WARNING: gobus_database.sql and 01_schema.sql drop the existing "gobus"
database before recreating it. Back up any data you need before importing.

From the project folder, import everything at once:
  mysql -u root -p < Database/gobus_database.sql
(or run Database/01_schema.sql, then Database/02_seed.sql). It creates database "gobus".
03_sample_queries.sql has ready queries (search, seat map, cancel, manifest, revenue).

Tables: operators, users, buses, bus_amenities, seats, routes, boarding_points,
        dropping_points, schedules, bookings, booking_seats, feedback,
        notifications
Views:  v_booking_details, v_schedule_search
Seed data comes from the project's mockData (4 operators, 5 buses, 5 routes, 6 schedules, 3 bookings).
Demo logins: password is demo123 for all seeded users.
JDBC URL: jdbc:mysql://localhost:3306/gobus
For existing databases, apply Database/04_pending_payment_migration.sql and
Database/05_feedback_notifications_migration.sql before using the added features.

These files define and seed the database; they do not provide a Java HTTP API
or connect the static website to MySQL.
