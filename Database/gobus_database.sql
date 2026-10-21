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
USE gobus;

-- ---- Operators ----
INSERT INTO operators (id, name, type, category_badge, email, phone, license_number, fleet_count, active_routes_count, status, rating, revenue) VALUES
  ('op-ksrtc', 'KSRTC (Airavat & Club Class)', 'government', 'Government State Transport (STU)', 'operations@ksrtc.gov.in', '+91 80 2222 1313', 'STU-KA-1997-8821', 48, 16, 'active', 4.7, 1245000),
  ('op-msrtc', 'MSRTC (Shivneri Premium)', 'government', 'Government State Transport (STU)', 'depot.pune@msrtc.gov.in', '+91 22 2307 2000', 'STU-MH-2001-4490', 36, 12, 'active', 4.5, 980000),
  ('op-royal', 'Royal Star Luxury Travels', 'private', 'Private Luxury Fleet', 'dispatch@royalstartravels.com', '+91 98450 11223', 'PVT-EXP-2015-9921', 28, 9, 'active', 4.8, 1680000),
  ('op-zingbus', 'Zingbus Max Sleeper Coaches', 'private', 'Private Smart Sleeper Fleet', 'partner@zingbus.com', '+91 99100 88220', 'PVT-EXP-2019-3312', 34, 14, 'active', 4.6, 1420000);

-- ---- Users (demo password for every account: demo123, stored as SHA-256; use bcrypt in the real backend) ----
INSERT INTO users (id, name, email, phone, password_hash, role, operator_id) VALUES
  ('usr-101', 'Rahul Sharma', 'rahul.sharma@example.com', '+91 98765 43210', SHA2('demo123', 256), 'passenger', NULL),
  ('usr-102', 'Ananya Verma', 'ananya.v@example.com', '+91 98111 22334', SHA2('demo123', 256), 'passenger', NULL),
  ('op-ksrtc-user', 'S. K. Jenkins (Depot Superintendent)', 'operations@ksrtc.gov.in', '+91 80 2222 1313', SHA2('demo123', 256), 'operator', 'op-ksrtc'),
  ('op-royal-user', 'Vikram Singhania (Fleet Director)', 'dispatch@royalstartravels.com', '+91 98450 11223', SHA2('demo123', 256), 'operator', 'op-royal'),
  ('adm-root', 'Platform Administrator', 'admin@gobus.gov.in', '+91 11 2338 0000', SHA2('demo123', 256), 'admin', NULL);

-- ---- Buses ----
INSERT INTO buses (id, operator_id, name, bus_type, registration_number, rating, total_reviews, total_seats, status, image) VALUES
  ('bus-101', 'op-ksrtc', 'Airavat Club Class (Multi-Axle Volvo B11R)', 'Volvo Multi-Axle AC', 'KA-01-F-4557', 4.8, 842, 44, 'active', 'images/bus_operator_ksrtc_coach_1792431290082.jpg'),
  ('bus-102', 'op-msrtc', 'Shivneri Multi-Axle Scania AC', 'Volvo Multi-Axle AC', 'MH-12-RN-8809', 4.6, 531, 42, 'active', 'images/bus_operator_ksrtc_coach_1792431290082.jpg'),
  ('bus-103', 'op-royal', 'Royal Star Grand AC Sleeper (2+1)', 'AC Sleeper (2+1)', 'KA-04-AK-9102', 4.9, 1240, 36, 'active', 'images/bus_operator_private_sleeper_1792431289958.jpg'),
  ('bus-104', 'op-zingbus', 'Zingbus Max Sleeper Premium', 'AC Sleeper (2+1)', 'DL-01-AB-7744', 4.7, 968, 36, 'active', 'images/hero_luxury_bus_highway_1792431289257.jpg'),
  ('bus-105', 'op-ksrtc', 'Ambaari Dream Class Volvo Sleeper', 'AC Sleeper (2+1)', 'KA-01-F-7712', 4.9, 612, 36, 'active', 'images/bus_operator_ksrtc_coach_1792431290082.jpg');

