USE gobus;

CREATE TABLE IF NOT EXISTS feedback (
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

CREATE TABLE IF NOT EXISTS notifications (
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
