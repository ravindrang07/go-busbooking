# GoBus Ticket Booking System

GoBus is a bus ticket booking and transport management system for passengers, bus operators, and platform administrators. It combines a responsive booking website, a Java backend, and a MySQL database with sample operators, routes, schedules, and bookings.

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Java, Maven
- **Database:** MySQL

## Key Features

- **Passengers:** search schedules by route, compare buses and fares, select seats and boarding/dropping points, and view booking history.
- **Bus operators:** a separate login and dashboard to manage fleet, routes, schedules, and bookings.
- **Administrators:** a separate login and dashboard to oversee operators, buses, and bookings.
- **Schedule API:** a Java endpoint (`GET /api/schedules`) that returns schedules from MySQL as JSON.

## Project Structure

```text
Frontend/   Booking website, operator and admin login pages
Backend/    Java services: schedules, fares, seat availability, booking logic
Database/   MySQL schema, sample data, and example queries
```

## Status

GoBus is an educational prototype. The website currently uses simulated data in the browser, and the Java backend and MySQL database are not yet fully integrated with it.