INSERT INTO bus_amenities (bus_id, amenity) VALUES
  ('bus-101', 'Emergency Exit'),
  ('bus-101', 'Air Suspension'),
  ('bus-101', 'Reading Lights'),
  ('bus-101', 'USB Charging'),
  ('bus-101', 'Water Bottle'),
  ('bus-101', 'CCTV'),
  ('bus-102', 'Air Conditioning'),
  ('bus-102', 'Pushback Seats'),
  ('bus-102', 'Water Bottle'),
  ('bus-102', 'Emergency Exit'),
  ('bus-102', 'Punctuality Guarantee'),
  ('bus-103', 'Full Flat Berth'),
  ('bus-103', 'Pillow & Blanket'),
  ('bus-103', 'Individual LED Screen'),
  ('bus-103', 'WiFi'),
  ('bus-103', 'Snacks'),
  ('bus-103', 'Charging Socket'),
  ('bus-104', 'Air Purification'),
  ('bus-104', 'Curtain Partitions'),
  ('bus-104', 'Emergency Button'),
  ('bus-104', 'Free Water'),
  ('bus-104', 'Fast Charging'),
  ('bus-104', 'GPS Tracking'),
  ('bus-105', 'Ergonomic Sleeper'),
  ('bus-105', 'Luggage Compartment'),
  ('bus-105', 'Fire Extinguisher'),
  ('bus-105', 'First Aid'),
  ('bus-105', 'Blanket'),
  ('bus-105', 'Reading Lamp');

