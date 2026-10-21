USE gobus;

ALTER TABLE bookings
  ADD COLUMN razorpay_order_id VARCHAR(50) NULL UNIQUE,
  ADD COLUMN razorpay_payment_id VARCHAR(50) NULL UNIQUE;
