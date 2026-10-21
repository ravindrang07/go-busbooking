USE gobus;

-- Search buses Bengaluru -> Mysuru
SELECT * FROM v_schedule_search WHERE source = 'Bengaluru' AND destination = 'Mysuru';

-- Seats already taken on a trip (used by the seat map)
SELECT seat_label FROM booking_seats WHERE schedule_id = 'sch-1' AND journey_date = '2026-10-24' AND active_lock = 1;

-- A passenger's bookings
SELECT * FROM v_booking_details WHERE user_id = 'usr-101' ORDER BY booking_time DESC;

-- Cancel a booking and free its seats
START TRANSACTION;
UPDATE bookings SET status = 'CANCELLED', payment_status = 'REFUNDED' WHERE id = 'bk-1001';
UPDATE booking_seats SET active_lock = NULL WHERE booking_id = 'bk-1001';
COMMIT;

-- Operator manifest
SELECT * FROM v_booking_details WHERE bus_id IN (SELECT id FROM buses WHERE operator_id = 'op-ksrtc');

-- Admin: revenue by operator type
SELECT o.type, COUNT(*) AS bookings, SUM(b.grand_total) AS revenue
FROM bookings b JOIN schedules s ON s.id = b.schedule_id JOIN buses bu ON bu.id = s.bus_id JOIN operators o ON o.id = bu.operator_id
WHERE b.status <> 'CANCELLED' GROUP BY o.type;