-- ---- Seat layouts ----
INSERT INTO seats (bus_id, seat_label, seat_type, deck, row_no, col_no, is_women_only) VALUES
  ('bus-101', 'S1A', 'seater', 'lower', 1, 0, TRUE),
  ('bus-101', 'S1B', 'seater', 'lower', 1, 1, TRUE),
  ('bus-101', 'S1C', 'seater', 'lower', 1, 2, TRUE),
  ('bus-101', 'S1D', 'seater', 'lower', 1, 3, TRUE),
  ('bus-101', 'S2A', 'seater', 'lower', 2, 0, FALSE),
  ('bus-101', 'S2B', 'seater', 'lower', 2, 1, FALSE),
  ('bus-101', 'S2C', 'seater', 'lower', 2, 2, FALSE),
  ('bus-101', 'S2D', 'seater', 'lower', 2, 3, FALSE),
  ('bus-101', 'S3A', 'seater', 'lower', 3, 0, FALSE),
  ('bus-101', 'S3B', 'seater', 'lower', 3, 1, FALSE),
  ('bus-101', 'S3C', 'seater', 'lower', 3, 2, FALSE),
  ('bus-101', 'S3D', 'seater', 'lower', 3, 3, FALSE),
  ('bus-101', 'S4A', 'seater', 'lower', 4, 0, FALSE),
  ('bus-101', 'S4B', 'seater', 'lower', 4, 1, FALSE),
  ('bus-101', 'S4C', 'seater', 'lower', 4, 2, FALSE),
  ('bus-101', 'S4D', 'seater', 'lower', 4, 3, FALSE),
  ('bus-101', 'S5A', 'seater', 'lower', 5, 0, FALSE),
  ('bus-101', 'S5B', 'seater', 'lower', 5, 1, FALSE),
  ('bus-101', 'S5C', 'seater', 'lower', 5, 2, FALSE),
  ('bus-101', 'S5D', 'seater', 'lower', 5, 3, FALSE),
  ('bus-101', 'S6A', 'seater', 'lower', 6, 0, FALSE),
  ('bus-101', 'S6B', 'seater', 'lower', 6, 1, FALSE),
  ('bus-101', 'S6C', 'seater', 'lower', 6, 2, FALSE),
  ('bus-101', 'S6D', 'seater', 'lower', 6, 3, FALSE),
  ('bus-101', 'S7A', 'seater', 'lower', 7, 0, FALSE),
  ('bus-101', 'S7B', 'seater', 'lower', 7, 1, FALSE),
  ('bus-101', 'S7C', 'seater', 'lower', 7, 2, FALSE),
  ('bus-101', 'S7D', 'seater', 'lower', 7, 3, FALSE),
  ('bus-101', 'S8A', 'seater', 'lower', 8, 0, FALSE),
  ('bus-101', 'S8B', 'seater', 'lower', 8, 1, FALSE),
  ('bus-101', 'S8C', 'seater', 'lower', 8, 2, FALSE),
  ('bus-101', 'S8D', 'seater', 'lower', 8, 3, FALSE),
  ('bus-101', 'S9A', 'seater', 'lower', 9, 0, FALSE),
  ('bus-101', 'S9B', 'seater', 'lower', 9, 1, FALSE),
  ('bus-101', 'S9C', 'seater', 'lower', 9, 2, FALSE),
  ('bus-101', 'S9D', 'seater', 'lower', 9, 3, FALSE),
  ('bus-101', 'S10A', 'seater', 'lower', 10, 0, FALSE),
  ('bus-101', 'S10B', 'seater', 'lower', 10, 1, FALSE),
  ('bus-101', 'S10C', 'seater', 'lower', 10, 2, FALSE),
  ('bus-101', 'S10D', 'seater', 'lower', 10, 3, FALSE),
  ('bus-102', 'S1A', 'seater', 'lower', 1, 0, TRUE),
  ('bus-102', 'S1B', 'seater', 'lower', 1, 1, TRUE),
  ('bus-102', 'S1C', 'seater', 'lower', 1, 2, TRUE),
  ('bus-102', 'S1D', 'seater', 'lower', 1, 3, TRUE),
  ('bus-102', 'S2A', 'seater', 'lower', 2, 0, FALSE),
  ('bus-102', 'S2B', 'seater', 'lower', 2, 1, FALSE),
  ('bus-102', 'S2C', 'seater', 'lower', 2, 2, FALSE),
  ('bus-102', 'S2D', 'seater', 'lower', 2, 3, FALSE),
  ('bus-102', 'S3A', 'seater', 'lower', 3, 0, FALSE),
  ('bus-102', 'S3B', 'seater', 'lower', 3, 1, FALSE),
  ('bus-102', 'S3C', 'seater', 'lower', 3, 2, FALSE),
  ('bus-102', 'S3D', 'seater', 'lower', 3, 3, FALSE),
  ('bus-102', 'S4A', 'seater', 'lower', 4, 0, FALSE),
  ('bus-102', 'S4B', 'seater', 'lower', 4, 1, FALSE),
  ('bus-102', 'S4C', 'seater', 'lower', 4, 2, FALSE),
  ('bus-102', 'S4D', 'seater', 'lower', 4, 3, FALSE),
  ('bus-102', 'S5A', 'seater', 'lower', 5, 0, FALSE),
  ('bus-102', 'S5B', 'seater', 'lower', 5, 1, FALSE),
  ('bus-102', 'S5C', 'seater', 'lower', 5, 2, FALSE),
  ('bus-102', 'S5D', 'seater', 'lower', 5, 3, FALSE),
  ('bus-102', 'S6A', 'seater', 'lower', 6, 0, FALSE),
  ('bus-102', 'S6B', 'seater', 'lower', 6, 1, FALSE),
  ('bus-102', 'S6C', 'seater', 'lower', 6, 2, FALSE),
  ('bus-102', 'S6D', 'seater', 'lower', 6, 3, FALSE),
  ('bus-102', 'S7A', 'seater', 'lower', 7, 0, FALSE),
  ('bus-102', 'S7B', 'seater', 'lower', 7, 1, FALSE),
  ('bus-102', 'S7C', 'seater', 'lower', 7, 2, FALSE),
  ('bus-102', 'S7D', 'seater', 'lower', 7, 3, FALSE),
  ('bus-102', 'S8A', 'seater', 'lower', 8, 0, FALSE),
  ('bus-102', 'S8B', 'seater', 'lower', 8, 1, FALSE),
  ('bus-102', 'S8C', 'seater', 'lower', 8, 2, FALSE),
  ('bus-102', 'S8D', 'seater', 'lower', 8, 3, FALSE),
  ('bus-102', 'S9A', 'seater', 'lower', 9, 0, FALSE),
  ('bus-102', 'S9B', 'seater', 'lower', 9, 1, FALSE),
  ('bus-102', 'S9C', 'seater', 'lower', 9, 2, FALSE),
  ('bus-102', 'S9D', 'seater', 'lower', 9, 3, FALSE),
  ('bus-102', 'S10A', 'seater', 'lower', 10, 0, FALSE),
  ('bus-102', 'S10B', 'seater', 'lower', 10, 1, FALSE),
  ('bus-102', 'S10C', 'seater', 'lower', 10, 2, FALSE),
  ('bus-102', 'S10D', 'seater', 'lower', 10, 3, FALSE),
  ('bus-103', 'L01', 'sleeper', 'lower', 1, 0, TRUE),
  ('bus-103', 'L02A', 'sleeper', 'lower', 1, 2, FALSE),
  ('bus-103', 'L02B', 'sleeper', 'lower', 1, 3, FALSE),
  ('bus-103', 'L03', 'sleeper', 'lower', 2, 0, FALSE),
  ('bus-103', 'L04A', 'sleeper', 'lower', 2, 2, FALSE),
  ('bus-103', 'L04B', 'sleeper', 'lower', 2, 3, FALSE),
  ('bus-103', 'L05', 'sleeper', 'lower', 3, 0, FALSE),
  ('bus-103', 'L06A', 'sleeper', 'lower', 3, 2, FALSE),
  ('bus-103', 'L06B', 'sleeper', 'lower', 3, 3, FALSE),
  ('bus-103', 'L07', 'sleeper', 'lower', 4, 0, FALSE),
  ('bus-103', 'L08A', 'sleeper', 'lower', 4, 2, FALSE),
  ('bus-103', 'L08B', 'sleeper', 'lower', 4, 3, FALSE),
  ('bus-103', 'L09', 'sleeper', 'lower', 5, 0, FALSE),
  ('bus-103', 'L10A', 'sleeper', 'lower', 5, 2, FALSE),
  ('bus-103', 'L10B', 'sleeper', 'lower', 5, 3, FALSE),
  ('bus-103', 'L11', 'sleeper', 'lower', 6, 0, FALSE),
  ('bus-103', 'L12A', 'sleeper', 'lower', 6, 2, FALSE),
  ('bus-103', 'L12B', 'sleeper', 'lower', 6, 3, FALSE),
  ('bus-103', 'U01', 'sleeper', 'upper', 1, 0, FALSE),
  ('bus-103', 'U02A', 'sleeper', 'upper', 1, 2, FALSE),
  ('bus-103', 'U02B', 'sleeper', 'upper', 1, 3, FALSE),
  ('bus-103', 'U03', 'sleeper', 'upper', 2, 0, FALSE),
  ('bus-103', 'U04A', 'sleeper', 'upper', 2, 2, FALSE),
  ('bus-103', 'U04B', 'sleeper', 'upper', 2, 3, FALSE),
  ('bus-103', 'U05', 'sleeper', 'upper', 3, 0, FALSE),
  ('bus-103', 'U06A', 'sleeper', 'upper', 3, 2, FALSE),
  ('bus-103', 'U06B', 'sleeper', 'upper', 3, 3, FALSE),
  ('bus-103', 'U07', 'sleeper', 'upper', 4, 0, FALSE),
  ('bus-103', 'U08A', 'sleeper', 'upper', 4, 2, FALSE),
  ('bus-103', 'U08B', 'sleeper', 'upper', 4, 3, FALSE),
  ('bus-103', 'U09', 'sleeper', 'upper', 5, 0, FALSE),
  ('bus-103', 'U10A', 'sleeper', 'upper', 5, 2, FALSE),
  ('bus-103', 'U10B', 'sleeper', 'upper', 5, 3, FALSE),
  ('bus-103', 'U11', 'sleeper', 'upper', 6, 0, FALSE),
  ('bus-103', 'U12A', 'sleeper', 'upper', 6, 2, FALSE),
  ('bus-103', 'U12B', 'sleeper', 'upper', 6, 3, FALSE),
  ('bus-104', 'L01', 'sleeper', 'lower', 1, 0, TRUE),
  ('bus-104', 'L02A', 'sleeper', 'lower', 1, 2, FALSE),
  ('bus-104', 'L02B', 'sleeper', 'lower', 1, 3, FALSE),
  ('bus-104', 'L03', 'sleeper', 'lower', 2, 0, FALSE),
  ('bus-104', 'L04A', 'sleeper', 'lower', 2, 2, FALSE),
  ('bus-104', 'L04B', 'sleeper', 'lower', 2, 3, FALSE),
  ('bus-104', 'L05', 'sleeper', 'lower', 3, 0, FALSE),
  ('bus-104', 'L06A', 'sleeper', 'lower', 3, 2, FALSE),
  ('bus-104', 'L06B', 'sleeper', 'lower', 3, 3, FALSE),
  ('bus-104', 'L07', 'sleeper', 'lower', 4, 0, FALSE),
  ('bus-104', 'L08A', 'sleeper', 'lower', 4, 2, FALSE),
  ('bus-104', 'L08B', 'sleeper', 'lower', 4, 3, FALSE),
  ('bus-104', 'L09', 'sleeper', 'lower', 5, 0, FALSE),
  ('bus-104', 'L10A', 'sleeper', 'lower', 5, 2, FALSE),
  ('bus-104', 'L10B', 'sleeper', 'lower', 5, 3, FALSE),
  ('bus-104', 'L11', 'sleeper', 'lower', 6, 0, FALSE),
  ('bus-104', 'L12A', 'sleeper', 'lower', 6, 2, FALSE),
  ('bus-104', 'L12B', 'sleeper', 'lower', 6, 3, FALSE),
  ('bus-104', 'U01', 'sleeper', 'upper', 1, 0, FALSE),
  ('bus-104', 'U02A', 'sleeper', 'upper', 1, 2, FALSE),
  ('bus-104', 'U02B', 'sleeper', 'upper', 1, 3, FALSE),
  ('bus-104', 'U03', 'sleeper', 'upper', 2, 0, FALSE),
  ('bus-104', 'U04A', 'sleeper', 'upper', 2, 2, FALSE),
  ('bus-104', 'U04B', 'sleeper', 'upper', 2, 3, FALSE),
  ('bus-104', 'U05', 'sleeper', 'upper', 3, 0, FALSE),
  ('bus-104', 'U06A', 'sleeper', 'upper', 3, 2, FALSE),
  ('bus-104', 'U06B', 'sleeper', 'upper', 3, 3, FALSE),
  ('bus-104', 'U07', 'sleeper', 'upper', 4, 0, FALSE),
  ('bus-104', 'U08A', 'sleeper', 'upper', 4, 2, FALSE),
  ('bus-104', 'U08B', 'sleeper', 'upper', 4, 3, FALSE),
  ('bus-104', 'U09', 'sleeper', 'upper', 5, 0, FALSE),
  ('bus-104', 'U10A', 'sleeper', 'upper', 5, 2, FALSE),
  ('bus-104', 'U10B', 'sleeper', 'upper', 5, 3, FALSE),
  ('bus-104', 'U11', 'sleeper', 'upper', 6, 0, FALSE),
  ('bus-104', 'U12A', 'sleeper', 'upper', 6, 2, FALSE),
  ('bus-104', 'U12B', 'sleeper', 'upper', 6, 3, FALSE),
  ('bus-105', 'L01', 'sleeper', 'lower', 1, 0, TRUE),
  ('bus-105', 'L02A', 'sleeper', 'lower', 1, 2, FALSE),
  ('bus-105', 'L02B', 'sleeper', 'lower', 1, 3, FALSE),
  ('bus-105', 'L03', 'sleeper', 'lower', 2, 0, FALSE),
  ('bus-105', 'L04A', 'sleeper', 'lower', 2, 2, FALSE),
  ('bus-105', 'L04B', 'sleeper', 'lower', 2, 3, FALSE),
  ('bus-105', 'L05', 'sleeper', 'lower', 3, 0, FALSE),
  ('bus-105', 'L06A', 'sleeper', 'lower', 3, 2, FALSE),
  ('bus-105', 'L06B', 'sleeper', 'lower', 3, 3, FALSE),
  ('bus-105', 'L07', 'sleeper', 'lower', 4, 0, FALSE),
  ('bus-105', 'L08A', 'sleeper', 'lower', 4, 2, FALSE),
  ('bus-105', 'L08B', 'sleeper', 'lower', 4, 3, FALSE),
  ('bus-105', 'L09', 'sleeper', 'lower', 5, 0, FALSE),
  ('bus-105', 'L10A', 'sleeper', 'lower', 5, 2, FALSE),
  ('bus-105', 'L10B', 'sleeper', 'lower', 5, 3, FALSE),
  ('bus-105', 'L11', 'sleeper', 'lower', 6, 0, FALSE),
  ('bus-105', 'L12A', 'sleeper', 'lower', 6, 2, FALSE),
  ('bus-105', 'L12B', 'sleeper', 'lower', 6, 3, FALSE),
  ('bus-105', 'U01', 'sleeper', 'upper', 1, 0, FALSE),
  ('bus-105', 'U02A', 'sleeper', 'upper', 1, 2, FALSE),
  ('bus-105', 'U02B', 'sleeper', 'upper', 1, 3, FALSE),
  ('bus-105', 'U03', 'sleeper', 'upper', 2, 0, FALSE),
  ('bus-105', 'U04A', 'sleeper', 'upper', 2, 2, FALSE),
  ('bus-105', 'U04B', 'sleeper', 'upper', 2, 3, FALSE),
  ('bus-105', 'U05', 'sleeper', 'upper', 3, 0, FALSE),
  ('bus-105', 'U06A', 'sleeper', 'upper', 3, 2, FALSE),
  ('bus-105', 'U06B', 'sleeper', 'upper', 3, 3, FALSE),
  ('bus-105', 'U07', 'sleeper', 'upper', 4, 0, FALSE),
  ('bus-105', 'U08A', 'sleeper', 'upper', 4, 2, FALSE),
  ('bus-105', 'U08B', 'sleeper', 'upper', 4, 3, FALSE),
  ('bus-105', 'U09', 'sleeper', 'upper', 5, 0, FALSE),
  ('bus-105', 'U10A', 'sleeper', 'upper', 5, 2, FALSE),
  ('bus-105', 'U10B', 'sleeper', 'upper', 5, 3, FALSE),
  ('bus-105', 'U11', 'sleeper', 'upper', 6, 0, FALSE),
  ('bus-105', 'U12A', 'sleeper', 'upper', 6, 2, FALSE),
  ('bus-105', 'U12B', 'sleeper', 'upper', 6, 3, FALSE);

