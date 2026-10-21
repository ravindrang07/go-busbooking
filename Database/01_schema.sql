-- =====================================================================
--  GoBus - MySQL 8 database schema
--  Models: Passenger / Operator / Admin users, operators, fleet, routes,
--  boarding & dropping points, schedules, seat layouts, bookings, seats.
--  Run:  mysql -u root -p < gobus_database.sql
-- =====================================================================
DROP DATABASE IF EXISTS gobus;
CREATE DATABASE gobus CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gobus;

-- ---------------------------------------------------------------------
-- Operators (Government STU and Private fleets)
-- ---------------------------------------------------------------------
CREATE TABLE operators (
  id                   VARCHAR(30)  PRIMARY KEY,
  name                 VARCHAR(120) NOT NULL,
  type                 ENUM('government','private') NOT NULL,
  category_badge       VARCHAR(80)  NOT NULL,
  email                VARCHAR(120) NOT NULL UNIQUE,
  phone                VARCHAR(25)  NOT NULL,
  license_number       VARCHAR(40)  NOT NULL UNIQUE,
  fleet_count          INT          NOT NULL DEFAULT 0,
  active_routes_count  INT          NOT NULL DEFAULT 0,
  status               ENUM('active','pending','suspended') NOT NULL DEFAULT 'pending',
  rating               DECIMAL(2,1) NOT NULL DEFAULT 0.0,
  revenue              DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  created_at           TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- Users (passenger / operator staff / platform admin)
-- Course demo hashes passwords with SHA-256; production should use
-- an adaptive password-hashing algorithm.
-- ---------------------------------------------------------------------
CREATE TABLE users (
  id             VARCHAR(30)  PRIMARY KEY,
  name           VARCHAR(120) NOT NULL,
  email          VARCHAR(120) NOT NULL UNIQUE,
  phone          VARCHAR(25),
  password_hash  VARCHAR(255) NOT NULL,
  role           ENUM('passenger','operator','admin') NOT NULL,
  operator_id    VARCHAR(30)  NULL,
  created_at     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_users_operator FOREIGN KEY (operator_id) REFERENCES operators(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- Buses (fleet)
-- ---------------------------------------------------------------------
CREATE TABLE buses (
  id                   VARCHAR(30)  PRIMARY KEY,
  operator_id          VARCHAR(30)  NOT NULL,
  name                 VARCHAR(150) NOT NULL,
  bus_type             ENUM('AC Sleeper (2+1)','Volvo Multi-Axle AC','BharatBenz Executive (2+2)','Express Non-AC') NOT NULL,
  registration_number  VARCHAR(25)  NOT NULL UNIQUE,
  rating               DECIMAL(2,1) NOT NULL DEFAULT 0.0,
  total_reviews        INT          NOT NULL DEFAULT 0,
  total_seats          INT          NOT NULL,
  status               ENUM('active','maintenance','inactive') NOT NULL DEFAULT 'active',
  image                VARCHAR(255) NULL,
  created_at           TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_buses_operator FOREIGN KEY (operator_id) REFERENCES operators(id) ON DELETE CASCADE,
  INDEX idx_buses_operator (operator_id)
) ENGINE=InnoDB;

CREATE TABLE bus_amenities (
  bus_id   VARCHAR(30)  NOT NULL,
  amenity  VARCHAR(60)  NOT NULL,
  PRIMARY KEY (bus_id, amenity),
  CONSTRAINT fk_amen_bus FOREIGN KEY (bus_id) REFERENCES buses(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Physical seat / berth layout of each bus
CREATE TABLE seats (
  bus_id         VARCHAR(30) NOT NULL,
  seat_label     VARCHAR(10) NOT NULL,
  seat_type      ENUM('seater','sleeper') NOT NULL,
  deck           ENUM('lower','upper') NOT NULL,
  row_no         TINYINT NOT NULL,
  col_no         TINYINT NOT NULL,
  is_women_only  BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (bus_id, seat_label),
  CONSTRAINT fk_seats_bus FOREIGN KEY (bus_id) REFERENCES buses(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- Routes with boarding / dropping points
-- ---------------------------------------------------------------------
CREATE TABLE routes (
  id              VARCHAR(30) PRIMARY KEY,
  operator_id     VARCHAR(30) NULL,
  source          VARCHAR(60) NOT NULL,
  destination     VARCHAR(60) NOT NULL,
  distance_km     INT         NOT NULL,
  duration_hours  VARCHAR(15) NOT NULL,
  CONSTRAINT fk_routes_operator FOREIGN KEY (operator_id) REFERENCES operators(id) ON DELETE SET NULL,
  INDEX idx_routes_src_dst (source, destination)
) ENGINE=InnoDB;

CREATE TABLE boarding_points (
  id        VARCHAR(30)  PRIMARY KEY,
  route_id  VARCHAR(30)  NOT NULL,
  time      VARCHAR(10)  NOT NULL,
  location  VARCHAR(120) NOT NULL,
  landmark  VARCHAR(120) NOT NULL,
  CONSTRAINT fk_bp_route FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE dropping_points (
  id        VARCHAR(30)  PRIMARY KEY,
  route_id  VARCHAR(30)  NOT NULL,
  time      VARCHAR(10)  NOT NULL,
  location  VARCHAR(120) NOT NULL,
  landmark  VARCHAR(120) NOT NULL,
  CONSTRAINT fk_dp_route FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- Schedules (a bus running on a route at a time and fare)
-- ---------------------------------------------------------------------
CREATE TABLE schedules (
  id                 VARCHAR(30)  PRIMARY KEY,
  bus_id             VARCHAR(30)  NOT NULL,
  route_id           VARCHAR(30)  NOT NULL,
  departure_time     VARCHAR(10)  NOT NULL,
  arrival_time       VARCHAR(10)  NOT NULL,
  base_fare          DECIMAL(10,2) NOT NULL,
  sleeper_fare       DECIMAL(10,2) NULL,
  days_of_operation  SET('Mon','Tue','Wed','Thu','Fri','Sat','Sun') NOT NULL,
  is_active          BOOLEAN NOT NULL DEFAULT TRUE,
  CONSTRAINT fk_sch_bus   FOREIGN KEY (bus_id)   REFERENCES buses(id)  ON DELETE CASCADE,
  CONSTRAINT fk_sch_route FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE,
  INDEX idx_sch_route (route_id)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- Bookings and the seats they hold
-- ---------------------------------------------------------------------
CREATE TABLE bookings (
  id                 VARCHAR(30)  PRIMARY KEY,
  pnr                VARCHAR(15)  NOT NULL UNIQUE,
  user_id            VARCHAR(30)  NULL,
  schedule_id        VARCHAR(30)  NOT NULL,
  journey_date       DATE         NOT NULL,
  boarding_point_id  VARCHAR(30)  NOT NULL,
  dropping_point_id  VARCHAR(30)  NOT NULL,
  passenger_name     VARCHAR(120) NOT NULL,
  passenger_email    VARCHAR(120) NOT NULL,
  passenger_phone    VARCHAR(25)  NOT NULL,
  passenger_gender   ENUM('male','female','other') NOT NULL,
  passenger_age      TINYINT UNSIGNED NOT NULL,
  total_fare         DECIMAL(10,2) NOT NULL,
  tax                DECIMAL(10,2) NOT NULL,
  grand_total        DECIMAL(10,2) NOT NULL,
  status             ENUM('PENDING','CONFIRMED','CANCELLED','COMPLETED') NOT NULL DEFAULT 'PENDING',
  payment_method     ENUM('UPI','Credit/Debit Card','NetBanking') NOT NULL,
  payment_status     ENUM('PENDING','PAID','REFUNDED') NOT NULL DEFAULT 'PENDING',
  razorpay_order_id  VARCHAR(50) NULL UNIQUE,
  razorpay_payment_id VARCHAR(50) NULL UNIQUE,
  booking_time       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_bk_user     FOREIGN KEY (user_id)           REFERENCES users(id)           ON DELETE SET NULL,
  CONSTRAINT fk_bk_sched    FOREIGN KEY (schedule_id)       REFERENCES schedules(id),
  CONSTRAINT fk_bk_bp       FOREIGN KEY (boarding_point_id) REFERENCES boarding_points(id),
  CONSTRAINT fk_bk_dp       FOREIGN KEY (dropping_point_id) REFERENCES dropping_points(id),
  INDEX idx_bk_user (user_id),
  INDEX idx_bk_sched_date (schedule_id, journey_date)
) ENGINE=InnoDB;

-- One row per seat. active_lock is 1 while the booking is live and NULL once
-- cancelled, so the UNIQUE key stops double-booking a seat but lets a
-- cancelled seat be sold again.
CREATE TABLE booking_seats (
  booking_id    VARCHAR(30) NOT NULL,
  schedule_id   VARCHAR(30) NOT NULL,
  journey_date  DATE        NOT NULL,
  seat_label    VARCHAR(10) NOT NULL,
  active_lock   TINYINT     NULL DEFAULT 1,
  PRIMARY KEY (booking_id, seat_label),
  UNIQUE KEY uq_seat_per_trip (schedule_id, journey_date, seat_label, active_lock),
  CONSTRAINT fk_bs_booking FOREIGN KEY (booking_id)  REFERENCES bookings(id)  ON DELETE CASCADE,
  CONSTRAINT fk_bs_sched   FOREIGN KEY (schedule_id) REFERENCES schedules(id)
) ENGINE=InnoDB;

CREATE TABLE feedback (
  id          VARCHAR(40)  PRIMARY KEY,
  user_id     VARCHAR(30)  NOT NULL,
  booking_id  VARCHAR(30)  NOT NULL UNIQUE,
  rating      TINYINT      NOT NULL,
  comments    VARCHAR(1000) NOT NULL,
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_feedback_rating CHECK (rating BETWEEN 1 AND 5),
  CONSTRAINT fk_feedback_user FOREIGN KEY (user_id)
    REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_feedback_booking FOREIGN KEY (booking_id)
    REFERENCES bookings(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE notifications (
  id          VARCHAR(40)  PRIMARY KEY,
  user_id     VARCHAR(30)  NOT NULL,
  booking_id  VARCHAR(30)  NULL,
  type        ENUM('BOOKING','CANCELLATION') NOT NULL,
  message     VARCHAR(500) NOT NULL,
  is_read     BOOLEAN      NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_notification_user FOREIGN KEY (user_id)
    REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_notification_booking FOREIGN KEY (booking_id)
    REFERENCES bookings(id) ON DELETE SET NULL,
  INDEX idx_notification_user_time (user_id, created_at)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- Views used by the portals
-- ---------------------------------------------------------------------
CREATE VIEW v_booking_details AS
SELECT b.id, b.pnr, b.user_id, b.passenger_name, b.passenger_email, b.passenger_phone,
       b.passenger_gender, b.passenger_age, b.schedule_id, bu.id AS bus_id, bu.name AS bus_name,
       o.name AS operator_name, o.type AS operator_type,
       r.source, r.destination, b.journey_date, s.departure_time, s.arrival_time,
       CONCAT(bp.location, ', ', bp.landmark) AS boarding_point,
       CONCAT(dp.location, ', ', dp.landmark) AS dropping_point,
       (SELECT GROUP_CONCAT(bs.seat_label ORDER BY bs.seat_label) FROM booking_seats bs WHERE bs.booking_id = b.id) AS selected_seats,
       b.total_fare, b.tax, b.grand_total, b.status, b.booking_time, b.payment_method, b.payment_status
FROM bookings b
JOIN schedules s        ON s.id = b.schedule_id
JOIN buses bu           ON bu.id = s.bus_id
JOIN operators o        ON o.id = bu.operator_id
JOIN routes r           ON r.id = s.route_id
JOIN boarding_points bp ON bp.id = b.boarding_point_id
JOIN dropping_points dp ON dp.id = b.dropping_point_id;

CREATE VIEW v_schedule_search AS
SELECT s.id AS schedule_id, r.source, r.destination, bu.name AS bus_name, bu.bus_type, o.name AS operator_name,
       o.type AS operator_type, s.departure_time, s.arrival_time, s.base_fare, s.sleeper_fare,
       s.days_of_operation, bu.rating
FROM schedules s
JOIN routes r    ON r.id = s.route_id
JOIN buses bu    ON bu.id = s.bus_id
JOIN operators o ON o.id = bu.operator_id
WHERE s.is_active = TRUE AND bu.status = 'active' AND o.status = 'active';

-- Booked seats for one trip:  SELECT seat_label FROM booking_seats
--   WHERE schedule_id = ? AND journey_date = ? AND active_lock = 1;