-- ---- Routes ----
INSERT INTO routes (id, operator_id, source, destination, distance_km, duration_hours) VALUES
  ('route-blr-mys', NULL, 'Bengaluru', 'Mysuru', 145, '3h 15m'),
  ('route-bom-pun', NULL, 'Mumbai', 'Pune', 150, '3h 30m'),
  ('route-blr-hyd', NULL, 'Bengaluru', 'Hyderabad', 570, '8h 45m'),
  ('route-del-jai', NULL, 'Delhi', 'Jaipur', 280, '5h 15m'),
  ('route-bom-goa', NULL, 'Mumbai', 'Goa', 585, '11h 30m');

INSERT INTO boarding_points (id, route_id, time, location, landmark) VALUES
  ('bp-1', 'route-blr-mys', '06:30 AM', 'Kempegowda Bus Station (Majestic)', 'Platform 14'),
  ('bp-2', 'route-blr-mys', '07:05 AM', 'Shantinagar Bus Station', 'Gate 2'),
  ('bp-3', 'route-blr-mys', '07:45 AM', 'Kengeri Satellite Bus Stand', 'Near Metro Pillar 21'),
  ('bp-4', 'route-bom-pun', '06:00 AM', 'Dadar TT Circle', 'Near Asiad Bus Terminal'),
  ('bp-5', 'route-bom-pun', '06:45 AM', 'Vashi Plaza', 'Highway Bridge'),
  ('bp-6', 'route-blr-hyd', '09:30 PM', 'Majestic Majestic Bus Stand', 'Platform 18'),
  ('bp-7', 'route-blr-hyd', '10:15 PM', 'Hebbal Flyover', 'Near Esteem Mall'),
  ('bp-8', 'route-del-jai', '07:00 AM', 'ISBT Kashmiri Gate', 'Near Gate 1'),
  ('bp-9', 'route-del-jai', '07:45 AM', 'Dhaula Kuan Metro', 'Bus Stop'),
  ('bp-10', 'route-bom-goa', '08:00 PM', 'Borivali West', 'Gokul Hotel'),
  ('bp-11', 'route-bom-goa', '09:15 PM', 'Chembur Naka', 'Near Monorail Station');

INSERT INTO dropping_points (id, route_id, time, location, landmark) VALUES
  ('dp-1', 'route-blr-mys', '09:45 AM', 'Columbia Asia Hospital Junction', 'Highway Bypass'),
  ('dp-2', 'route-blr-mys', '10:00 AM', 'Mysuru KSRTC Central Bus Stand', 'Main Bay 4'),
  ('dp-3', 'route-bom-pun', '09:30 AM', 'Wakad Bridge', 'Flyover Bay'),
  ('dp-4', 'route-bom-pun', '10:00 AM', 'Shivaji Nagar Bus Stand', 'Platform 2'),
  ('dp-5', 'route-blr-hyd', '06:00 AM', 'Shamshabad Airport Road', 'Toll Plaza'),
  ('dp-6', 'route-blr-hyd', '06:45 AM', 'MGBS Hyderabad (Central)', 'Terminal Gate A'),
  ('dp-7', 'route-del-jai', '12:15 PM', 'Sindhi Camp Bus Stand', 'Main Concourse'),
  ('dp-8', 'route-bom-goa', '07:00 AM', 'Mapusa Bus Stand', 'Platform 1'),
  ('dp-9', 'route-bom-goa', '08:00 AM', 'Panjim KTC Bus Stand', 'Bay 6');

-- ---- Schedules ----
INSERT INTO schedules (id, bus_id, route_id, departure_time, arrival_time, base_fare, sleeper_fare, days_of_operation, is_active) VALUES
  ('sch-1', 'bus-101', 'route-blr-mys', '06:30 AM', '09:45 AM', 380, NULL, 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', TRUE),
  ('sch-2', 'bus-103', 'route-blr-mys', '08:00 AM', '11:15 AM', 490, 650, 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', TRUE),
  ('sch-3', 'bus-102', 'route-bom-pun', '06:00 AM', '09:30 AM', 520, NULL, 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', TRUE),
  ('sch-4', 'bus-104', 'route-blr-hyd', '09:30 PM', '06:15 AM', 1150, 1450, 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', TRUE),
  ('sch-5', 'bus-105', 'route-blr-hyd', '10:15 PM', '07:00 AM', 1250, 1550, 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', TRUE),
  ('sch-6', 'bus-103', 'route-bom-goa', '08:00 PM', '07:30 AM', 1350, 1750, 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', TRUE);

-- ---- Bookings ----
INSERT INTO bookings (id, pnr, user_id, schedule_id, journey_date, boarding_point_id, dropping_point_id, passenger_name, passenger_email, passenger_phone, passenger_gender, passenger_age, total_fare, tax, grand_total, status, payment_method, payment_status, booking_time) VALUES
  ('bk-1001', 'GB-842910', 'usr-101', 'sch-1', '2026-10-24', 'bp-1', 'dp-2', 'Rahul Sharma', 'rahul.sharma@example.com', '+91 98765 43210', 'male', 28, 760, 38, 798, 'CONFIRMED', 'UPI', 'PAID', '2026-10-18 14:22:00'),
  ('bk-1002', 'GB-673192', 'usr-102', 'sch-4', '2026-10-20', 'bp-7', 'dp-6', 'Ananya Verma', 'ananya.v@example.com', '+91 98111 22334', 'female', 26, 1450, 72, 1522, 'CONFIRMED', 'Credit/Debit Card', 'PAID', '2026-10-17 19:40:00'),
  ('bk-1003', 'GB-339104', 'usr-101', 'sch-3', '2026-09-15', 'bp-4', 'dp-4', 'Rahul Sharma', 'rahul.sharma@example.com', '+91 98765 43210', 'male', 28, 520, 26, 546, 'COMPLETED', 'UPI', 'PAID', '2026-09-12 11:10:00');

INSERT INTO booking_seats (booking_id, schedule_id, journey_date, seat_label, active_lock) VALUES
  ('bk-1001', 'sch-1', '2026-10-24', 'L12', 1),
  ('bk-1001', 'sch-1', '2026-10-24', 'L13', 1),
  ('bk-1002', 'sch-4', '2026-10-20', 'U4', 1),
  ('bk-1003', 'sch-3', '2026-09-15', 'L04', 1);
