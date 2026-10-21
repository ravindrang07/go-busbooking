/* GoBus — compiled application modules */

__define("mockData", function(__exports, __require){
"use strict";
/**
 * GoBus Mock Data Store
 * Grounded realistic datasets for Government RTC & Private Luxury Operators.
 */
// Asset references generated via generate_image
const IMAGES = {
    heroBus: 'images/hero_luxury_bus_highway_1792431289257.jpg',
    govtCoach: 'images/bus_operator_ksrtc_coach_1792431290082.jpg',
    privateSleeper: 'images/bus_operator_private_sleeper_1792431289958.jpg',
    managerAvatar: 'images/avatar_driver_operator_1792431290889.jpg',
};
const INITIAL_OPERATORS = [
    {
        id: 'op-ksrtc',
        name: 'KSRTC (Airavat & Club Class)',
        type: 'government',
        categoryBadge: 'Government State Transport (STU)',
        email: 'operations@ksrtc.gov.in',
        phone: '+91 80 2222 1313',
        licenseNumber: 'STU-KA-1997-8821',
        fleetCount: 48,
        activeRoutesCount: 16,
        status: 'active',
        rating: 4.7,
        revenue: 1245000,
    },
    {
        id: 'op-msrtc',
        name: 'MSRTC (Shivneri Premium)',
        type: 'government',
        categoryBadge: 'Government State Transport (STU)',
        email: 'depot.pune@msrtc.gov.in',
        phone: '+91 22 2307 2000',
        licenseNumber: 'STU-MH-2001-4490',
        fleetCount: 36,
        activeRoutesCount: 12,
        status: 'active',
        rating: 4.5,
        revenue: 980000,
    },
    {
        id: 'op-royal',
        name: 'Royal Star Luxury Travels',
        type: 'private',
        categoryBadge: 'Private Luxury Fleet',
        email: 'dispatch@royalstartravels.com',
        phone: '+91 98450 11223',
        licenseNumber: 'PVT-EXP-2015-9921',
        fleetCount: 28,
        activeRoutesCount: 9,
        status: 'active',
        rating: 4.8,
        revenue: 1680000,
    },
    {
        id: 'op-zingbus',
        name: 'Zingbus Max Sleeper Coaches',
        type: 'private',
        categoryBadge: 'Private Smart Sleeper Fleet',
        email: 'partner@zingbus.com',
        phone: '+91 99100 88220',
        licenseNumber: 'PVT-EXP-2019-3312',
        fleetCount: 34,
        activeRoutesCount: 14,
        status: 'active',
        rating: 4.6,
        revenue: 1420000,
    },
];
const INITIAL_ROUTES = [
    {
        id: 'route-blr-mys',
        source: 'Bengaluru',
        destination: 'Mysuru',
        distanceKm: 145,
        durationHours: '3h 15m',
        boardingPoints: [
            { id: 'bp-1', time: '06:30 AM', location: 'Kempegowda Bus Station (Majestic)', landmark: 'Platform 14' },
            { id: 'bp-2', time: '07:05 AM', location: 'Shantinagar Bus Station', landmark: 'Gate 2' },
            { id: 'bp-3', time: '07:45 AM', location: 'Kengeri Satellite Bus Stand', landmark: 'Near Metro Pillar 21' },
        ],
        droppingPoints: [
            { id: 'dp-1', time: '09:45 AM', location: 'Columbia Asia Hospital Junction', landmark: 'Highway Bypass' },
            { id: 'dp-2', time: '10:00 AM', location: 'Mysuru KSRTC Central Bus Stand', landmark: 'Main Bay 4' },
        ],
    },
    {
        id: 'route-bom-pun',
        source: 'Mumbai',
        destination: 'Pune',
        distanceKm: 150,
        durationHours: '3h 30m',
        boardingPoints: [
            { id: 'bp-4', time: '06:00 AM', location: 'Dadar TT Circle', landmark: 'Near Asiad Bus Terminal' },
            { id: 'bp-5', time: '06:45 AM', location: 'Vashi Plaza', landmark: 'Highway Bridge' },
        ],
        droppingPoints: [
            { id: 'dp-3', time: '09:30 AM', location: 'Wakad Bridge', landmark: 'Flyover Bay' },
            { id: 'dp-4', time: '10:00 AM', location: 'Shivaji Nagar Bus Stand', landmark: 'Platform 2' },
        ],
    },
    {
        id: 'route-blr-hyd',
        source: 'Bengaluru',
        destination: 'Hyderabad',
        distanceKm: 570,
        durationHours: '8h 45m',
        boardingPoints: [
            { id: 'bp-6', time: '09:30 PM', location: 'Majestic Majestic Bus Stand', landmark: 'Platform 18' },
            { id: 'bp-7', time: '10:15 PM', location: 'Hebbal Flyover', landmark: 'Near Esteem Mall' },
        ],
        droppingPoints: [
            { id: 'dp-5', time: '06:00 AM', location: 'Shamshabad Airport Road', landmark: 'Toll Plaza' },
            { id: 'dp-6', time: '06:45 AM', location: 'MGBS Hyderabad (Central)', landmark: 'Terminal Gate A' },
        ],
    },
    {
        id: 'route-del-jai',
        source: 'Delhi',
        destination: 'Jaipur',
        distanceKm: 280,
        durationHours: '5h 15m',
        boardingPoints: [
            { id: 'bp-8', time: '07:00 AM', location: 'ISBT Kashmiri Gate', landmark: 'Near Gate 1' },
            { id: 'bp-9', time: '07:45 AM', location: 'Dhaula Kuan Metro', landmark: 'Bus Stop' },
        ],
        droppingPoints: [
            { id: 'dp-7', time: '12:15 PM', location: 'Sindhi Camp Bus Stand', landmark: 'Main Concourse' },
        ],
    },
    {
        id: 'route-bom-goa',
        source: 'Mumbai',
        destination: 'Goa',
        distanceKm: 585,
        durationHours: '11h 30m',
        boardingPoints: [
            { id: 'bp-10', time: '08:00 PM', location: 'Borivali West', landmark: 'Gokul Hotel' },
            { id: 'bp-11', time: '09:15 PM', location: 'Chembur Naka', landmark: 'Near Monorail Station' },
        ],
        droppingPoints: [
            { id: 'dp-8', time: '07:00 AM', location: 'Mapusa Bus Stand', landmark: 'Platform 1' },
            { id: 'dp-9', time: '08:00 AM', location: 'Panjim KTC Bus Stand', landmark: 'Bay 6' },
        ],
    },
];
const INITIAL_BUSES = [
    {
        id: 'bus-101',
        name: 'Airavat Club Class (Multi-Axle Volvo B11R)',
        operatorId: 'op-ksrtc',
        operatorName: 'KSRTC (Airavat & Club Class)',
        operatorType: 'government',
        busType: 'Volvo Multi-Axle AC',
        registrationNumber: 'KA-01-F-4557',
        rating: 4.8,
        totalReviews: 842,
        amenities: ['Emergency Exit', 'Air Suspension', 'Reading Lights', 'USB Charging', 'Water Bottle', 'CCTV'],
        totalSeats: 44,
        status: 'active',
        image: IMAGES.govtCoach,
    },
    {
        id: 'bus-102',
        name: 'Shivneri Multi-Axle Scania AC',
        operatorId: 'op-msrtc',
        operatorName: 'MSRTC (Shivneri Premium)',
        operatorType: 'government',
        busType: 'Volvo Multi-Axle AC',
        registrationNumber: 'MH-12-RN-8809',
        rating: 4.6,
        totalReviews: 531,
        amenities: ['Air Conditioning', 'Pushback Seats', 'Water Bottle', 'Emergency Exit', 'Punctuality Guarantee'],
        totalSeats: 42,
        status: 'active',
        image: IMAGES.govtCoach,
    },
    {
        id: 'bus-103',
        name: 'Royal Star Grand AC Sleeper (2+1)',
        operatorId: 'op-royal',
        operatorName: 'Royal Star Luxury Travels',
        operatorType: 'private',
        busType: 'AC Sleeper (2+1)',
        registrationNumber: 'KA-04-AK-9102',
        rating: 4.9,
        totalReviews: 1240,
        amenities: ['Full Flat Berth', 'Pillow & Blanket', 'Individual LED Screen', 'WiFi', 'Snacks', 'Charging Socket'],
        totalSeats: 36,
        status: 'active',
        image: IMAGES.privateSleeper,
    },
    {
        id: 'bus-104',
        name: 'Zingbus Max Sleeper Premium',
        operatorId: 'op-zingbus',
        operatorName: 'Zingbus Max Sleeper Coaches',
        operatorType: 'private',
        busType: 'AC Sleeper (2+1)',
        registrationNumber: 'DL-01-AB-7744',
        rating: 4.7,
        totalReviews: 968,
        amenities: ['Air Purification', 'Curtain Partitions', 'Emergency Button', 'Free Water', 'Fast Charging', 'GPS Tracking'],
        totalSeats: 36,
        status: 'active',
        image: IMAGES.heroBus,
    },
    {
        id: 'bus-105',
        name: 'Ambaari Dream Class Volvo Sleeper',
        operatorId: 'op-ksrtc',
        operatorName: 'KSRTC (Airavat & Club Class)',
        operatorType: 'government',
        busType: 'AC Sleeper (2+1)',
        registrationNumber: 'KA-01-F-7712',
        rating: 4.9,
        totalReviews: 612,
        amenities: ['Ergonomic Sleeper', 'Luggage Compartment', 'Fire Extinguisher', 'First Aid', 'Blanket', 'Reading Lamp'],
        totalSeats: 36,
        status: 'active',
        image: IMAGES.govtCoach,
    },
];
const INITIAL_SCHEDULES = [
    {
        id: 'sch-1',
        busId: 'bus-101',
        routeId: 'route-blr-mys',
        departureTime: '06:30 AM',
        arrivalTime: '09:45 AM',
        baseFare: 380,
        daysOfOperation: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        isActive: true,
    },
    {
        id: 'sch-2',
        busId: 'bus-103',
        routeId: 'route-blr-mys',
        departureTime: '08:00 AM',
        arrivalTime: '11:15 AM',
        baseFare: 490,
        sleeperFare: 650,
        daysOfOperation: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        isActive: true,
    },
    {
        id: 'sch-3',
        busId: 'bus-102',
        routeId: 'route-bom-pun',
        departureTime: '06:00 AM',
        arrivalTime: '09:30 AM',
        baseFare: 520,
        daysOfOperation: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        isActive: true,
    },
    {
        id: 'sch-4',
        busId: 'bus-104',
        routeId: 'route-blr-hyd',
        departureTime: '09:30 PM',
        arrivalTime: '06:15 AM',
        baseFare: 1150,
        sleeperFare: 1450,
        daysOfOperation: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        isActive: true,
    },
    {
        id: 'sch-5',
        busId: 'bus-105',
        routeId: 'route-blr-hyd',
        departureTime: '10:15 PM',
        arrivalTime: '07:00 AM',
        baseFare: 1250,
        sleeperFare: 1550,
        daysOfOperation: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        isActive: true,
    },
    {
        id: 'sch-6',
        busId: 'bus-103',
        routeId: 'route-bom-goa',
        departureTime: '08:00 PM',
        arrivalTime: '07:30 AM',
        baseFare: 1350,
        sleeperFare: 1750,
        daysOfOperation: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        isActive: true,
    },
];
const INITIAL_BOOKINGS = [
    {
        id: 'bk-1001',
        pnr: 'GB-842910',
        passengerName: 'Rahul Sharma',
        passengerEmail: 'rahul.sharma@example.com',
        passengerPhone: '+91 98765 43210',
        passengerGender: 'male',
        passengerAge: 28,
        scheduleId: 'sch-1',
        busId: 'bus-101',
        busName: 'Airavat Club Class (Multi-Axle Volvo B11R)',
        operatorName: 'KSRTC (Airavat & Club Class)',
        operatorType: 'government',
        source: 'Bengaluru',
        destination: 'Mysuru',
        journeyDate: '2026-10-24',
        departureTime: '06:30 AM',
        arrivalTime: '09:45 AM',
        boardingPoint: 'Kempegowda Bus Station (Majestic), Platform 14',
        droppingPoint: 'Mysuru KSRTC Central Bus Stand, Main Bay 4',
        selectedSeats: ['L12', 'L13'],
        totalFare: 760,
        tax: 38,
        grandTotal: 798,
        status: 'CONFIRMED',
        bookingTime: '2026-10-18 14:22',
        paymentMethod: 'UPI',
        paymentStatus: 'PAID',
    },
    {
        id: 'bk-1002',
        pnr: 'GB-673192',
        passengerName: 'Ananya Verma',
        passengerEmail: 'ananya.v@example.com',
        passengerPhone: '+91 98111 22334',
        passengerGender: 'female',
        passengerAge: 26,
        scheduleId: 'sch-4',
        busId: 'bus-104',
        busName: 'Zingbus Max Sleeper Premium',
        operatorName: 'Zingbus Max Sleeper Coaches',
        operatorType: 'private',
        source: 'Bengaluru',
        destination: 'Hyderabad',
        journeyDate: '2026-10-20',
        departureTime: '09:30 PM',
        arrivalTime: '06:15 AM',
        boardingPoint: 'Hebbal Flyover, Near Esteem Mall',
        droppingPoint: 'MGBS Hyderabad (Central), Terminal Gate A',
        selectedSeats: ['U4'],
        totalFare: 1450,
        tax: 72,
        grandTotal: 1522,
        status: 'CONFIRMED',
        bookingTime: '2026-10-17 19:40',
        paymentMethod: 'Credit/Debit Card',
        paymentStatus: 'PAID',
    },
    {
        id: 'bk-1003',
        pnr: 'GB-339104',
        passengerName: 'Rahul Sharma',
        passengerEmail: 'rahul.sharma@example.com',
        passengerPhone: '+91 98765 43210',
        passengerGender: 'male',
        passengerAge: 28,
        scheduleId: 'sch-3',
        busId: 'bus-102',
        busName: 'Shivneri Multi-Axle Scania AC',
        operatorName: 'MSRTC (Shivneri Premium)',
        operatorType: 'government',
        source: 'Mumbai',
        destination: 'Pune',
        journeyDate: '2026-09-15',
        departureTime: '06:00 AM',
        arrivalTime: '09:30 AM',
        boardingPoint: 'Dadar TT Circle',
        droppingPoint: 'Shivaji Nagar Bus Stand',
        selectedSeats: ['L04'],
        totalFare: 520,
        tax: 26,
        grandTotal: 546,
        status: 'COMPLETED',
        bookingTime: '2026-09-12 11:10',
        paymentMethod: 'UPI',
        paymentStatus: 'PAID',
    },
];
/**
 * Generate standard bus seat layouts (2+1 Sleeper or 2+2 Semi-Sleeper)
 */
function generateBusSeats(busType, baseFare, sleeperFare) {
    const seats = [];
    const bookedSeatCodes = ['L03', 'L07', 'L10', 'U02', 'U08', 'U11', 'L15', 'L22'];
    if (busType.includes('Sleeper')) {
        const fareSleeper = sleeperFare || Math.round(baseFare * 1.25);
        // Lower Deck: 6 rows of 2+1 sleeper berths (Row 1 to 6)
        // Left: Single berth (col 0). Right: Double berth (col 2, 3).
        for (let r = 1; r <= 6; r++) {
            const singleId = `L${(r * 2 - 1).toString().padStart(2, '0')}`;
            seats.push({
                id: singleId,
                label: singleId,
                type: 'sleeper',
                deck: 'lower',
                row: r,
                col: 0,
                price: fareSleeper,
                status: bookedSeatCodes.includes(singleId) ? 'booked' : 'available',
                isWomenOnly: r === 1,
            });
            const doubleAId = `L${(r * 2).toString().padStart(2, '0')}A`;
            const doubleBId = `L${(r * 2).toString().padStart(2, '0')}B`;
            seats.push({
                id: doubleAId,
                label: doubleAId,
                type: 'sleeper',
                deck: 'lower',
                row: r,
                col: 2,
                price: fareSleeper,
                status: bookedSeatCodes.includes(doubleAId) ? 'booked' : 'available',
            });
            seats.push({
                id: doubleBId,
                label: doubleBId,
                type: 'sleeper',
                deck: 'lower',
                row: r,
                col: 3,
                price: fareSleeper,
                status: bookedSeatCodes.includes(doubleBId) ? 'booked' : 'available',
            });
        }
        // Upper Deck: 6 rows of 2+1 sleeper berths (Row 1 to 6)
        for (let r = 1; r <= 6; r++) {
            const singleId = `U${(r * 2 - 1).toString().padStart(2, '0')}`;
            seats.push({
                id: singleId,
                label: singleId,
                type: 'sleeper',
                deck: 'upper',
                row: r,
                col: 0,
                price: fareSleeper,
                status: bookedSeatCodes.includes(singleId) ? 'booked' : 'available',
            });
            const doubleAId = `U${(r * 2).toString().padStart(2, '0')}A`;
            const doubleBId = `U${(r * 2).toString().padStart(2, '0')}B`;
            seats.push({
                id: doubleAId,
                label: doubleAId,
                type: 'sleeper',
                deck: 'upper',
                row: r,
                col: 2,
                price: fareSleeper,
                status: bookedSeatCodes.includes(doubleAId) ? 'booked' : 'available',
            });
            seats.push({
                id: doubleBId,
                label: doubleBId,
                type: 'sleeper',
                deck: 'upper',
                row: r,
                col: 3,
                price: fareSleeper,
                status: bookedSeatCodes.includes(doubleBId) ? 'booked' : 'available',
            });
        }
    }
    else {
        // 2+2 Semi-Sleeper Seater (10 rows, cols 0, 1 on left, cols 2, 3 on right)
        for (let r = 1; r <= 10; r++) {
            ['A', 'B', 'C', 'D'].forEach((letter, colIdx) => {
                const id = `S${r}${letter}`;
                seats.push({
                    id,
                    label: id,
                    type: 'seater',
                    deck: 'lower',
                    row: r,
                    col: colIdx <= 1 ? colIdx : colIdx, // col 0, 1 or 2, 3
                    price: baseFare,
                    status: bookedSeatCodes.includes(id) || (r === 2 && colIdx === 0) ? 'booked' : 'available',
                    isWomenOnly: r === 1,
                });
            });
        }
    }
    return seats;
}
__exports.IMAGES = IMAGES;
__exports.INITIAL_OPERATORS = INITIAL_OPERATORS;
__exports.INITIAL_ROUTES = INITIAL_ROUTES;
__exports.INITIAL_BUSES = INITIAL_BUSES;
__exports.INITIAL_SCHEDULES = INITIAL_SCHEDULES;
__exports.INITIAL_BOOKINGS = INITIAL_BOOKINGS;
__exports.generateBusSeats = generateBusSeats;

});

__define("storageService", function(__exports, __require){
"use strict";
/**
 * GoBus Storage & Simulation Service
 * Simulates REST API endpoints with persistent localStorage caching.
 * Designed to be swapped with Java Spring Boot backend endpoints.
 */
const { INITIAL_BUSES, INITIAL_OPERATORS, INITIAL_ROUTES, INITIAL_SCHEDULES, INITIAL_BOOKINGS } = __require("mockData");
const STORAGE_KEYS = {
    BUSES: 'gobus_buses_v1',
    ROUTES: 'gobus_routes_v1',
    SCHEDULES: 'gobus_schedules_v1',
    OPERATORS: 'gobus_operators_v1',
    BOOKINGS: 'gobus_bookings_v1',
    CURRENT_USER: 'gobus_current_user_v1',
};
// Default passenger demo user
const DEMO_PASSENGER = {
    id: 'usr-101',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    role: 'passenger',
};
// Operator demo personas
const DEMO_GOVT_OPERATOR = {
    id: 'op-ksrtc-user',
    name: 'S. K. Jenkins (Depot Superintendent)',
    email: 'operations@ksrtc.gov.in',
    phone: '+91 80 2222 1313',
    role: 'operator',
    operatorId: 'op-ksrtc',
    operatorType: 'government',
};
const DEMO_PVT_OPERATOR = {
    id: 'op-royal-user',
    name: 'Vikram Singhania (Fleet Director)',
    email: 'dispatch@royalstartravels.com',
    phone: '+91 98450 11223',
    role: 'operator',
    operatorId: 'op-royal',
    operatorType: 'private',
};
// Admin demo user
const DEMO_ADMIN = {
    id: 'adm-root',
    name: 'Platform Administrator',
    email: 'admin@gobus.gov.in',
    phone: '+91 11 2338 0000',
    role: 'admin',
};
function getStorageItem(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) {
            localStorage.setItem(key, JSON.stringify(fallback));
            return fallback;
        }
        return JSON.parse(raw);
    }
    catch {
        return fallback;
    }
}
function setStorageItem(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    }
    catch (e) {
        console.error('Storage write error', e);
    }
}
const StorageService = {
    getBuses() {
        return getStorageItem(STORAGE_KEYS.BUSES, INITIAL_BUSES);
    },
    saveBuses(buses) {
        setStorageItem(STORAGE_KEYS.BUSES, buses);
    },
    addBus(bus) {
        const list = this.getBuses();
        list.unshift(bus);
        this.saveBuses(list);
    },
    updateBus(bus) {
        const list = this.getBuses().map(b => b.id === bus.id ? bus : b);
        this.saveBuses(list);
    },
    toggleBusStatus(id) {
        const list = this.getBuses().map(b => {
            if (b.id === id) {
                return { ...b, status: b.status === 'active' ? 'inactive' : 'active' };
            }
            return b;
        });
        this.saveBuses(list);
    },
    getRoutes() {
        return getStorageItem(STORAGE_KEYS.ROUTES, INITIAL_ROUTES);
    },
    saveRoutes(routes) {
        setStorageItem(STORAGE_KEYS.ROUTES, routes);
    },
    addRoute(route) {
        const list = this.getRoutes();
        list.unshift(route);
        this.saveRoutes(list);
    },
    getSchedules() {
        return getStorageItem(STORAGE_KEYS.SCHEDULES, INITIAL_SCHEDULES);
    },
    saveSchedules(schedules) {
        setStorageItem(STORAGE_KEYS.SCHEDULES, schedules);
    },
    addSchedule(sch) {
        const list = this.getSchedules();
        list.unshift(sch);
        this.saveSchedules(list);
    },
    getOperators() {
        return getStorageItem(STORAGE_KEYS.OPERATORS, INITIAL_OPERATORS);
    },
    updateOperatorStatus(id, status) {
        const list = this.getOperators().map(op => op.id === id ? { ...op, status } : op);
        setStorageItem(STORAGE_KEYS.OPERATORS, list);
    },
    getBookings() {
        return getStorageItem(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
    },
    saveBookings(bookings) {
        setStorageItem(STORAGE_KEYS.BOOKINGS, bookings);
    },
    createBooking(booking) {
        const list = this.getBookings();
        list.unshift(booking);
        this.saveBookings(list);
    },
    cancelBooking(id) {
        const list = this.getBookings().map(bk => bk.id === id ? { ...bk, status: 'CANCELLED', paymentStatus: 'REFUNDED' } : bk);
        this.saveBookings(list);
    },
    getCurrentUser() {
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
            if (!raw)
                return null;
            const user = JSON.parse(raw);
            if (!window.GoBusApi.hasSession()) {
                localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
                return null;
            }
            return user;
        }
        catch {
            return null;
        }
    },
    setCurrentUser(user) {
        if (!user) {
            localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
        }
    },
    resetDemoData() {
        localStorage.removeItem(STORAGE_KEYS.BUSES);
        localStorage.removeItem(STORAGE_KEYS.ROUTES);
        localStorage.removeItem(STORAGE_KEYS.SCHEDULES);
        localStorage.removeItem(STORAGE_KEYS.OPERATORS);
        localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
};
__exports.DEMO_PASSENGER = DEMO_PASSENGER;
__exports.DEMO_GOVT_OPERATOR = DEMO_GOVT_OPERATOR;
__exports.DEMO_PVT_OPERATOR = DEMO_PVT_OPERATOR;
__exports.DEMO_ADMIN = DEMO_ADMIN;
__exports.StorageService = StorageService;

});

__define("components/Navbar", function(__exports, __require){
"use strict";
const { Bus, User: UserIcon } = __require("lucide-react");
const Navbar = ({ activePage, setActivePage, currentUser, onLogout, }) => {
    return (React.createElement("header", { className: "bg-white border-b border-slate-200 sticky top-0 z-40" },
        React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-2 sm:gap-8" },
            React.createElement("div", { onClick: () => setActivePage('home'), className: "flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0" },
                React.createElement("div", { className: "w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm" },
                    React.createElement(Bus, { className: "w-5 h-5" })),
                React.createElement("span", { className: "text-xl font-extrabold tracking-tight text-slate-900" },
                    "Go",
                    React.createElement("span", { className: "text-blue-600" }, "Bus")),
                React.createElement("span", { className: "text-[11px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-100 hidden sm:inline-block" }, "Intercity Network")),
            React.createElement("nav", { className: "hidden xl:flex items-center gap-7 text-sm font-medium text-slate-600" },
                React.createElement("button", { onClick: () => setActivePage('home'), className: `transition-colors whitespace-nowrap shrink-0 cursor-pointer ${activePage === 'home' ? 'text-blue-600 font-semibold' : 'hover:text-slate-900'}` }, "Home"),
                React.createElement("button", { onClick: () => setActivePage('search-results'), className: `transition-colors whitespace-nowrap shrink-0 cursor-pointer ${activePage === 'search-results' ? 'text-blue-600 font-semibold' : 'hover:text-slate-900'}` }, "Find Buses"),
                React.createElement("button", { onClick: () => setActivePage(currentUser?.role === 'passenger' ? 'user-dashboard' : 'passenger-login'), className: `transition-colors whitespace-nowrap shrink-0 cursor-pointer ${activePage === 'user-dashboard' ? 'text-blue-600 font-semibold' : 'hover:text-slate-900'}` }, "My Bookings"),
                React.createElement("button", { onClick: () => {
                        const el = document.getElementById('partners-section');
                        if (el)
                            el.scrollIntoView({ behavior: 'smooth' });
                        else
                            setActivePage('home');
                    }, className: "hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer" }, "Fleet Partners")),
            React.createElement("div", { className: "flex items-center gap-3 shrink-0" }, currentUser && currentUser.role === 'passenger' ? (React.createElement("div", { className: "flex items-center gap-3" },
                React.createElement("button", { onClick: () => setActivePage('user-dashboard'), className: "flex items-center gap-2 text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors cursor-pointer" },
                    React.createElement("div", { className: "w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs" }, currentUser.name.charAt(0)),
                    React.createElement("span", { className: "hidden sm:inline" }, currentUser.name.split(' ')[0])),
                React.createElement("button", { onClick: onLogout, className: "text-xs font-semibold text-slate-500 hover:text-slate-800 px-2 py-1 rounded border border-slate-200 cursor-pointer" }, "Sign Out"))) : (React.createElement("div", { className: "flex items-center gap-2" },
                React.createElement("button", { onClick: () => setActivePage('passenger-login'), className: "px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap" }, "Login"),
                React.createElement("button", { onClick: () => setActivePage('passenger-register'), className: "px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors cursor-pointer whitespace-nowrap" }, "Register")))))));
};
__exports.Navbar = Navbar;

});

__define("components/HeroSearch", function(__exports, __require){
"use strict";
const { useState } = React;
const { IMAGES } = __require("mockData");
const { MapPin, Calendar, ArrowRight, ShieldCheck, Clock, Award } = __require("lucide-react");
const HeroSearch = ({ onSearch }) => {
    const [source, setSource] = useState('Bengaluru');
    const [destination, setDestination] = useState('Mysuru');
    const [date, setDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!source || !destination)
            return;
        onSearch(source, destination, date);
    };
    const handleQuickRoute = (from, to) => {
        setSource(from);
        setDestination(to);
        onSearch(from, to, date);
    };
    return (React.createElement("section", { className: "relative bg-slate-900 text-white overflow-hidden" },
        React.createElement("div", { className: "absolute inset-0 z-0" },
            React.createElement("img", { src: IMAGES.heroBus, alt: "GoBus Luxury Intercity Coach on Scenic Highway", className: "w-full h-full object-cover object-center opacity-40 filter brightness-90", referrerPolicy: "no-referrer" }),
            React.createElement("div", { className: "absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" }),
            React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" })),
        React.createElement("div", { className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-20 lg:pb-28" },
            React.createElement("div", { className: "max-w-2xl mb-10" },
                React.createElement("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4" },
                    React.createElement("span", null, "Verified Fleet Network"),
                    React.createElement("span", null, "\u00B7"),
                    React.createElement("span", null, "Official Booking Gateway")),
                React.createElement("h1", { className: "text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4 text-balance" }, "Travel Smart with India's Premier Bus Network"),
                React.createElement("p", { className: "text-base sm:text-lg text-slate-300 leading-relaxed font-normal" }, "Direct online reservation for government state transport corporations and certified luxury private sleeper coaches with live seat confirmation.")),
            React.createElement("div", { className: "bg-white rounded-2xl p-4 sm:p-6 shadow-2xl border border-slate-200 text-slate-900" },
                React.createElement("form", { onSubmit: handleSubmit, className: "grid grid-cols-1 md:grid-cols-4 gap-4 items-end" },
                    React.createElement("div", { className: "flex flex-col gap-1.5" },
                        React.createElement("label", { className: "text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5" },
                            React.createElement(MapPin, { className: "w-3.5 h-3.5 text-blue-600" }),
                            "From City"),
                        React.createElement("select", { value: source, onChange: (e) => setSource(e.target.value), className: "h-12 px-3.5 rounded-xl border border-slate-300 bg-slate-50 font-medium text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all" },
                            React.createElement("option", { value: "Bengaluru" }, "Bengaluru"),
                            React.createElement("option", { value: "Mumbai" }, "Mumbai"),
                            React.createElement("option", { value: "Delhi" }, "Delhi"),
                            React.createElement("option", { value: "Chennai" }, "Chennai"))),
                    React.createElement("div", { className: "flex flex-col gap-1.5" },
                        React.createElement("label", { className: "text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5" },
                            React.createElement(MapPin, { className: "w-3.5 h-3.5 text-blue-600" }),
                            "To Destination"),
                        React.createElement("select", { value: destination, onChange: (e) => setDestination(e.target.value), className: "h-12 px-3.5 rounded-xl border border-slate-300 bg-slate-50 font-medium text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all" },
                            React.createElement("option", { value: "Mysuru" }, "Mysuru"),
                            React.createElement("option", { value: "Pune" }, "Pune"),
                            React.createElement("option", { value: "Hyderabad" }, "Hyderabad"),
                            React.createElement("option", { value: "Jaipur" }, "Jaipur"),
                            React.createElement("option", { value: "Goa" }, "Goa"))),
                    React.createElement("div", { className: "flex flex-col gap-1.5" },
                        React.createElement("label", { className: "text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5" },
                            React.createElement(Calendar, { className: "w-3.5 h-3.5 text-blue-600" }),
                            "Date of Journey"),
                        React.createElement("input", { type: "date", value: date, onChange: (e) => setDate(e.target.value), min: new Date().toISOString().split('T')[0], className: "h-12 px-3.5 rounded-xl border border-slate-300 bg-slate-50 font-medium text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all" })),
                    React.createElement("div", null,
                        React.createElement("button", { type: "submit", className: "w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer" },
                            React.createElement("span", null, "Find Available Buses"),
                            React.createElement(ArrowRight, { className: "w-4 h-4" })))),
                React.createElement("div", { className: "mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-500" },
                    React.createElement("span", { className: "font-semibold text-slate-700" }, "Popular Corridors:"),
                    React.createElement("button", { type: "button", onClick: () => handleQuickRoute('Bengaluru', 'Mysuru'), className: "px-2.5 py-1 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer font-medium" }, "Bengaluru \u2192 Mysuru (Express)"),
                    React.createElement("button", { type: "button", onClick: () => handleQuickRoute('Mumbai', 'Pune'), className: "px-2.5 py-1 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer font-medium" }, "Mumbai \u2192 Pune (Shivneri)"),
                    React.createElement("button", { type: "button", onClick: () => handleQuickRoute('Bengaluru', 'Hyderabad'), className: "px-2.5 py-1 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer font-medium" }, "Bengaluru \u2192 Hyderabad (Overnight Sleeper)"))),
            React.createElement("div", { className: "mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-slate-300" },
                React.createElement("div", { className: "flex items-center gap-3" },
                    React.createElement("div", { className: "w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-400 shrink-0" },
                        React.createElement(Award, { className: "w-5 h-5" })),
                    React.createElement("div", null,
                        React.createElement("div", { className: "text-sm font-bold text-white" }, "Government STU Certified"),
                        React.createElement("div", { className: "text-xs text-slate-400" }, "Official KSRTC & MSRTC routes"))),
                React.createElement("div", { className: "flex items-center gap-3" },
                    React.createElement("div", { className: "w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 shrink-0" },
                        React.createElement(ShieldCheck, { className: "w-5 h-5" })),
                    React.createElement("div", null,
                        React.createElement("div", { className: "text-sm font-bold text-white" }, "Guaranteed Seat Booking"),
                        React.createElement("div", { className: "text-xs text-slate-400" }, "Zero duplicate seat allocations"))),
                React.createElement("div", { className: "flex items-center gap-3" },
                    React.createElement("div", { className: "w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-400 shrink-0" },
                        React.createElement(Clock, { className: "w-5 h-5" })),
                    React.createElement("div", null,
                        React.createElement("div", { className: "text-sm font-bold text-white" }, "Real-Time Schedule Status"),
                        React.createElement("div", { className: "text-xs text-slate-400" }, "Punctual departures and GPS")))))));
};
__exports.HeroSearch = HeroSearch;

});

__define("components/BusListings", function(__exports, __require){
"use strict";
const { useState, useMemo } = React;
const { Star, Shield, Wifi, Zap, AlertCircle, ArrowRight, Filter } = __require("lucide-react");
const BusListings = ({ source, destination, date, buses, routes, schedules, onSelectBus, onModifySearch, }) => {
    // Filter states
    const [operatorFilter, setOperatorFilter] = useState('all');
    const [busTypeFilter, setBusTypeFilter] = useState('all');
    const [sortBy, setSortBy] = useState('price_asc');
    // Find matching route or fallback to the closest one
    const currentRoute = useMemo(() => {
        return (routes.find((r) => r.source.toLowerCase() === source.toLowerCase() &&
            r.destination.toLowerCase() === destination.toLowerCase()) || routes[0]);
    }, [routes, source, destination]);
    // Combine schedule and bus
    const matchingSchedules = useMemo(() => {
        let list = schedules
            .filter((s) => s.isActive && (s.routeId === currentRoute?.id || true))
            .map((s) => {
            const bus = buses.find((b) => b.id === s.busId) || buses[0];
            return { schedule: s, bus, route: currentRoute };
        });
        // Filter by operator
        if (operatorFilter !== 'all') {
            list = list.filter((item) => item.bus.operatorType === operatorFilter);
        }
        // Filter by bus type
        if (busTypeFilter !== 'all') {
            list = list.filter((item) => item.bus.busType === busTypeFilter);
        }
        // Sorting
        list.sort((a, b) => {
            if (sortBy === 'price_asc')
                return a.schedule.baseFare - b.schedule.baseFare;
            if (sortBy === 'price_desc')
                return b.schedule.baseFare - a.schedule.baseFare;
            if (sortBy === 'rating_desc')
                return b.bus.rating - a.bus.rating;
            return a.schedule.departureTime.localeCompare(b.schedule.departureTime);
        });
        return list;
    }, [schedules, buses, currentRoute, operatorFilter, busTypeFilter, sortBy]);
    return (React.createElement("div", { className: "bg-slate-50 min-h-screen pb-16" },
        React.createElement("div", { className: "bg-white border-b border-slate-200 py-4 shadow-xs" },
            React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4" },
                React.createElement("div", null,
                    React.createElement("div", { className: "flex items-center gap-2" },
                        React.createElement("span", { className: "text-xl font-extrabold text-slate-900" }, source),
                        React.createElement(ArrowRight, { className: "w-5 h-5 text-blue-600" }),
                        React.createElement("span", { className: "text-xl font-extrabold text-slate-900" }, destination)),
                    React.createElement("div", { className: "text-xs text-slate-500 mt-1 flex items-center gap-2" },
                        React.createElement("span", null,
                            "Date: ",
                            date),
                        React.createElement("span", null, "\u00B7"),
                        React.createElement("span", null,
                            matchingSchedules.length,
                            " Scheduled Buses Available"))),
                React.createElement("button", { onClick: onModifySearch, className: "px-4 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors cursor-pointer" }, "Modify Search"))),
        React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8" },
            React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-8 items-start" },
                React.createElement("aside", { className: "bus-listings-filter bg-white border border-slate-200 rounded-2xl p-5 shadow-xs" },
                    React.createElement("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100 mb-5" },
                        React.createElement("span", { className: "font-bold text-sm text-slate-900 flex items-center gap-1.5" },
                            React.createElement(Filter, { className: "w-4 h-4 text-blue-600" }),
                            "Filter Options"),
                        React.createElement("button", { onClick: () => {
                                setOperatorFilter('all');
                                setBusTypeFilter('all');
                                setSortBy('price_asc');
                            }, className: "text-xs text-blue-600 hover:underline cursor-pointer" }, "Reset")),
                    React.createElement("div", { className: "mb-6" },
                        React.createElement("label", { className: "text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2.5" }, "Operator Type"),
                        React.createElement("div", { className: "space-y-2" }, [
                            { id: 'all', label: 'All Operators' },
                            { id: 'government', label: 'Government STU (KSRTC/MSRTC)' },
                            { id: 'private', label: 'Private Luxury Fleet' },
                        ].map((opt) => (React.createElement("label", { key: opt.id, className: "flex items-center gap-2 text-xs text-slate-700 cursor-pointer" },
                            React.createElement("input", { type: "radio", name: "operatorType", checked: operatorFilter === opt.id, onChange: () => setOperatorFilter(opt.id), className: "text-blue-600 focus:ring-blue-500" }),
                            React.createElement("span", null, opt.label)))))),
                    React.createElement("div", { className: "mb-6" },
                        React.createElement("label", { className: "text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2.5" }, "Bus Class & Seating"),
                        React.createElement("div", { className: "space-y-2" }, [
                            { id: 'all', label: 'All Bus Classes' },
                            { id: 'AC Sleeper (2+1)', label: 'AC Sleeper (2+1)' },
                            { id: 'Volvo Multi-Axle AC', label: 'Volvo Multi-Axle' },
                            { id: 'BharatBenz Executive (2+2)', label: 'Executive Seater' },
                        ].map((opt) => (React.createElement("label", { key: opt.id, className: "flex items-center gap-2 text-xs text-slate-700 cursor-pointer" },
                            React.createElement("input", { type: "radio", name: "busType", checked: busTypeFilter === opt.id, onChange: () => setBusTypeFilter(opt.id), className: "text-blue-600 focus:ring-blue-500" }),
                            React.createElement("span", null, opt.label)))))),
                    React.createElement("div", null,
                        React.createElement("label", { className: "text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2.5" }, "Sort Results By"),
                        React.createElement("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "w-full text-xs font-medium text-slate-800 bg-slate-50 border border-slate-300 rounded-lg p-2.5 outline-none focus:border-blue-600" },
                            React.createElement("option", { value: "price_asc" }, "Price: Lowest to Highest"),
                            React.createElement("option", { value: "price_desc" }, "Price: Highest to Lowest"),
                            React.createElement("option", { value: "rating_desc" }, "Customer Rating (Highest)"),
                            React.createElement("option", { value: "dep_asc" }, "Departure Time (Earliest)")))),
                React.createElement("main", { className: "lg:col-span-3 space-y-4" }, matchingSchedules.length === 0 ? (React.createElement("div", { className: "bg-white border border-slate-200 rounded-2xl p-10 text-center" },
                    React.createElement(AlertCircle, { className: "w-10 h-10 text-slate-400 mx-auto mb-3" }),
                    React.createElement("h3", { className: "text-base font-bold text-slate-800" }, "No buses matching your filters"),
                    React.createElement("p", { className: "text-xs text-slate-500 mt-1" }, "Try adjusting the operator category or bus type filters."))) : (matchingSchedules.map(({ bus, schedule, route }) => (React.createElement("div", { key: schedule.id, className: "bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow" },
                    React.createElement("div", { className: "flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-100" },
                        React.createElement("div", null,
                            React.createElement("div", { className: "flex items-center gap-2.5" },
                                React.createElement("span", { className: `text-[11px] font-bold px-2 py-0.5 rounded ${bus.operatorType === 'government'
                                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                        : 'bg-indigo-50 text-indigo-800 border border-indigo-200'}` }, bus.operatorType === 'government'
                                    ? 'Government STU'
                                    : 'Private Luxury Fleet'),
                                React.createElement("span", { className: "text-xs text-slate-400 font-mono" }, bus.registrationNumber)),
                            React.createElement("h3", { className: "text-lg font-bold text-slate-900 mt-1" }, bus.name),
                            React.createElement("div", { className: "flex items-center gap-2 text-xs text-slate-500 mt-0.5" },
                                React.createElement("span", { className: "font-medium text-slate-700" }, bus.operatorName),
                                React.createElement("span", null, "\u00B7"),
                                React.createElement("span", { className: "flex items-center gap-1 text-amber-600 font-semibold" },
                                    React.createElement(Star, { className: "w-3.5 h-3.5 fill-amber-500 text-amber-500" }),
                                    bus.rating,
                                    " (",
                                    bus.totalReviews,
                                    ")"))),
                        React.createElement("div", { className: "text-right" },
                            React.createElement("div", { className: "text-2xl font-extrabold text-blue-700 font-mono tabular-nums" },
                                "\u20B9",
                                schedule.baseFare),
                            React.createElement("div", { className: "text-[11px] text-slate-500" }, "per passenger"))),
                    React.createElement("div", { className: "py-5 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center" },
                        React.createElement("div", null,
                            React.createElement("div", { className: "text-xl font-extrabold text-slate-900 font-mono tabular-nums" }, schedule.departureTime),
                            React.createElement("div", { className: "text-xs font-semibold text-slate-700 mt-0.5" }, source),
                            React.createElement("div", { className: "text-[11px] text-slate-400 truncate max-w-[200px]" }, route?.boardingPoints[0]?.location || 'Main Depot Terminal')),
                        React.createElement("div", { className: "text-center" },
                            React.createElement("span", { className: "text-xs font-semibold text-slate-500 font-mono" }, route?.durationHours || '3h 30m'),
                            React.createElement("div", { className: "relative my-1.5 flex items-center justify-center" },
                                React.createElement("div", { className: "w-full max-w-[140px] h-0.5 bg-slate-200" }),
                                React.createElement("div", { className: "absolute w-2 h-2 rounded-full bg-blue-600" })),
                            React.createElement("span", { className: "text-[11px] text-slate-400 font-medium" }, "Express Highway")),
                        React.createElement("div", { className: "sm:text-right" },
                            React.createElement("div", { className: "text-xl font-extrabold text-slate-900 font-mono tabular-nums" }, schedule.arrivalTime),
                            React.createElement("div", { className: "text-xs font-semibold text-slate-700 mt-0.5" }, destination),
                            React.createElement("div", { className: "text-[11px] text-slate-400 truncate max-w-[200px] sm:ml-auto" }, route?.droppingPoints[0]?.location || 'Central Bus Stand'))),
                    React.createElement("div", { className: "pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4" },
                        React.createElement("div", { className: "flex items-center gap-2 flex-wrap" },
                            React.createElement("span", { className: `text-xs font-bold px-2 py-0.5 rounded-md ${schedule.availableSeats > 0 ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'}` }, `${schedule.availableSeats} ${bus.busType.includes('Sleeper') ? 'Berths' : 'Seats'} Available`),
                            React.createElement("div", { className: "hidden sm:flex items-center gap-2 text-xs text-slate-500" },
                                React.createElement("span", { className: "flex items-center gap-1" },
                                    React.createElement(Zap, { className: "w-3.5 h-3.5 text-slate-400" }),
                                    " Charging"),
                                React.createElement("span", null, "\u00B7"),
                                React.createElement("span", { className: "flex items-center gap-1" },
                                    React.createElement(Wifi, { className: "w-3.5 h-3.5 text-slate-400" }),
                                    " WiFi"),
                                React.createElement("span", null, "\u00B7"),
                                React.createElement("span", { className: "flex items-center gap-1" },
                                    React.createElement(Shield, { className: "w-3.5 h-3.5 text-slate-400" }),
                                    " GPS Track"))),
                        React.createElement("button", { onClick: () => onSelectBus(bus, schedule, route), className: "px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer" },
                            React.createElement("span", null, "Select Seats"),
                            React.createElement(ArrowRight, { className: "w-3.5 h-3.5" }))))))))))));
};
__exports.BusListings = BusListings;

});

__define("components/SeatMap", function(__exports, __require){
"use strict";
const { useState, useMemo, useEffect } = React;
const { ArrowLeft, Check, Info, ShieldAlert } = __require("lucide-react");
const SeatMap = ({ bus, schedule, route, journeyDate, onProceedToCheckout, onBack, }) => {
    const [allSeats, setAllSeats] = useState([]);
    const [seatsLoaded, setSeatsLoaded] = useState(false);
    const [seatError, setSeatError] = useState('');
    const [selectedSeatIds, setSelectedSeatIds] = useState([]);
    const [selectedBoardingId, setSelectedBoardingId] = useState(route.boardingPoints[0]?.id || '');
    const [selectedDroppingId, setSelectedDroppingId] = useState(route.droppingPoints[0]?.id || '');
    useEffect(() => {
        let active = true;
        setSeatsLoaded(false);
        setSeatError('');
        setAllSeats([]);
        setSelectedSeatIds([]);
        window.GoBusApi.getSeats(schedule.id, journeyDate)
            .then((seats) => {
                if (!active)
                    return;
                setAllSeats(seats.map((seat, index) => ({
                    id: seat.label,
                    label: seat.label,
                    type: seat.type,
                    deck: seat.deck,
                    row: index + 1,
                    col: index % 4,
                    price: Number(seat.fare),
                    status: seat.available ? 'available' : 'booked',
                    isWomenOnly: seat.womenOnly,
                })));
            })
            .catch((error) => {
                if (active)
                    setSeatError(error.message);
            })
            .finally(() => {
                if (active)
                    setSeatsLoaded(true);
            });
        return () => {
            active = false;
        };
    }, [schedule.id, journeyDate]);
    const toggleSeat = (seat) => {
        if (seat.status === 'booked')
            return;
        if (selectedSeatIds.includes(seat.id)) {
            setSelectedSeatIds((prev) => prev.filter((id) => id !== seat.id));
        }
        else {
            if (selectedSeatIds.length >= 6) {
                alert('Maximum 6 seats can be reserved per booking.');
                return;
            }
            setSelectedSeatIds((prev) => [...prev, seat.id]);
        }
    };
    // Pricing calculations
    const totalBaseFare = useMemo(() => {
        return selectedSeatIds.reduce((sum, id) => {
            const s = allSeats.find((seat) => seat.id === id);
            return sum + (s?.price || schedule.baseFare);
        }, 0);
    }, [selectedSeatIds, allSeats, schedule.baseFare]);
    const gstTax = Math.round(totalBaseFare * 0.05);
    const grandTotal = totalBaseFare + gstTax;
    const currentBoardingPoint = route.boardingPoints.find((bp) => bp.id === selectedBoardingId) ||
        route.boardingPoints[0];
    const currentDroppingPoint = route.droppingPoints.find((dp) => dp.id === selectedDroppingId) ||
        route.droppingPoints[0];
    const lowerSeats = allSeats.filter((s) => s.deck === 'lower');
    const upperSeats = allSeats.filter((s) => s.deck === 'upper');
    return (React.createElement("div", { className: "bg-slate-50 min-h-screen pb-16" },
        React.createElement("div", { className: "bg-white border-b border-slate-200 py-4 shadow-xs" },
            React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between" },
                React.createElement("button", { onClick: onBack, className: "flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors cursor-pointer" },
                    React.createElement(ArrowLeft, { className: "w-4 h-4" }),
                    React.createElement("span", null, "Back to Bus Listings")),
                React.createElement("div", { className: "text-right" },
                    React.createElement("span", { className: "text-xs font-semibold text-slate-500" },
                        route.source,
                        " \u2192 ",
                        route.destination),
                    React.createElement("div", { className: "text-sm font-bold text-slate-900" }, bus.name)))),
        React.createElement("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8" },
            React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 items-start" },
                React.createElement("div", { className: "lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs" },
                    React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100" },
                        React.createElement("div", null,
                            React.createElement("h2", { className: "text-xl font-extrabold text-slate-900" }, "Interactive Seat Selection"),
                            React.createElement("p", { className: "text-xs text-slate-500 mt-1" }, "Click on an available seat or berth to reserve. Maximum 6 seats per transaction.")),
                        React.createElement("div", { className: "flex items-center gap-4 text-xs" },
                            React.createElement("div", { className: "flex items-center gap-1.5" },
                                React.createElement("div", { className: "w-4 h-4 rounded border border-slate-300 bg-white" }),
                                React.createElement("span", { className: "text-slate-600" }, "Available")),
                            React.createElement("div", { className: "flex items-center gap-1.5" },
                                React.createElement("div", { className: "w-4 h-4 rounded bg-blue-600 border border-blue-600" }),
                                React.createElement("span", { className: "text-slate-600 font-semibold" }, "Selected")),
                            React.createElement("div", { className: "flex items-center gap-1.5" },
                                React.createElement("div", { className: "w-4 h-4 rounded bg-slate-200 border border-slate-300" }),
                                React.createElement("span", { className: "text-slate-400" }, "Booked")),
                            React.createElement("div", { className: "flex items-center gap-1.5" },
                                React.createElement("div", { className: "w-4 h-4 rounded bg-pink-50 border border-pink-400" }),
                                React.createElement("span", { className: "text-pink-700" }, "Ladies")))),
                    React.createElement("div", { className: "mt-8 bg-slate-100 border-2 border-slate-300 rounded-3xl p-6 relative max-w-xl mx-auto shadow-inner" },
                        React.createElement("div", { className: "flex justify-end pb-4 border-b border-dashed border-slate-300 mb-6" },
                            React.createElement("div", { className: "flex items-center gap-2 bg-white border border-slate-300 px-3 py-1 rounded-full text-xs font-bold text-slate-600 shadow-xs" },
                                React.createElement("span", { className: "text-base leading-none" }, "\u2388"),
                                React.createElement("span", null, "Driver Cabin"))),
                        seatError && React.createElement("p", { role: "alert", className: "mb-4 rounded-lg bg-rose-50 p-3 text-xs text-rose-700" }, seatError),
                        !seatsLoaded && React.createElement("p", { className: "mb-4 text-sm text-slate-500" }, "Loading live seat availability..."),
                        seatsLoaded && !seatError && allSeats.length === 0 && React.createElement("p", { className: "mb-4 text-sm text-amber-700" }, "No seats are configured for this bus."),
                        React.createElement("div", { className: "mb-8" },
                            React.createElement("div", { className: "text-xs font-bold text-slate-500 uppercase tracking-wider mb-3" }, "Lower Deck (Seating & Berths)"),
                            React.createElement("div", { className: "grid grid-cols-4 gap-3" }, lowerSeats.map((seat) => {
                                const isSelected = selectedSeatIds.includes(seat.id);
                                const isBooked = seat.status === 'booked';
                                return (React.createElement("button", { key: seat.id, type: "button", disabled: isBooked, onClick: () => toggleSeat(seat), className: `h-11 rounded-lg font-mono text-xs font-bold flex items-center justify-center transition-all cursor-pointer relative ${isBooked
                                        ? 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed'
                                        : isSelected
                                            ? 'bg-blue-600 text-white border-2 border-blue-700 shadow-sm'
                                            : seat.isWomenOnly
                                                ? 'bg-pink-50 text-pink-700 border border-pink-400 hover:border-blue-600'
                                                : 'bg-white text-slate-800 border border-slate-300 hover:border-blue-600 hover:bg-blue-50'}` }, isSelected ? React.createElement(Check, { className: "w-4 h-4" }) : seat.label));
                            }))),
                        upperSeats.length > 0 && (React.createElement("div", { className: "pt-6 border-t border-dashed border-slate-300" },
                            React.createElement("div", { className: "text-xs font-bold text-slate-500 uppercase tracking-wider mb-3" }, "Upper Deck (Luxury Sleeper Berths)"),
                            React.createElement("div", { className: "grid grid-cols-3 gap-3" }, upperSeats.map((seat) => {
                                const isSelected = selectedSeatIds.includes(seat.id);
                                const isBooked = seat.status === 'booked';
                                return (React.createElement("button", { key: seat.id, type: "button", disabled: isBooked, onClick: () => toggleSeat(seat), className: `h-12 rounded-lg font-mono text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${isBooked
                                        ? 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed'
                                        : isSelected
                                            ? 'bg-blue-600 text-white border-2 border-blue-700 shadow-sm'
                                            : 'bg-white text-slate-800 border border-slate-300 hover:border-blue-600 hover:bg-blue-50'}` }, isSelected ? React.createElement(Check, { className: "w-4 h-4" }) : `${seat.label} (Berth)`));
                            })))))),
                React.createElement("aside", { className: "bg-white border border-slate-200 rounded-2xl p-6 shadow-xs sticky top-24" },
                    React.createElement("h3", { className: "text-lg font-bold text-slate-900 pb-4 border-b border-slate-100" }, "Trip Reservation Summary"),
                    React.createElement("div", { className: "py-4 border-b border-slate-100" },
                        React.createElement("span", { className: "text-xs font-semibold text-slate-500 block mb-2" }, "Selected Seat(s):"),
                        selectedSeatIds.length === 0 ? (React.createElement("div", { className: "text-xs text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200 flex items-center gap-1.5" },
                            React.createElement(Info, { className: "w-3.5 h-3.5 shrink-0" }),
                            React.createElement("span", null, "Please choose at least 1 seat on the layout."))) : (React.createElement("div", { className: "flex flex-wrap gap-1.5" }, selectedSeatIds.map((id) => (React.createElement("span", { key: id, className: "px-2.5 py-1 bg-blue-100 text-blue-800 font-mono text-xs font-bold rounded-md border border-blue-200" }, id)))))),
                    React.createElement("div", { className: "py-4 border-b border-slate-100" },
                        React.createElement("label", { className: "text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2" }, "Select Boarding Point"),
                        React.createElement("select", { value: selectedBoardingId, onChange: (e) => setSelectedBoardingId(e.target.value), className: "w-full text-xs font-medium text-slate-900 bg-slate-50 border border-slate-300 rounded-xl p-3 outline-none focus:border-blue-600 focus:bg-white transition-all" }, route.boardingPoints.map((bp) => (React.createElement("option", { key: bp.id, value: bp.id },
                            bp.time,
                            " \u2014 ",
                            bp.location,
                            " (",
                            bp.landmark,
                            ")"))))),
                    React.createElement("div", { className: "py-4 border-b border-slate-100" },
                        React.createElement("label", { className: "text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2" }, "Select Dropping Point"),
                        React.createElement("select", { value: selectedDroppingId, onChange: (e) => setSelectedDroppingId(e.target.value), className: "w-full text-xs font-medium text-slate-900 bg-slate-50 border border-slate-300 rounded-xl p-3 outline-none focus:border-blue-600 focus:bg-white transition-all" }, route.droppingPoints.map((dp) => (React.createElement("option", { key: dp.id, value: dp.id },
                            dp.time,
                            " \u2014 ",
                            dp.location,
                            " (",
                            dp.landmark,
                            ")"))))),
                    React.createElement("div", { className: "py-4 space-y-2 text-xs" },
                        React.createElement("div", { className: "flex justify-between text-slate-600" },
                            React.createElement("span", null,
                                "Base Fare (",
                                selectedSeatIds.length,
                                " seat(s)):"),
                            React.createElement("span", { className: "font-mono tabular-nums font-bold text-slate-900" },
                                "\u20B9",
                                totalBaseFare)),
                        React.createElement("div", { className: "flex justify-between text-slate-600" },
                            React.createElement("span", null, "GST & State Passenger Cess (5%):"),
                            React.createElement("span", { className: "font-mono tabular-nums font-bold text-slate-900" },
                                "\u20B9",
                                gstTax)),
                        React.createElement("div", { className: "pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-slate-900" },
                            React.createElement("span", null, "Total Payable:"),
                            React.createElement("span", { className: "text-blue-700 font-mono tabular-nums text-lg" },
                                "\u20B9",
                                grandTotal))),
                    React.createElement("button", { type: "button", disabled: selectedSeatIds.length === 0, onClick: () => {
                            const bStr = `${currentBoardingPoint.location} (${currentBoardingPoint.time})`;
                            const dStr = `${currentDroppingPoint.location} (${currentDroppingPoint.time})`;
                            onProceedToCheckout(
                                selectedSeatIds,
                                { id: selectedBoardingId, label: bStr },
                                { id: selectedDroppingId, label: dStr },
                                totalBaseFare, gstTax, grandTotal);
                        }, className: `w-full py-3.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer mt-2 ${selectedSeatIds.length === 0
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'}` }, "Continue to Passenger Details"))))));
};
__exports.SeatMap = SeatMap;

});

__define("components/CheckoutModal", function(__exports, __require){
"use strict";
const { useState } = React;
const { X, CreditCard, QrCode, Building, ShieldCheck, CheckCircle } = __require("lucide-react");
const CheckoutModal = ({ bus, schedule, journeyDate, source, destination, selectedSeats, boardingPoint, droppingPoint, totalFare, tax, grandTotal, currentUser, onBookingSuccess, onClose, }) => {
    const [passengerName, setPassengerName] = useState(currentUser?.name || '');
    const [passengerEmail, setPassengerEmail] = useState(currentUser?.email || '');
    const [passengerPhone, setPassengerPhone] = useState(currentUser?.phone || '');
    const [passengerGender, setPassengerGender] = useState('male');
    const [passengerAge, setPassengerAge] = useState(28);
    const [paymentMethod, setPaymentMethod] = useState('UPI');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');
    const [pendingBooking, setPendingBooking] = useState(null);
    const [paymentEnabled, setPaymentEnabled] = useState(null);
    React.useEffect(() => {
        let active = true;
        window.GoBusApi.getPaymentConfiguration()
            .then(configuration => {
                if (active)
                    setPaymentEnabled(configuration.enabled);
            })
            .catch(requestError => {
                if (active)
                    setError(requestError.message);
            });
        return () => {
            active = false;
        };
    }, []);
    const loadRazorpayCheckout = () => new Promise((resolve, reject) => {
        if (typeof window.Razorpay === 'function') {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = resolve;
        script.onerror = () => reject(new Error('Razorpay Checkout could not be loaded. Check your internet connection and retry.'));
        document.head.appendChild(script);
    });
    const handlePay = async (e) => {
        e.preventDefault();
        setError('');
        setIsProcessing(true);
        try {
            const paymentConfiguration =
                await window.GoBusApi.getPaymentConfiguration();
            const booking = pendingBooking || await window.GoBusApi.createBooking({
                scheduleId: schedule.id,
                journeyDate,
                boardingPointId: boardingPoint.id,
                droppingPointId: droppingPoint.id,
                passengerName,
                passengerEmail,
                passengerPhone,
                passengerGender,
                passengerAge,
                seatLabels: selectedSeats,
                paymentMethod
            });
            if (!pendingBooking)
                setPendingBooking(booking);
            if (!paymentConfiguration.enabled) {
                onBookingSuccess({
                    ...booking,
                    busName: bus.name,
                    operatorName: bus.operatorName,
                    operatorType: bus.operatorType,
                    source,
                    destination,
                    journeyDate,
                    departureTime: schedule.departureTime,
                    arrivalTime: schedule.arrivalTime,
                    boardingPoint: boardingPoint.label,
                    droppingPoint: droppingPoint.label,
                    selectedSeats,
                    totalFare,
                    tax,
                    grandTotal
                });
                return;
            }
            await loadRazorpayCheckout();
            const order = await window.GoBusApi.createPaymentOrder(booking.pnr);
            const checkout = new window.Razorpay({
                key: order.keyId,
                amount: order.amount,
                currency: order.currency,
                name: order.name,
                description: order.description,
                order_id: order.orderId,
                prefill: {
                    name: passengerName,
                    email: passengerEmail,
                    contact: passengerPhone
                },
                notes: { pnr: booking.pnr },
                theme: { color: '#2563eb' },
                handler: async (paymentResult) => {
                    setIsProcessing(true);
                    setError('');
                    try {
                        const verified = await window.GoBusApi.verifyPayment(
                            booking.pnr, paymentResult);
                        onBookingSuccess({
                            ...booking,
                            ...verified,
                            busName: bus.name,
                            operatorName: bus.operatorName,
                            operatorType: bus.operatorType,
                            source,
                            destination,
                            journeyDate,
                            departureTime: schedule.departureTime,
                            arrivalTime: schedule.arrivalTime,
                            boardingPoint: boardingPoint.label,
                            droppingPoint: droppingPoint.label,
                            selectedSeats,
                            totalFare,
                            tax,
                            grandTotal
                        });
                    } catch (verificationError) {
                        setError(verificationError.message);
                    } finally {
                        setIsProcessing(false);
                    }
                },
                modal: {
                    ondismiss: () => {
                        setError(`Payment was not completed. Reservation ${booking.pnr} remains pending; you can retry payment.`);
                        setIsProcessing(false);
                    }
                }
            });
            setIsProcessing(false);
            checkout.open();
        }
        catch (requestError) {
            setError(requestError.message);
            setIsProcessing(false);
        }
    };
    return (React.createElement("div", { className: "fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto" },
        React.createElement("div", { className: "bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8" },
            React.createElement("div", { className: "bg-slate-900 text-white px-6 py-4 flex items-center justify-between" },
                React.createElement("div", null,
                    React.createElement("div", { className: "text-xs uppercase font-bold text-blue-400 tracking-wider" }, paymentEnabled === false ? "Seat Reservation" : "Secure Reservation Checkout"),
                    React.createElement("h2", { className: "text-lg font-bold" }, "Passenger Details & Reservation")),
                React.createElement("button", { onClick: onClose, className: "p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer" },
                    React.createElement(X, { className: "w-5 h-5" }))),
            React.createElement("form", { onSubmit: handlePay, className: "p-6 space-y-6" },
                React.createElement("div", { className: "bg-blue-50/70 border border-blue-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs" },
                    React.createElement("div", null,
                        React.createElement("span", { className: "font-extrabold text-blue-900 text-sm" },
                            source,
                            " \u2192 ",
                            destination),
                        React.createElement("div", { className: "text-blue-700 mt-0.5" },
                            bus.name,
                            " \u2022 ",
                            journeyDate,
                            " at ",
                            schedule.departureTime)),
                    React.createElement("div", { className: "text-right" },
                        React.createElement("span", { className: "font-bold text-blue-900" },
                            "Seat(s): ",
                            selectedSeats.join(', ')),
                        React.createElement("div", { className: "text-blue-700 font-mono font-bold text-sm mt-0.5" },
                            "Total: \u20B9",
                            grandTotal))),
                React.createElement("div", null,
                    React.createElement("h3", { className: "text-sm font-bold text-slate-900 mb-3" }, "Primary Passenger Info"),
                    React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3" },
                        React.createElement("div", null,
                            React.createElement("label", { className: "text-xs font-semibold text-slate-600 block mb-1" }, "Full Name"),
                            React.createElement("input", { type: "text", required: true, value: passengerName, onChange: (e) => setPassengerName(e.target.value), className: "w-full h-11 px-3 rounded-xl border border-slate-300 text-xs text-slate-900 font-medium outline-none focus:border-blue-600" })),
                        React.createElement("div", null,
                            React.createElement("label", { className: "text-xs font-semibold text-slate-600 block mb-1" }, "Mobile Phone"),
                            React.createElement("input", { type: "tel", required: true, value: passengerPhone, onChange: (e) => setPassengerPhone(e.target.value), className: "w-full h-11 px-3 rounded-xl border border-slate-300 text-xs text-slate-900 font-medium outline-none focus:border-blue-600" })),
                        React.createElement("div", null,
                            React.createElement("label", { className: "text-xs font-semibold text-slate-600 block mb-1" }, "Email for E-Ticket"),
                            React.createElement("input", { type: "email", required: true, value: passengerEmail, onChange: (e) => setPassengerEmail(e.target.value), className: "w-full h-11 px-3 rounded-xl border border-slate-300 text-xs text-slate-900 font-medium outline-none focus:border-blue-600" })),
                        React.createElement("div", { className: "grid grid-cols-2 gap-2" },
                            React.createElement("div", null,
                                React.createElement("label", { className: "text-xs font-semibold text-slate-600 block mb-1" }, "Gender"),
                                React.createElement("select", { value: passengerGender, onChange: (e) => setPassengerGender(e.target.value), className: "w-full h-11 px-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 font-medium outline-none focus:border-blue-600" },
                                    React.createElement("option", { value: "male" }, "Male"),
                                    React.createElement("option", { value: "female" }, "Female"),
                                    React.createElement("option", { value: "other" }, "Other"))),
                            React.createElement("div", null,
                                React.createElement("label", { className: "text-xs font-semibold text-slate-600 block mb-1" }, "Age"),
                                React.createElement("input", { type: "number", min: "5", max: "110", required: true, value: passengerAge, onChange: (e) => setPassengerAge(Number(e.target.value)), className: "w-full h-11 px-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 font-medium outline-none focus:border-blue-600" }))))),
                error && React.createElement("p", { role: "alert", className: "rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-700" }, error),
                paymentEnabled === false
                    ? React.createElement("div", { className: "rounded-2xl border border-amber-200 bg-amber-50 p-4" },
                        React.createElement("h3", { className: "text-sm font-bold text-amber-900 mb-1" }, "Reservation only · payment unavailable"),
                        React.createElement("p", { className: "text-xs text-amber-800" }, "You can reserve these seats without gateway keys. This creates a pending reservation—not a paid booking or boarding ticket." ))
                    : React.createElement("div", null,
                    React.createElement("h3", { className: "text-sm font-bold text-slate-900 mb-1" }, "Payment preference"),
                    React.createElement("p", { className: "text-xs text-slate-500 mb-3" }, paymentEnabled === null
                        ? "Checking secure payment availability…"
                        : "Pay securely using Razorpay. Your ticket is confirmed only after payment verification."),
                    React.createElement("div", { className: "grid grid-cols-3 gap-3" }, [
                        { id: 'UPI', label: 'UPI / QR Pass', icon: QrCode },
                        { id: 'Credit/Debit Card', label: 'Card Payment', icon: CreditCard },
                        { id: 'NetBanking', label: 'NetBanking', icon: Building },
                    ].map((m) => {
                        const Icon = m.icon;
                        const isSelected = paymentMethod === m.id;
                        return (React.createElement("button", { key: m.id, type: "button", onClick: () => setPaymentMethod(m.id), className: `p-3 rounded-xl border text-left flex flex-col gap-2 transition-all cursor-pointer ${isSelected
                                ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-100'
                                : 'border-slate-200 hover:border-slate-300 text-slate-700'}` },
                            React.createElement(Icon, { className: "w-5 h-5 text-blue-600" }),
                            React.createElement("span", { className: "text-xs font-bold" }, m.label)));
                    }))),
                React.createElement("div", { className: "pt-4 border-t border-slate-100 flex items-center justify-between" },
                    React.createElement("div", { className: "flex items-center gap-2 text-xs text-slate-500" },
                        React.createElement(ShieldCheck, { className: "w-4 h-4 text-emerald-600" }),
                        React.createElement("span", null, "Seat reservation stored in the database")),
                    React.createElement("button", { type: "submit", disabled: isProcessing || paymentEnabled === null, className: "px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2" }, isProcessing ? (React.createElement(React.Fragment, null,
                        React.createElement("span", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }),
                        React.createElement("span", null, "Saving reservation..."))) : (React.createElement(React.Fragment, null,
                        React.createElement(CheckCircle, { className: "w-4 h-4" }),
                        React.createElement("span", null,
                            paymentEnabled === null
                                ? "Checking payment…"
                                : paymentEnabled === false
                                ? "Reserve seats · pending"
                                : pendingBooking ? "Retry payment" : "Pay securely",
                            " \u00B7 \u20B9",
                            grandTotal)))))))));
};
__exports.CheckoutModal = CheckoutModal;

});

__define("components/TicketPass", function(__exports, __require){
"use strict";
const { Printer, ArrowLeft, Download, CheckCircle, Shield } = __require("lucide-react");
const TicketPass = ({ booking, onGoToDashboard, onBookAnother, }) => {
    const handlePrint = () => {
        window.print();
    };
    return (React.createElement("div", { className: "bg-slate-100 min-h-screen py-10 px-4 sm:px-6" },
        React.createElement("div", { className: "max-w-3xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 no-print" },
            React.createElement("button", { onClick: onBookAnother, className: "flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 cursor-pointer" },
                React.createElement(ArrowLeft, { className: "w-4 h-4" }),
                React.createElement("span", null, "Book Another Journey")),
            React.createElement("div", { className: "flex items-center gap-2" },
                React.createElement("button", { onClick: onGoToDashboard, className: "px-4 py-2 text-xs font-bold text-blue-700 bg-white hover:bg-blue-50 rounded-xl border border-blue-200 transition-colors cursor-pointer shadow-xs" }, "Go to Passenger Dashboard"),
                React.createElement("button", { onClick: handlePrint, className: "px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors cursor-pointer flex items-center gap-1.5" },
                    React.createElement(Printer, { className: "w-4 h-4" }),
                    React.createElement("span", null, booking.paymentStatus === 'PAID' ? "Print E-Ticket Pass" : "Print Reservation")))),
        React.createElement("div", { className: "max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden" },
            React.createElement("div", { className: "bg-blue-700 text-white p-6 sm:p-8 flex flex-wrap justify-between items-center gap-4" },
                React.createElement("div", null,
                    React.createElement("div", { className: "text-[11px] font-bold uppercase tracking-wider text-blue-200" }, booking.paymentStatus === 'PAID' && booking.status === 'CONFIRMED' ? "Official Electronic Bus Boarding Pass" : "GoBus Seat Reservation · Payment Pending"),
                    React.createElement("h1", { className: "text-xl sm:text-2xl font-black tracking-tight mt-1" }, booking.busName),
                    React.createElement("div", { className: "text-xs text-blue-100 mt-0.5" },
                        "Operator: ",
                        booking.operatorName,
                        " (",
                        booking.operatorType === 'government' ? 'Govt STU' : 'Private Luxury',
                        ")")),
                React.createElement("div", { className: "text-right" },
                    React.createElement("div", { className: "text-[11px] text-blue-200 uppercase font-semibold" }, "Booking PNR"),
                    React.createElement("div", { className: "text-xl sm:text-2xl font-mono font-extrabold tracking-wider text-white" }, booking.pnr),
                    React.createElement("span", { className: `inline-block mt-1 text-[11px] font-bold px-2 py-0.5 rounded ${booking.status === 'CONFIRMED' && booking.paymentStatus === 'PAID' ? 'bg-emerald-500 text-white' : 'bg-amber-400 text-amber-950'}` }, booking.status === 'CONFIRMED' && booking.paymentStatus === 'PAID' ? 'CONFIRMED' : 'PAYMENT PENDING'))),
            React.createElement("div", { className: "p-6 sm:p-8 space-y-6" },
                React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 items-center pb-6 border-b border-dashed border-slate-200" },
                    React.createElement("div", null,
                        React.createElement("div", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider" }, "Origin"),
                        React.createElement("div", { className: "text-2xl font-extrabold text-slate-900 mt-1" }, booking.source),
                        React.createElement("div", { className: "text-sm font-mono font-bold text-blue-700 mt-0.5" }, booking.departureTime),
                        React.createElement("div", { className: "text-xs text-slate-500 mt-1 font-medium" }, booking.boardingPoint)),
                    React.createElement("div", { className: "text-center py-2 sm:py-0" },
                        React.createElement("span", { className: "text-xs font-mono font-bold text-slate-500" }, booking.journeyDate),
                        React.createElement("div", { className: "relative my-1.5 flex items-center justify-center" },
                            React.createElement("div", { className: "w-full max-w-[120px] h-0.5 bg-slate-300" }),
                            React.createElement("div", { className: "absolute w-2 h-2 rounded-full bg-blue-600" })),
                        React.createElement("span", { className: `text-[11px] font-bold flex items-center justify-center gap-1 ${booking.status === 'CONFIRMED' && booking.paymentStatus === 'PAID' ? 'text-emerald-600' : 'text-amber-700'}` },
                            booking.status === 'CONFIRMED' && booking.paymentStatus === 'PAID'
                                ? React.createElement(CheckCircle, { className: "w-3.5 h-3.5" })
                                : null,
                            booking.status === 'CONFIRMED' && booking.paymentStatus === 'PAID' ? " Confirmed" : " Payment required")),
                    React.createElement("div", { className: "sm:text-right" },
                        React.createElement("div", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider" }, "Destination"),
                        React.createElement("div", { className: "text-2xl font-extrabold text-slate-900 mt-1" }, booking.destination),
                        React.createElement("div", { className: "text-sm font-mono font-bold text-blue-700 mt-0.5" }, booking.arrivalTime),
                        React.createElement("div", { className: "text-xs text-slate-500 mt-1 font-medium" }, booking.droppingPoint))),
                React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4 py-2" },
                    React.createElement("div", null,
                        React.createElement("div", { className: "text-[11px] font-bold text-slate-400 uppercase" }, "Passenger"),
                        React.createElement("div", { className: "text-sm font-bold text-slate-900 mt-0.5" }, booking.passengerName),
                        React.createElement("div", { className: "text-xs text-slate-500" },
                            booking.passengerAge,
                            " yrs, ",
                            booking.passengerGender)),
                    React.createElement("div", null,
                        React.createElement("div", { className: "text-[11px] font-bold text-slate-400 uppercase" }, "Allocated Seat(s)"),
                        React.createElement("div", { className: "text-sm font-bold text-blue-700 font-mono mt-0.5" }, booking.selectedSeats.join(', ')),
                        React.createElement("div", { className: "text-xs text-slate-500" },
                            booking.selectedSeats.length,
                            " Reserved")),
                    React.createElement("div", null,
                        React.createElement("div", { className: "text-[11px] font-bold text-slate-400 uppercase" }, booking.paymentStatus === 'PAID' ? "Total Paid" : "Amount Due"),
                        React.createElement("div", { className: "text-sm font-bold text-slate-900 font-mono mt-0.5" },
                            "\u20B9",
                            booking.grandTotal),
                        React.createElement("div", { className: `text-xs font-semibold ${booking.paymentStatus === 'PAID' ? 'text-emerald-600' : 'text-amber-700'}` },
                            booking.paymentMethod,
                            booking.paymentStatus === 'PAID' ? " (PAID)" : " (PENDING)")),
                    React.createElement("div", null,
                        React.createElement("div", { className: "text-[11px] font-bold text-slate-400 uppercase" }, "Reporting Time"),
                        React.createElement("div", { className: "text-sm font-bold text-amber-700 mt-0.5" }, "15 Mins Prior"),
                        React.createElement("div", { className: "text-xs text-slate-500" }, "Platform Check-in"))),
                React.createElement("div", { className: "pt-6 border-t border-dashed border-slate-200 flex flex-wrap items-center gap-6" },
                    booking.status === 'CONFIRMED' && booking.paymentStatus === 'PAID'
                        ? React.createElement("div", { className: "p-3 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center shrink-0" },
                            React.createElement("svg", { width: "90", height: "90", viewBox: "0 0 100 100", className: "text-slate-900" },
                                React.createElement("rect", { width: "100", height: "100", fill: "#ffffff" }),
                                React.createElement("rect", { x: "10", y: "10", width: "24", height: "24", fill: "#0f172a" }),
                                React.createElement("rect", { x: "14", y: "14", width: "16", height: "16", fill: "#ffffff" }),
                                React.createElement("rect", { x: "18", y: "18", width: "8", height: "8", fill: "#0f172a" }),
                                React.createElement("rect", { x: "66", y: "10", width: "24", height: "24", fill: "#0f172a" }),
                                React.createElement("rect", { x: "70", y: "14", width: "16", height: "16", fill: "#ffffff" }),
                                React.createElement("rect", { x: "74", y: "18", width: "8", height: "8", fill: "#0f172a" }),
                                React.createElement("rect", { x: "10", y: "66", width: "24", height: "24", fill: "#0f172a" }),
                                React.createElement("rect", { x: "14", y: "70", width: "16", height: "16", fill: "#ffffff" }),
                                React.createElement("rect", { x: "18", y: "74", width: "8", height: "8", fill: "#0f172a" }),
                                React.createElement("rect", { x: "42", y: "14", width: "8", height: "20", fill: "#0f172a" }),
                                React.createElement("rect", { x: "42", y: "44", width: "18", height: "18", fill: "#0f172a" }),
                                React.createElement("rect", { x: "68", y: "48", width: "14", height: "12", fill: "#0f172a" }),
                                React.createElement("rect", { x: "42", y: "70", width: "18", height: "18", fill: "#0f172a" }),
                                React.createElement("rect", { x: "70", y: "70", width: "16", height: "16", fill: "#0f172a" })),
                            React.createElement("span", { className: "text-[10px] font-mono font-bold text-slate-500 mt-1" }, "SCAN AT GATE"))
                        : React.createElement("div", { className: "p-4 bg-amber-50 border border-amber-200 rounded-2xl text-center text-xs font-bold text-amber-800 max-w-[150px]" }, "PAYMENT REQUIRED", React.createElement("br"), "NOT VALID FOR BOARDING"),
                    React.createElement("div", { className: "text-xs text-slate-600 leading-relaxed flex-1 min-w-[220px]" },
                        React.createElement("div", { className: "font-bold text-slate-900 mb-1 flex items-center gap-1.5" },
                            React.createElement(Shield, { className: "w-4 h-4 text-blue-600" }),
                            "Boarding Guidelines & Identification:"),
                        React.createElement("p", null, "1. Please present this electronic ticket along with any original government ID (Aadhaar, Driving License, Voter ID, or Passport)."),
                        React.createElement("p", null, "2. Baggage allowance: Up to 15 kg per passenger included. For tracking assistance, contact GoBus 24/7 Helpline: 1800-425-2222.")))))));
};
__exports.TicketPass = TicketPass;

});

__define("components/PassengerLogin", function(__exports, __require){
"use strict";
const { useState } = React;
const { Lock, Mail, ArrowLeft, ArrowRight, Bus } = __require("lucide-react");
const PassengerLogin = ({ onLoginSuccess, onGoToRegister, onGoHome, }) => {
    const [email, setEmail] = useState('rahul.sharma@example.com');
    const [password, setPassword] = useState('demo123');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            onLoginSuccess(await window.GoBusApi.login(email, password, 'passenger'));
        }
        catch (requestError) {
            setError(requestError.message);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (React.createElement("div", { className: "bg-slate-100 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8" },
        React.createElement("div", { className: "sm:mx-auto sm:w-full sm:max-w-md" },
            React.createElement("button", { type: "button", onClick: onGoHome, className: "mb-4 flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer" },
                React.createElement(ArrowLeft, { className: "w-4 h-4" }),
                "Back"),
            React.createElement("div", { onClick: onGoHome, className: "flex items-center justify-center gap-2 cursor-pointer mb-6" },
                React.createElement("div", { className: "w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md" },
                    React.createElement(Bus, { className: "w-6 h-6" })),
                React.createElement("span", { className: "text-2xl font-black tracking-tight text-slate-900" },
                    "Go",
                    React.createElement("span", { className: "text-blue-600" }, "Bus"))),
            React.createElement("div", { className: "bg-white py-8 px-6 sm:px-10 border border-slate-200 rounded-3xl shadow-xl" },
                React.createElement("div", { className: "text-center mb-6" },
                    React.createElement("span", { className: "inline-block px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-100" }, "Passenger Portal"),
                    React.createElement("h2", { className: "text-2xl font-black text-slate-900" }, "Passenger Login"),
                    React.createElement("p", { className: "text-xs text-slate-500 mt-1" }, "Sign in to manage your tickets and reservations.")),
                error && React.createElement("p", { role: "alert", className: "mb-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-700" }, error),
                React.createElement("form", { onSubmit: handleSubmit, className: "space-y-4" },
                    React.createElement("div", null,
                        React.createElement("label", { className: "text-xs font-semibold text-slate-700 block mb-1" }, "Email Address"),
                        React.createElement("div", { className: "relative" },
                            React.createElement(Mail, { className: "w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" }),
                            React.createElement("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "name@example.com", className: "w-full h-11 pl-10 pr-3 rounded-xl border border-slate-300 text-xs text-slate-900 font-medium outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" }))),
                    React.createElement("div", null,
                        React.createElement("div", { className: "flex items-center justify-between mb-1" },
                            React.createElement("label", { className: "text-xs font-semibold text-slate-700" }, "Password"),
                            React.createElement("button", { type: "button", onClick: () => alert('Demo simulated: A temporary reset OTP will be sent to your mobile.'), className: "text-xs text-blue-600 hover:underline cursor-pointer" }, "Forgot Password?")),
                        React.createElement("div", { className: "relative" },
                            React.createElement(Lock, { className: "w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" }),
                            React.createElement("input", { type: "password", required: true, value: password, onChange: (e) => setPassword(e.target.value), placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "w-full h-11 pl-10 pr-3 rounded-xl border border-slate-300 text-xs text-slate-900 font-medium outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" }))),
                    React.createElement("div", { className: "flex items-center" },
                        React.createElement("input", { id: "remember-me", name: "remember-me", type: "checkbox", defaultChecked: true, className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded" }),
                        React.createElement("label", { htmlFor: "remember-me", className: "ml-2 block text-xs text-slate-600" }, "Keep me signed in")),
                    React.createElement("button", { type: "submit", disabled: isSubmitting, className: "w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer" },
                        React.createElement("span", null, isSubmitting ? "Signing in..." : "Sign In as Passenger"),
                        React.createElement(ArrowRight, { className: "w-4 h-4" }))),
                React.createElement("div", { className: "mt-5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600" },
                    React.createElement("span", { className: "font-bold text-slate-800" }, "Seeded database account (after importing Database/02_seed.sql):"),
                    React.createElement("div", { className: "font-mono text-[11px] mt-1 text-slate-600" },
                        "Email: ",
                        React.createElement("code", null, "rahul.sharma@example.com"),
                        React.createElement("br", null),
                        "Password: ",
                        React.createElement("code", null, "demo123"))),
                React.createElement("div", { className: "mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-600" },
                    "Don't have a GoBus passenger account?",
                    ' ',
                    React.createElement("button", { onClick: onGoToRegister, className: "font-bold text-blue-600 hover:underline cursor-pointer" }, "Register here"))))));
};
__exports.PassengerLogin = PassengerLogin;

});

__define("components/PassengerRegister", function(__exports, __require){
"use strict";
const { useState } = React;
const { Mail, Lock, User: UserIcon, Phone, Bus, ArrowLeft, ArrowRight } = __require("lucide-react");
const PassengerRegister = ({ onRegisterSuccess, onGoToLogin, onGoHome, }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            onRegisterSuccess(await window.GoBusApi.register(
                name, email, phone, password));
        }
        catch (requestError) {
            setError(requestError.message);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (React.createElement("div", { className: "bg-slate-100 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8" },
        React.createElement("div", { className: "sm:mx-auto sm:w-full sm:max-w-md" },
            React.createElement("button", { type: "button", onClick: onGoHome, className: "mb-4 flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer" },
                React.createElement(ArrowLeft, { className: "w-4 h-4" }),
                "Back to Home"),
            React.createElement("div", { onClick: onGoHome, className: "flex items-center justify-center gap-2 cursor-pointer mb-6" },
                React.createElement("div", { className: "w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md" },
                    React.createElement(Bus, { className: "w-6 h-6" })),
                React.createElement("span", { className: "text-2xl font-black tracking-tight text-slate-900" },
                    "Go",
                    React.createElement("span", { className: "text-blue-600" }, "Bus"))),
            React.createElement("div", { className: "bg-white py-8 px-6 sm:px-10 border border-slate-200 rounded-3xl shadow-xl" },
                React.createElement("div", { className: "text-center mb-6" },
                    React.createElement("span", { className: "inline-block px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-100" }, "Passenger Registration"),
                    React.createElement("h2", { className: "text-2xl font-black text-slate-900" }, "Create Passenger Account"),
                    React.createElement("p", { className: "text-xs text-slate-500 mt-1" }, "Join GoBus to book interstate seats and receive instant SMS/email tickets.")),
                error && React.createElement("p", { role: "alert", className: "mb-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-700" }, error),
                React.createElement("form", { onSubmit: handleSubmit, className: "space-y-4" },
                    React.createElement("div", null,
                        React.createElement("label", { className: "text-xs font-semibold text-slate-700 block mb-1" }, "Full Name"),
                        React.createElement("div", { className: "relative" },
                            React.createElement(UserIcon, { className: "w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" }),
                            React.createElement("input", { type: "text", required: true, value: name, onChange: (e) => setName(e.target.value), placeholder: "e.g. Rahul Sharma", className: "w-full h-11 pl-10 pr-3 rounded-xl border border-slate-300 text-xs text-slate-900 font-medium outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" }))),
                    React.createElement("div", null,
                        React.createElement("label", { className: "text-xs font-semibold text-slate-700 block mb-1" }, "Email Address"),
                        React.createElement("div", { className: "relative" },
                            React.createElement(Mail, { className: "w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" }),
                            React.createElement("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "name@example.com", className: "w-full h-11 pl-10 pr-3 rounded-xl border border-slate-300 text-xs text-slate-900 font-medium outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" }))),
                    React.createElement("div", null,
                        React.createElement("label", { className: "text-xs font-semibold text-slate-700 block mb-1" }, "Mobile Number"),
                        React.createElement("div", { className: "relative" },
                            React.createElement(Phone, { className: "w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" }),
                            React.createElement("input", { type: "tel", required: true, value: phone, onChange: (e) => setPhone(e.target.value), placeholder: "+91 98765 43210", className: "w-full h-11 pl-10 pr-3 rounded-xl border border-slate-300 text-xs text-slate-900 font-medium outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" }))),
                    React.createElement("div", null,
                        React.createElement("label", { className: "text-xs font-semibold text-slate-700 block mb-1" }, "Create Password"),
                        React.createElement("div", { className: "relative" },
                            React.createElement(Lock, { className: "w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" }),
                            React.createElement("input", { type: "password", required: true, minLength: 8, value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Min. 8 characters", className: "w-full h-11 pl-10 pr-3 rounded-xl border border-slate-300 text-xs text-slate-900 font-medium outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" }))),
                    React.createElement("button", { type: "submit", disabled: isSubmitting, className: "w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer mt-2" },
                        React.createElement("span", null, isSubmitting ? "Registering..." : "Complete Registration"),
                        React.createElement(ArrowRight, { className: "w-4 h-4" }))),
                React.createElement("div", { className: "mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-600" },
                    "Already registered?",
                    ' ',
                    React.createElement("button", { onClick: onGoToLogin, className: "font-bold text-blue-600 hover:underline cursor-pointer" }, "Sign in to your account"))))));
};
__exports.PassengerRegister = PassengerRegister;

});

__define("components/PassengerDashboard", function(__exports, __require){
"use strict";
const { useState, useEffect } = React;
const { Ticket, Calendar, MapPin, ArrowRight, XCircle, CheckCircle, Clock } = __require("lucide-react");
const PassengerDashboard = ({ user, onViewTicket, onBookNew, onLogout, }) => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    useEffect(() => {
        let active = true;
        window.GoBusApi.getBookings()
            .then((items) => {
                if (active)
                    setBookings(items);
            })
            .catch((requestError) => {
                if (active)
                    setError(requestError.message);
            });
        return () => {
            active = false;
        };
    }, []);
    const handleCancelBooking = async (booking) => {
        if (window.confirm('Cancel this reservation? This project does not process payment refunds.')) {
            setError('');
            try {
                await window.GoBusApi.cancelBooking(booking.pnr);
                setBookings((current) => current.map((item) => item.pnr === booking.pnr
                    ? { ...item, status: 'CANCELLED' }
                    : item));
            }
            catch (requestError) {
                setError(requestError.message);
            }
        }
    };
    const activeBookings = bookings.filter((b) => b.status === 'CONFIRMED' || b.status === 'PENDING');
    const pastBookings = bookings.filter((b) => b.status !== 'CONFIRMED' && b.status !== 'PENDING');
    return (React.createElement("div", { className: "bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8" },
        React.createElement("div", { className: "max-w-6xl mx-auto space-y-8" },
            React.createElement("div", { className: "bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-wrap items-center justify-between gap-6" },
                React.createElement("div", { className: "flex items-center gap-4" },
                    React.createElement("div", { className: "w-14 h-14 rounded-2xl bg-blue-600 text-white font-extrabold text-xl flex items-center justify-center shadow-md" }, user.name.charAt(0)),
                    React.createElement("div", null,
                        React.createElement("div", { className: "flex items-center gap-2" },
                            React.createElement("h1", { className: "text-2xl font-black text-slate-900" }, user.name),
                            React.createElement("span", { className: "text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200" }, "Verified Passenger")),
                        React.createElement("div", { className: "text-xs text-slate-500 mt-0.5" },
                            user.email,
                            " \u00B7 ",
                            user.phone))),
                React.createElement("div", { className: "flex items-center gap-2 flex-wrap" },
                    React.createElement("button", { onClick: onBookNew, className: "px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm whitespace-nowrap leading-tight shadow-sm hover:shadow-md transition-all cursor-pointer shrink-0" }, "+ Book New Ticket"),
                    React.createElement("button", { onClick: onLogout, className: "px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors cursor-pointer" }, "Sign Out"))),
            error && React.createElement("p", { role: "alert", className: "rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700" }, error),
            React.createElement("div", null,
                React.createElement("h2", { className: "text-lg font-bold text-slate-900 mb-4 flex items-center gap-2" },
                    React.createElement(Clock, { className: "w-5 h-5 text-blue-600" }),
                    React.createElement("span", null, "Active & Upcoming Reservations")),
                activeBookings.length === 0 ? (React.createElement("div", { className: "bg-white border border-slate-200 rounded-2xl p-8 text-center" },
                    React.createElement(Ticket, { className: "w-10 h-10 text-slate-300 mx-auto mb-2" }),
                    React.createElement("p", { className: "text-sm font-semibold text-slate-700" }, "No active bookings right now"),
                    React.createElement("button", { onClick: onBookNew, className: "mt-3 text-xs text-blue-600 font-bold hover:underline cursor-pointer" }, "Find buses and book your next journey \u2192"))) : (React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5" }, activeBookings.map((b) => (React.createElement("div", { key: b.id, className: "bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow" },
                    React.createElement("div", { className: "flex items-start justify-between pb-4 border-b border-slate-100" },
                        React.createElement("div", null,
                            React.createElement("span", { className: `text-[11px] font-bold px-2 py-0.5 rounded ${b.status === 'PENDING' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'}` }, b.status === 'PENDING' ? 'PAYMENT PENDING · NOT CONFIRMED' : "CONFIRMED TRIP"),
                            React.createElement("h3", { className: "text-base font-extrabold text-slate-900 mt-2" },
                                b.source,
                                " \u2192 ",
                                b.destination),
                            React.createElement("div", { className: "text-xs text-slate-500 mt-0.5" },
                                b.busName,
                                " (",
                                b.operatorName,
                                ")")),
                        React.createElement("div", { className: "text-right" },
                            React.createElement("div", { className: "text-xs text-slate-400" }, "PNR"),
                            React.createElement("div", { className: "text-sm font-mono font-extrabold text-blue-700" }, b.pnr))),
                    React.createElement("div", { className: "py-4 grid grid-cols-2 gap-3 text-xs" },
                        React.createElement("div", null,
                            React.createElement("span", { className: "text-slate-400 block" }, "Travel Date & Time"),
                            React.createElement("span", { className: "font-bold text-slate-800 font-mono" },
                                b.journeyDate,
                                " at ",
                                b.departureTime)),
                        React.createElement("div", null,
                            React.createElement("span", { className: "text-slate-400 block" }, "Reserved Seats"),
                            React.createElement("span", { className: "font-bold text-blue-700 font-mono" }, b.selectedSeats.join(', '))),
                        React.createElement("div", { className: "col-span-2" },
                            React.createElement("span", { className: "text-slate-400 block" }, "Boarding Checkpoint"),
                            React.createElement("span", { className: "text-slate-700 font-medium truncate block" }, b.boardingPoint))),
                    React.createElement("div", { className: "pt-4 border-t border-slate-100 flex items-center justify-between" },
                        React.createElement("button", { onClick: () => handleCancelBooking(b), className: "text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer" }, "Cancel Reservation"),
                        React.createElement("button", { onClick: () => onViewTicket(b), className: "px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer" }, "View Boarding Pass")))))))),
            React.createElement("div", { className: "bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs" },
                React.createElement("div", { className: "p-6 border-b border-slate-100 flex items-center justify-between" },
                    React.createElement("h2", { className: "text-base font-bold text-slate-900" }, "Past Bookings & Archived Trips"),
                    React.createElement("span", { className: "text-xs text-slate-500" },
                        pastBookings.length,
                        " records")),
                React.createElement("div", { className: "overflow-x-auto" },
                    React.createElement("table", { className: "w-full text-left text-xs" },
                        React.createElement("thead", { className: "bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200" },
                            React.createElement("tr", null,
                                React.createElement("th", { className: "py-3 px-6" }, "PNR"),
                                React.createElement("th", { className: "py-3 px-6" }, "Route"),
                                React.createElement("th", { className: "py-3 px-6" }, "Date"),
                                React.createElement("th", { className: "py-3 px-6" }, "Bus Operator"),
                                React.createElement("th", { className: "py-3 px-6" }, "Seats"),
                                React.createElement("th", { className: "py-3 px-6" }, "Paid"),
                                React.createElement("th", { className: "py-3 px-6" }, "Status"),
                                React.createElement("th", { className: "py-3 px-6" }, "Action"))),
                        React.createElement("tbody", { className: "divide-y divide-slate-100 text-slate-700" }, pastBookings.map((b) => (React.createElement("tr", { key: b.id, className: "hover:bg-slate-50/50" },
                            React.createElement("td", { className: "py-3.5 px-6 font-mono font-bold text-blue-700" }, b.pnr),
                            React.createElement("td", { className: "py-3.5 px-6 font-semibold" },
                                b.source,
                                " \u2192 ",
                                b.destination),
                            React.createElement("td", { className: "py-3.5 px-6 font-mono" }, b.journeyDate),
                            React.createElement("td", { className: "py-3.5 px-6" }, b.operatorName),
                            React.createElement("td", { className: "py-3.5 px-6 font-mono font-medium" }, b.selectedSeats.join(', ')),
                            React.createElement("td", { className: "py-3.5 px-6 font-mono font-bold" },
                                "\u20B9",
                                b.grandTotal),
                            React.createElement("td", { className: "py-3.5 px-6" },
                                React.createElement("span", { className: `text-[10px] font-bold px-2 py-0.5 rounded ${b.status === 'COMPLETED'
                                        ? 'bg-slate-100 text-slate-700'
                                        : 'bg-rose-50 text-rose-700'}` }, b.status)),
                            React.createElement("td", { className: "py-3.5 px-6" },
                                React.createElement("button", { onClick: () => onViewTicket(b), className: "text-blue-600 hover:underline font-semibold cursor-pointer" }, "View Ticket"))))))))))));
};
__exports.PassengerDashboard = PassengerDashboard;

});

__define("components/OperatorLogin", function(__exports, __require){
"use strict";
const { useState } = React;
const { Bus, Lock, Mail, ArrowRight, ShieldCheck, Building } = __require("lucide-react");
const OperatorLogin = ({ onLoginSuccess, onGoHome, }) => {
    const [email, setEmail] = useState('operations@ksrtc.gov.in');
    const [password, setPassword] = useState('demo123');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            onLoginSuccess(await window.GoBusApi.login(email, password, 'operator'));
        }
        catch (requestError) {
            setError(requestError.message);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const handleSelectQuickOperator = (type) => {
        if (type === 'govt') {
            setEmail('operations@ksrtc.gov.in');
            setPassword('demo123');
        }
        else {
            setEmail('dispatch@royalstartravels.com');
            setPassword('demo123');
        }
    };
    return (React.createElement("div", { className: "bg-slate-900 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-white" },
        React.createElement("div", { className: "sm:mx-auto sm:w-full sm:max-w-md" },
            React.createElement("div", { onClick: onGoHome, className: "flex items-center justify-center gap-2 cursor-pointer mb-6" },
                React.createElement("div", { className: "w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg" },
                    React.createElement(Bus, { className: "w-6 h-6" })),
                React.createElement("span", { className: "text-2xl font-black tracking-tight text-white" },
                    "Go",
                    React.createElement("span", { className: "text-emerald-400" }, "Bus"),
                    React.createElement("span", { className: "text-xs ml-2 font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800" }, "OPERATOR GATEWAY"))),
            React.createElement("div", { className: "bg-slate-950 py-8 px-6 sm:px-10 border border-slate-800 rounded-3xl shadow-2xl" },
                React.createElement("div", { className: "text-center mb-6" },
                    React.createElement("span", { className: "inline-block px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-800" }, "Authorized Carrier Access"),
                    React.createElement("h2", { className: "text-2xl font-black text-white" }, "Fleet Operator Sign In"),
                    React.createElement("p", { className: "text-xs text-slate-400 mt-1" }, "Operators use this unified login. Carrier privileges (Government STU vs Private) are assigned securely by the platform upon authentication.")),
                error && React.createElement("p", { role: "alert", className: "mb-4 rounded-xl border border-rose-800 bg-rose-950 p-3 text-xs text-rose-200" }, error),
                React.createElement("form", { onSubmit: handleSubmit, className: "space-y-4" },
                    React.createElement("div", null,
                        React.createElement("label", { className: "text-xs font-semibold text-slate-300 block mb-1" }, "Corporate Email / License ID"),
                        React.createElement("div", { className: "relative" },
                            React.createElement(Mail, { className: "w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" }),
                            React.createElement("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), className: "w-full h-11 pl-10 pr-3 rounded-xl border border-slate-700 bg-slate-900 text-xs text-white font-medium outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-900" }))),
                    React.createElement("div", null,
                        React.createElement("div", { className: "flex items-center justify-between mb-1" },
                            React.createElement("label", { className: "text-xs font-semibold text-slate-300" }, "Security Password"),
                            React.createElement("button", { type: "button", onClick: () => alert('Please contact the Platform Admin desk to reset operator access keys.'), className: "text-xs text-emerald-400 hover:underline cursor-pointer" }, "Need Help?")),
                        React.createElement("div", { className: "relative" },
                            React.createElement(Lock, { className: "w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" }),
                            React.createElement("input", { type: "password", required: true, value: password, onChange: (e) => setPassword(e.target.value), className: "w-full h-11 pl-10 pr-3 rounded-xl border border-slate-700 bg-slate-900 text-xs text-white font-medium outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-900" }))),
                    React.createElement("button", { type: "submit", disabled: isSubmitting, className: "w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer mt-2" },
                        React.createElement("span", null, isSubmitting ? "Signing in..." : "Authenticate to Operator Dashboard"),
                        React.createElement(ArrowRight, { className: "w-4 h-4" }))),
                React.createElement("div", { className: "mt-6 p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs" },
                    React.createElement("span", { className: "font-bold text-slate-200 block mb-2" }, "Quick Demo Personas:"),
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement("button", { type: "button", onClick: () => handleSelectQuickOperator('govt'), className: "w-full p-2.5 rounded-xl border border-emerald-900/50 bg-emerald-950/40 hover:bg-emerald-950 text-left flex items-center justify-between text-emerald-300 transition-colors cursor-pointer" },
                            React.createElement("div", null,
                                React.createElement("div", { className: "font-bold" }, "1. KSRTC (Government STU)"),
                                React.createElement("div", { className: "text-[11px] text-emerald-400/80" }, "operations@ksrtc.gov.in")),
                            React.createElement("span", { className: "text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-900 text-emerald-200" }, "Select")),
                        React.createElement("button", { type: "button", onClick: () => handleSelectQuickOperator('private'), className: "w-full p-2.5 rounded-xl border border-indigo-900/50 bg-indigo-950/40 hover:bg-indigo-950 text-left flex items-center justify-between text-indigo-300 transition-colors cursor-pointer" },
                            React.createElement("div", null,
                                React.createElement("div", { className: "font-bold" }, "2. Royal Star (Private Fleet)"),
                                React.createElement("div", { className: "text-[11px] text-indigo-400/80" }, "dispatch@royalstartravels.com")),
                            React.createElement("span", { className: "text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-900 text-indigo-200" }, "Select"))))))));
};
__exports.OperatorLogin = OperatorLogin;

});

__define("components/OperatorPortal", function(__exports, __require){
"use strict";
const { useState, useEffect, useMemo } = React;
const { StorageService } = __require("storageService");
const { Bus: BusIcon, Route: RouteIcon, Calendar, Ticket, DollarSign, Plus, Search, CheckCircle, AlertCircle, X, Shield, Award } = __require("lucide-react");
const OperatorPortal = ({ user, onLogout }) => {
    const [currentTab, setCurrentTab] = useState('overview');
    // Data states
    const [buses, setBuses] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [operators, setOperators] = useState([]);
    const [dashboardError, setDashboardError] = useState('');
    // Search filter
    const [searchTerm, setSearchTerm] = useState('');
    // Modals
    const [isAddBusOpen, setIsAddBusOpen] = useState(false);
    const [newBusName, setNewBusName] = useState('');
    const [newBusReg, setNewBusReg] = useState('');
    const [newBusType, setNewBusType] = useState('Volvo Multi-Axle AC');
    useEffect(() => {
        loadData();
    }, []);
    const loadData = async () => {
        try {
            const [operatorBuses, operatorBookings, operatorRoutes, operatorSchedules] = await Promise.all([
                window.GoBusApi.getOperatorBuses(),
                window.GoBusApi.getOperatorBookings(),
                window.GoBusApi.getOperatorRoutes(),
                window.GoBusApi.getOperatorSchedules(),
            ]);
            setBuses(operatorBuses);
            setBookings(operatorBookings);
            setRoutes(operatorRoutes);
            setSchedules(operatorSchedules.map(schedule => ({
                ...schedule,
                daysOfOperation: schedule.daysOfOperation.split(','),
            })));
            setDashboardError('');
        } catch (error) {
            setDashboardError(error.message);
        }
        setOperators(StorageService.getOperators());
    };
    // Find operator profile
    const currentOperator = useMemo(() => {
        return operators.find(op => op.id === user.operatorId) || {
            id: user.operatorId || 'op-ksrtc',
            name: user.operatorType === 'government' ? 'KSRTC (Airavat & Club Class)' : 'Royal Star Luxury Travels',
            type: user.operatorType || 'government',
            categoryBadge: user.operatorType === 'government' ? 'Government State Transport (STU)' : 'Private Luxury Fleet',
            email: user.email,
            phone: user.phone,
            licenseNumber: user.operatorType === 'government' ? 'STU-KA-1997-8821' : 'PVT-EXP-2015-9921',
            fleetCount: 48,
            activeRoutesCount: 16,
            status: 'active',
            rating: 4.8,
            revenue: 1245000,
        };
    }, [operators, user]);
    // Filter buses and bookings strictly for this operator's organisation!
    const myBuses = useMemo(() => {
        return buses.filter(b => b.operatorId === currentOperator.id);
    }, [buses, currentOperator, user.operatorType]);
    const myBookings = useMemo(() => {
        return bookings.filter(bk => bk.operatorId === currentOperator.id);
    }, [bookings, currentOperator]);
    const totalRevenue = useMemo(() => {
        return myBookings.reduce((sum, b) => b.paymentStatus === 'PAID' ? sum + Number(b.grandTotal) : sum, 0);
    }, [myBookings]);
    // Toggle Bus Status
    const handleToggleBus = async (bus) => {
        try {
            await window.GoBusApi.updateOperatorBusStatus(
                bus.id,
                bus.status === 'active' ? 'inactive' : 'active');
            await loadData();
        } catch (error) {
            setDashboardError(error.message);
        }
    };
    // Add Bus Handler
    const handleAddBus = async (e) => {
        e.preventDefault();
        if (!newBusName || !newBusReg)
            return;
        try {
            await window.GoBusApi.registerOperatorBus({
                name: newBusName,
                busType: newBusType,
                registrationNumber: newBusReg,
                totalSeats: newBusType.includes('Sleeper') ? 36 : newBusType.includes('BharatBenz') ? 40 : 44,
            });
            await loadData();
            setIsAddBusOpen(false);
            setNewBusName('');
            setNewBusReg('');
        } catch (error) {
            setDashboardError(error.message);
        }
    };
    return (React.createElement("div", { className: "flex flex-col min-h-screen bg-slate-100" },
        React.createElement("header", { className: "bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30" },
            React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4" },
                React.createElement("div", { className: "flex items-center gap-3" },
                    React.createElement("div", { className: `w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white shadow-sm ${currentOperator.type === 'government' ? 'bg-emerald-600' : 'bg-indigo-600'}` },
                        React.createElement(BusIcon, { className: "w-5 h-5" })),
                    React.createElement("div", null,
                        React.createElement("div", { className: "flex items-center gap-2" },
                            React.createElement("span", { className: "font-extrabold text-base tracking-tight text-white" }, currentOperator.name),
                            React.createElement("span", { className: `text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${currentOperator.type === 'government'
                                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                    : 'bg-indigo-950 text-indigo-300 border border-indigo-800'}` }, currentOperator.categoryBadge)),
                        React.createElement("div", { className: "text-[11px] text-slate-400 font-mono" },
                            "Permit License: ",
                            currentOperator.licenseNumber))),
                React.createElement("div", { className: "flex items-center gap-3" },
                    React.createElement("span", { className: "text-xs text-slate-400 hidden sm:inline" },
                        "Signed in: ",
                        user.email),
                    React.createElement("button", { onClick: onLogout, className: "px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer transition-colors" }, "Sign Out")))),
        React.createElement("div", { className: "flex-1 flex flex-col md:flex-row" },
            React.createElement("aside", { className: "w-full md:w-64 bg-slate-950 text-slate-400 border-r border-slate-800 flex flex-col shrink-0" },
                React.createElement("div", { className: "p-4 border-b border-slate-800" },
                    React.createElement("div", { className: "text-xs font-bold uppercase tracking-wider text-slate-500 mb-1" }, "Operator Console"),
                    React.createElement("div", { className: "text-sm font-bold text-white truncate" }, user.name),
                    React.createElement("div", { className: "text-[11px] text-slate-400" }, "Fleet, bookings, routes & schedules: live database")),
                React.createElement("nav", { className: "p-3 space-y-1 flex-1" },
                    React.createElement("button", { onClick: () => setCurrentTab('overview'), className: `w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${currentTab === 'overview'
                            ? 'bg-emerald-600 text-white'
                            : 'hover:bg-slate-900 text-slate-300'}` },
                        React.createElement(Award, { className: "w-4 h-4" }),
                        React.createElement("span", null, "Fleet Overview")),
                    React.createElement("button", { onClick: () => setCurrentTab('buses'), className: `w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${currentTab === 'buses'
                            ? 'bg-emerald-600 text-white'
                            : 'hover:bg-slate-900 text-slate-300'}` },
                        React.createElement(BusIcon, { className: "w-4 h-4" }),
                        React.createElement("span", null,
                            "Buses & Fleet (",
                            myBuses.length,
                            ")")),
                    React.createElement("button", { onClick: () => setCurrentTab('routes'), className: `w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${currentTab === 'routes'
                            ? 'bg-emerald-600 text-white'
                            : 'hover:bg-slate-900 text-slate-300'}` },
                        React.createElement(RouteIcon, { className: "w-4 h-4" }),
                        React.createElement("span", null,
                            "Transit Routes (",
                            routes.length,
                            ")")),
                    React.createElement("button", { onClick: () => setCurrentTab('schedules'), className: `w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${currentTab === 'schedules'
                            ? 'bg-emerald-600 text-white'
                            : 'hover:bg-slate-900 text-slate-300'}` },
                        React.createElement(Calendar, { className: "w-4 h-4" }),
                        React.createElement("span", null,
                            "Trip Schedules (",
                            schedules.length,
                            ")")),
                    React.createElement("button", { onClick: () => setCurrentTab('bookings'), className: `w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${currentTab === 'bookings'
                            ? 'bg-emerald-600 text-white'
                            : 'hover:bg-slate-900 text-slate-300'}` },
                        React.createElement(Ticket, { className: "w-4 h-4" }),
                        React.createElement("span", null,
                            "Passenger Manifests (",
                            myBookings.length,
                            ")"))),
                React.createElement("div", { className: "p-4 border-t border-slate-800 text-[11px] text-slate-500" },
                    "Node status: Verified STU/Fleet",
                    React.createElement("br", null),
                    "Data isolation: Organization Only")),
            React.createElement("main", { className: "flex-1 p-6 sm:p-8 overflow-y-auto" },
                dashboardError && React.createElement("p", { role: "alert", className: "mb-5 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700" }, dashboardError),
                currentTab === 'overview' && (React.createElement("div", { className: "space-y-6" },
                    React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-4" },
                        React.createElement("div", null,
                            React.createElement("h1", { className: "text-2xl font-black text-slate-900" }, "Fleet Operations Dashboard"),
                            React.createElement("p", { className: "text-xs text-slate-500 mt-0.5" }, "Live schedule dispatch status and passenger booking telemetry.")),
                        React.createElement("div", { className: "flex items-center gap-2" },
                            React.createElement("button", { onClick: () => {
                                    setCurrentTab('buses');
                                    setIsAddBusOpen(true);
                                }, className: "px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer flex items-center gap-1.5" },
                                React.createElement(Plus, { className: "w-4 h-4" }),
                                React.createElement("span", null, "Register New Bus")))),
                    React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" },
                        React.createElement("div", { className: "bg-white border border-slate-200 rounded-2xl p-5 shadow-xs" },
                            React.createElement("div", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider mb-2" }, "Total Fleet"),
                            React.createElement("div", { className: "text-2xl font-black text-slate-900 font-mono tabular-nums" },
                                myBuses.length,
                                " Coaches"),
                            React.createElement("div", { className: "text-[11px] text-emerald-600 font-semibold mt-1" }, "Registered database buses")),
                        React.createElement("div", { className: "bg-white border border-slate-200 rounded-2xl p-5 shadow-xs" },
                            React.createElement("div", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider mb-2" }, "Trip Schedules"),
                            React.createElement("div", { className: "text-2xl font-black text-slate-900 font-mono tabular-nums" },
                                schedules.length,
                                    " Schedules"),
                            React.createElement("div", { className: "text-[11px] text-blue-600 font-semibold mt-1" }, "Live database schedules")),
                        React.createElement("div", { className: "bg-white border border-slate-200 rounded-2xl p-5 shadow-xs" },
                            React.createElement("div", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider mb-2" }, "Passenger Bookings"),
                            React.createElement("div", { className: "text-2xl font-black text-slate-900 font-mono tabular-nums" },
                                myBookings.length,
                                " Bookings"),
                            React.createElement("div", { className: "text-[11px] text-emerald-600 font-semibold mt-1" }, "Live database manifests")),
                        React.createElement("div", { className: "bg-white border border-slate-200 rounded-2xl p-5 shadow-xs" },
                            React.createElement("div", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider mb-2" }, "Paid Revenue"),
                            React.createElement("div", { className: "text-2xl font-black text-slate-900 font-mono tabular-nums" },
                                "\u20B9",
                                totalRevenue.toLocaleString()),
                            React.createElement("div", { className: "text-[11px] text-emerald-600 font-semibold mt-1" }, "Paid records; no processor connected"))),
                    React.createElement("div", { className: "bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs" },
                        React.createElement("div", { className: "p-5 border-b border-slate-100 flex items-center justify-between" },
                            React.createElement("h3", { className: "font-bold text-slate-900 text-sm" }, "Recent Bookings on Your Buses"),
                            React.createElement("button", { onClick: () => setCurrentTab('bookings'), className: "text-xs font-bold text-emerald-600 hover:underline cursor-pointer" }, "View All Manifests \u2192")),
                        React.createElement("div", { className: "overflow-x-auto" },
                            React.createElement("table", { className: "w-full text-left text-xs" },
                                React.createElement("thead", { className: "bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200" },
                                    React.createElement("tr", null,
                                        React.createElement("th", { className: "py-3 px-5" }, "PNR"),
                                        React.createElement("th", { className: "py-3 px-5" }, "Passenger"),
                                        React.createElement("th", { className: "py-3 px-5" }, "Route"),
                                        React.createElement("th", { className: "py-3 px-5" }, "Seat(s)"),
                                        React.createElement("th", { className: "py-3 px-5" }, "Paid"),
                                        React.createElement("th", { className: "py-3 px-5" }, "Status"))),
                                React.createElement("tbody", { className: "divide-y divide-slate-100 text-slate-700" }, myBookings.map((b) => (React.createElement("tr", { key: b.id, className: "hover:bg-slate-50" },
                                    React.createElement("td", { className: "py-3 px-5 font-mono font-bold text-blue-700" }, b.pnr),
                                    React.createElement("td", { className: "py-3 px-5 font-medium" }, b.passengerName),
                                    React.createElement("td", { className: "py-3 px-5" },
                                        b.source,
                                        " \u2192 ",
                                        b.destination),
                                    React.createElement("td", { className: "py-3 px-5 font-mono font-bold" }, b.selectedSeats.join(', ')),
                                    React.createElement("td", { className: "py-3 px-5 font-mono font-bold" },
                                        "\u20B9",
                                        b.grandTotal),
                                    React.createElement("td", { className: "py-3 px-5" },
                                        React.createElement("span", { className: "text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700" }, b.status))))))))))),
                currentTab === 'buses' && (React.createElement("div", { className: "space-y-6" },
                    React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-4" },
                        React.createElement("div", null,
                            React.createElement("h1", { className: "text-2xl font-black text-slate-900" }, "Fleet & Coaches"),
                            React.createElement("p", { className: "text-xs text-slate-500 mt-0.5" }, "Manage registered vehicles, maintenance schedules, and active status.")),
                        React.createElement("button", { onClick: () => setIsAddBusOpen(true), className: "px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer flex items-center gap-1.5" },
                            React.createElement(Plus, { className: "w-4 h-4" }),
                            React.createElement("span", null, "Register Bus"))),
                    React.createElement("div", { className: "bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs" },
                        React.createElement("div", { className: "p-4 border-b border-slate-100 flex items-center gap-3" },
                            React.createElement(Search, { className: "w-4 h-4 text-slate-400" }),
                            React.createElement("input", { type: "text", placeholder: "Search by bus name or license plate...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full text-xs outline-none bg-transparent" })),
                        React.createElement("div", { className: "overflow-x-auto" },
                            React.createElement("table", { className: "w-full text-left text-xs" },
                                React.createElement("thead", { className: "bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200" },
                                    React.createElement("tr", null,
                                        React.createElement("th", { className: "py-3.5 px-5" }, "Coach Model"),
                                        React.createElement("th", { className: "py-3.5 px-5" }, "Registration"),
                                        React.createElement("th", { className: "py-3.5 px-5" }, "Bus Class"),
                                        React.createElement("th", { className: "py-3.5 px-5" }, "Capacity"),
                                        React.createElement("th", { className: "py-3.5 px-5" }, "Rating"),
                                        React.createElement("th", { className: "py-3.5 px-5" }, "Status"),
                                        React.createElement("th", { className: "py-3.5 px-5" }, "Action"))),
                                React.createElement("tbody", { className: "divide-y divide-slate-100 text-slate-700" }, myBuses
                                    .filter(b => b.name.toLowerCase().includes(searchTerm.toLowerCase()) || b.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .map((b) => (React.createElement("tr", { key: b.id, className: "hover:bg-slate-50" },
                                    React.createElement("td", { className: "py-3.5 px-5 font-bold text-slate-900" }, b.name),
                                    React.createElement("td", { className: "py-3.5 px-5 font-mono font-bold text-slate-700" }, b.registrationNumber),
                                    React.createElement("td", { className: "py-3.5 px-5" }, b.busType),
                                    React.createElement("td", { className: "py-3.5 px-5 font-mono" },
                                        b.totalSeats,
                                        " seats"),
                                    React.createElement("td", { className: "py-3.5 px-5 font-semibold text-amber-600" },
                                        "\u2605 ",
                                        b.rating),
                                    React.createElement("td", { className: "py-3.5 px-5" },
                                        React.createElement("span", { className: `text-[10px] font-bold px-2 py-0.5 rounded ${b.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}` }, b.status.toUpperCase())),
                                    React.createElement("td", { className: "py-3.5 px-5" },
                                        React.createElement("button", { onClick: () => handleToggleBus(b), className: "text-xs font-semibold text-blue-600 hover:underline cursor-pointer" }, b.status === 'active' ? 'Deactivate' : 'Activate'))))))))))),
                currentTab === 'routes' && (React.createElement("div", { className: "space-y-6" },
                    React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-4" },
                        React.createElement("div", null,
                            React.createElement("h1", { className: "text-2xl font-black text-slate-900" }, "Transit Corridors & Routes"),
                            React.createElement("p", { className: "text-xs text-slate-500 mt-0.5" }, "Origins, destinations, and intermediate passenger boarding points."))),
                    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, routes.map((r) => (React.createElement("div", { key: r.id, className: "bg-white border border-slate-200 rounded-2xl p-5 shadow-xs" },
                        React.createElement("div", { className: "flex items-center justify-between pb-3 border-b border-slate-100" },
                            React.createElement("div", { className: "text-base font-extrabold text-slate-900" },
                                r.source,
                                " \u2192 ",
                                r.destination),
                            React.createElement("span", { className: "font-mono text-xs font-bold text-blue-600" },
                                r.distanceKm,
                                " KM (",
                                r.durationHours,
                                ")")),
                        React.createElement("div", { className: "mt-4 space-y-3 text-xs" },
                            React.createElement("div", null,
                                React.createElement("span", { className: "font-bold text-slate-700 block mb-1" }, "Boarding Checkpoints:"),
                                React.createElement("ul", { className: "list-disc pl-4 space-y-0.5 text-slate-600" }, r.boardingPoints.map((bp) => (React.createElement("li", { key: bp.id },
                                    bp.time,
                                    " \u2014 ",
                                    bp.location,
                                    " (",
                                    bp.landmark,
                                    ")"))))),
                            React.createElement("div", null,
                                React.createElement("span", { className: "font-bold text-slate-700 block mb-1" }, "Dropping Points:"),
                                React.createElement("ul", { className: "list-disc pl-4 space-y-0.5 text-slate-600" }, r.droppingPoints.map((dp) => (React.createElement("li", { key: dp.id },
                                    dp.time,
                                    " \u2014 ",
                                    dp.location)))))))))))),
                currentTab === 'schedules' && (React.createElement("div", { className: "space-y-6" },
                    React.createElement("div", null,
                        React.createElement("h1", { className: "text-2xl font-black text-slate-900" }, "Trip Schedules & Fares"),
                        React.createElement("p", { className: "text-xs text-slate-500 mt-0.5" }, "Departure timestamps, assigned buses, and seat pricing.")),
                    React.createElement("div", { className: "bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs" },
                        React.createElement("table", { className: "w-full text-left text-xs" },
                            React.createElement("thead", { className: "bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200" },
                                React.createElement("tr", null,
                                    React.createElement("th", { className: "py-3 px-5" }, "Schedule ID"),
                                    React.createElement("th", { className: "py-3 px-5" }, "Assigned Bus"),
                                    React.createElement("th", { className: "py-3 px-5" }, "Route"),
                                    React.createElement("th", { className: "py-3 px-5" }, "Timings"),
                                    React.createElement("th", { className: "py-3 px-5" }, "Base Fare"),
                                    React.createElement("th", { className: "py-3 px-5" }, "Days"),
                                    React.createElement("th", { className: "py-3 px-5" }, "Status"))),
                            React.createElement("tbody", { className: "divide-y divide-slate-100 text-slate-700" }, schedules.map((s) => {
                                const bus = buses.find((b) => b.id === s.busId);
                                const route = routes.find((r) => r.id === s.routeId);
                                return (React.createElement("tr", { key: s.id, className: "hover:bg-slate-50" },
                                    React.createElement("td", { className: "py-3.5 px-5 font-mono font-bold text-blue-700" }, s.id),
                                    React.createElement("td", { className: "py-3.5 px-5 font-medium" }, bus?.name || 'Assigned Coach'),
                                    React.createElement("td", { className: "py-3.5 px-5" },
                                        route?.source,
                                        " \u2192 ",
                                        route?.destination),
                                    React.createElement("td", { className: "py-3.5 px-5 font-mono font-bold" },
                                        s.departureTime,
                                        " \u2192 ",
                                        s.arrivalTime),
                                    React.createElement("td", { className: "py-3.5 px-5 font-mono font-bold text-slate-900" },
                                        "\u20B9",
                                        s.baseFare),
                                    React.createElement("td", { className: "py-3.5 px-5 text-slate-500" }, s.daysOfOperation.join(', ')),
                                    React.createElement("td", { className: "py-3.5 px-5" },
                                        React.createElement("span", { className: "text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700" }, "ACTIVE"))));
                            })))))),
                currentTab === 'bookings' && (React.createElement("div", { className: "space-y-6" },
                    React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-4" },
                        React.createElement("div", null,
                            React.createElement("h1", { className: "text-2xl font-black text-slate-900" }, "Passenger Trip Manifests"),
                            React.createElement("p", { className: "text-xs text-slate-500 mt-0.5" }, "List of verified passengers and allocated seat assignments for gate boarding.")),
                        React.createElement("button", { onClick: () => window.print(), className: "px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-xs transition-colors cursor-pointer" }, "Export Manifest PDF")),
                    React.createElement("div", { className: "bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs" },
                        React.createElement("table", { className: "w-full text-left text-xs" },
                            React.createElement("thead", { className: "bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200" },
                                React.createElement("tr", null,
                                    React.createElement("th", { className: "py-3.5 px-5" }, "PNR"),
                                    React.createElement("th", { className: "py-3.5 px-5" }, "Passenger Name"),
                                    React.createElement("th", { className: "py-3.5 px-5" }, "Contact"),
                                    React.createElement("th", { className: "py-3.5 px-5" }, "Route"),
                                    React.createElement("th", { className: "py-3.5 px-5" }, "Seat Numbers"),
                                    React.createElement("th", { className: "py-3.5 px-5" }, "Boarding Point"),
                                    React.createElement("th", { className: "py-3.5 px-5" }, "Status"))),
                            React.createElement("tbody", { className: "divide-y divide-slate-100 text-slate-700" }, myBookings.map((b) => (React.createElement("tr", { key: b.id, className: "hover:bg-slate-50" },
                                React.createElement("td", { className: "py-3.5 px-5 font-mono font-bold text-blue-700" }, b.pnr),
                                React.createElement("td", { className: "py-3.5 px-5 font-bold text-slate-900" },
                                    b.passengerName,
                                    " (",
                                    b.passengerAge,
                                    ", ",
                                    b.passengerGender,
                                    ")"),
                                React.createElement("td", { className: "py-3.5 px-5 font-mono" }, b.passengerPhone),
                                React.createElement("td", { className: "py-3.5 px-5" },
                                    b.source,
                                    " \u2192 ",
                                    b.destination),
                                React.createElement("td", { className: "py-3.5 px-5 font-mono font-bold text-blue-700" }, b.selectedSeats.join(', ')),
                                React.createElement("td", { className: "py-3.5 px-5 text-slate-600 truncate max-w-[200px]" }, b.boardingPoint),
                                React.createElement("td", { className: "py-3.5 px-5" },
                                    React.createElement("span", { className: "text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700" }, b.status)))))))))))),
        isAddBusOpen && (React.createElement("div", { className: "fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4" },
            React.createElement("div", { className: "bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden p-6" },
                React.createElement("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100 mb-4" },
                    React.createElement("h3", { className: "font-extrabold text-slate-900 text-base" }, "Register New Fleet Coach"),
                    React.createElement("button", { onClick: () => setIsAddBusOpen(false), className: "text-slate-400 hover:text-slate-600 cursor-pointer" },
                        React.createElement(X, { className: "w-5 h-5" }))),
                React.createElement("form", { onSubmit: handleAddBus, className: "space-y-4 text-xs" },
                    React.createElement("div", null,
                        React.createElement("label", { className: "font-semibold text-slate-700 block mb-1" }, "Coach Model Name"),
                        React.createElement("input", { type: "text", required: true, placeholder: "e.g. Scania Metrolink Multi-Axle", value: newBusName, onChange: (e) => setNewBusName(e.target.value), className: "w-full h-10 px-3 rounded-xl border border-slate-300 font-medium outline-none focus:border-emerald-600" })),
                    React.createElement("div", null,
                        React.createElement("label", { className: "font-semibold text-slate-700 block mb-1" }, "Registration / Plate Number"),
                        React.createElement("input", { type: "text", required: true, placeholder: "e.g. KA-01-F-9988", value: newBusReg, onChange: (e) => setNewBusReg(e.target.value), className: "w-full h-10 px-3 rounded-xl border border-slate-300 font-mono font-bold outline-none focus:border-emerald-600" })),
                    React.createElement("div", null,
                        React.createElement("label", { className: "font-semibold text-slate-700 block mb-1" }, "Coach Seating Class"),
                        React.createElement("select", { value: newBusType, onChange: (e) => setNewBusType(e.target.value), className: "w-full h-10 px-3 rounded-xl border border-slate-300 font-medium outline-none focus:border-emerald-600" },
                            React.createElement("option", { value: "Volvo Multi-Axle AC" }, "Volvo Multi-Axle AC (44 Seater)"),
                            React.createElement("option", { value: "AC Sleeper (2+1)" }, "AC Sleeper 2+1 (36 Berths)"),
                            React.createElement("option", { value: "BharatBenz Executive (2+2)" }, "BharatBenz Executive (40 Seater)"))),
                    React.createElement("div", { className: "pt-3 border-t border-slate-100 flex items-center justify-end gap-2" },
                        React.createElement("button", { type: "button", onClick: () => setIsAddBusOpen(false), className: "px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold cursor-pointer" }, "Cancel"),
                        React.createElement("button", { type: "submit", className: "px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer shadow-sm" }, "Save & Register"))))))));
};
__exports.OperatorPortal = OperatorPortal;

});

__define("components/AdminLogin", function(__exports, __require){
"use strict";
const { useState } = React;
const { ShieldAlert, Lock, Mail, ArrowLeft, ShieldCheck } = __require("lucide-react");
const AdminLogin = ({ onLoginSuccess, onGoHome }) => {
    const [email, setEmail] = useState('admin@gobus.gov.in');
    const [password, setPassword] = useState('demo123');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            onLoginSuccess(await window.GoBusApi.login(email, password, 'admin'));
        }
        catch (requestError) {
            setError(requestError.message);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (React.createElement("div", { className: "bg-slate-50 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-slate-900" },
        React.createElement("div", { className: "sm:mx-auto sm:w-full sm:max-w-md" },
            React.createElement("div", { onClick: onGoHome, className: "flex items-center justify-center gap-2 cursor-pointer mb-6" },
                React.createElement("div", { className: "w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg" },
                    React.createElement(ShieldAlert, { className: "w-6 h-6" })),
                React.createElement("span", { className: "text-2xl font-black tracking-tight text-slate-900" },
                    "Go",
                    React.createElement("span", { className: "text-blue-600" }, "Bus"),
                    React.createElement("span", { className: "text-xs ml-2 font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200" }, "PLATFORM ROOT"))),
            React.createElement("div", { className: "bg-white py-8 px-6 sm:px-10 border border-slate-200 rounded-3xl shadow-xl" },
                    React.createElement("button", { type: "button", onClick: onGoHome, className: "flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800 transition-colors cursor-pointer mb-5" },
                        React.createElement(ArrowLeft, { className: "w-4 h-4" }),
                        React.createElement("span", null, "Back to Home")),
                    React.createElement("div", { className: "text-center mb-6" },
                    React.createElement("span", { className: "inline-block px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-200" }, "Restricted Console"),
                    React.createElement("h2", { className: "text-2xl font-black text-slate-900" }, "Platform Administration"),
                    React.createElement("p", { className: "text-xs text-slate-600 mt-1" }, "Secure isolation portal for operator verification, platform audit, and master database governance.")),
                error && React.createElement("p", { role: "alert", className: "mb-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700" }, error),
                React.createElement("form", { onSubmit: handleSubmit, className: "space-y-4" },
                    React.createElement("div", null,
                        React.createElement("label", { className: "text-xs font-semibold text-slate-700 block mb-1" }, "Admin Master Identifier"),
                        React.createElement("div", { className: "relative" },
                            React.createElement(Mail, { className: "w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" }),
                            React.createElement("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), className: "w-full h-11 pl-10 pr-3 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" }))),
                    React.createElement("div", null,
                        React.createElement("label", { className: "text-xs font-semibold text-slate-700 block mb-1" }, "Security Passphrase"),
                        React.createElement("div", { className: "relative" },
                            React.createElement(Lock, { className: "w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" }),
                            React.createElement("input", { type: "password", required: true, value: password, onChange: (e) => setPassword(e.target.value), className: "w-full h-11 pl-10 pr-3 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" }))),
                    React.createElement("button", { type: "submit", disabled: isSubmitting, className: "w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer mt-2" },
                        React.createElement(ShieldCheck, { className: "w-4 h-4" }),
                        React.createElement("span", null, isSubmitting ? "Signing in..." : "Unlock Admin Dashboard"))),
                React.createElement("div", { className: "mt-6 p-4 rounded-2xl bg-blue-50 border border-blue-100 text-xs" },
                    React.createElement("span", { className: "font-bold text-slate-700 block mb-1" }, "Root Demo Secret:"),
                    React.createElement("div", { className: "font-mono text-[11px] text-slate-600" },
                        "Identifier: ",
                        React.createElement("code", null, "admin@gobus.gov.in"),
                        React.createElement("br", null),
                        "Passphrase: ",
                        React.createElement("code", null, "demo123")))))));
};
__exports.AdminLogin = AdminLogin;

});

__define("components/AdminPortal", function(__exports, __require){
"use strict";
const { useState, useEffect, useMemo } = React;
const { StorageService } = __require("storageService");
const { ShieldAlert, Building, Bus: BusIcon, CheckCircle, XCircle, TrendingUp, Search, Filter, DollarSign, Users, AlertTriangle } = __require("lucide-react");
const AdminPortal = ({ user, onLogout }) => {
    const [currentTab, setCurrentTab] = useState('overview');
    const [operators, setOperators] = useState([]);
    const [buses, setBuses] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [dashboardError, setDashboardError] = useState('');
    const [report, setReport] = useState(null);
    useEffect(() => {
        loadData();
    }, []);
    const loadData = async () => {
        try {
            const [adminBuses, adminBookings, adminReport, adminOperators] = await Promise.all([
                window.GoBusApi.getAdminBuses(),
                window.GoBusApi.getAdminBookings(),
                window.GoBusApi.getAdminReports(),
                window.GoBusApi.getAdminOperators(),
            ]);
            const operatorNames = new Map(
                adminOperators.map(operator => [operator.id, operator.name]));
            setBuses(adminBuses.map(bus => ({
                ...bus,
                operatorName: operatorNames.get(bus.operatorId) || bus.operatorId,
            })));
            setBookings(adminBookings);
            setReport(adminReport);
            setOperators(adminOperators);
            setDashboardError('');
        } catch (error) {
            setDashboardError(error.message);
        }
        setRoutes(StorageService.getRoutes());
    };
    const handleUpdateStatus = async (operator, status) => {
        try {
            await window.GoBusApi.updateOperatorStatus(operator.id, status);
            await loadData();
        } catch (error) {
            setDashboardError(error.message);
        }
    };
    // Platform Analytics Calculations
    const totalFleetCount = useMemo(() => {
        return buses.length;
    }, [buses]);
    const totalGMV = useMemo(() => {
        return Number(report?.paidRevenue || 0);
    }, [report]);
    const databaseOperatorCount = operators.length;
    return (React.createElement("div", { className: "flex flex-col min-h-screen bg-slate-50 text-slate-800" },
        React.createElement("header", { className: "bg-white border-b border-slate-200 sticky top-0 z-30" },
            React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4" },
                React.createElement("div", { className: "flex items-center gap-3" },
                    React.createElement("div", { className: "w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md" },
                        React.createElement(ShieldAlert, { className: "w-5 h-5" })),
                    React.createElement("div", null,
                        React.createElement("div", { className: "flex items-center gap-2" },
                            React.createElement("span", { className: "font-extrabold text-base tracking-tight text-slate-900" }, "GoBus Central Governance"),
                            React.createElement("span", { className: "text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200" }, "Platform Root")),
                        React.createElement("div", { className: "text-[11px] text-slate-600" }, "Master Transit Audit & Operations Monitor"))),
                React.createElement("div", { className: "flex items-center gap-3" },
                    React.createElement("span", { className: "text-xs text-slate-600 font-mono hidden sm:inline" }, user.email),
                    React.createElement("button", { onClick: onLogout, className: "px-3.5 py-1.5 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold cursor-pointer transition-colors" }, "Sign Out")))),
        React.createElement("div", { className: "flex-1 flex flex-col md:flex-row" },
            React.createElement("aside", { className: "w-full md:w-64 bg-white border-r border-slate-200 flex flex-col shrink-0" },
                React.createElement("div", { className: "p-4 border-b border-slate-200" },
                    React.createElement("div", { className: "text-xs font-bold uppercase tracking-wider text-blue-700 mb-1" }, "Audit Navigation"),
                    React.createElement("div", { className: "text-sm font-bold text-slate-900" }, "Platform Oversight")),
                React.createElement("nav", { className: "p-3 space-y-1 flex-1" },
                    React.createElement("button", { onClick: () => setCurrentTab('overview'), className: `w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${currentTab === 'overview'
                            ? 'bg-blue-600 text-white'
                            : 'hover:bg-slate-50 text-slate-700'}` },
                        React.createElement(TrendingUp, { className: "w-4 h-4" }),
                        React.createElement("span", null, "System Analytics")),
                    React.createElement("button", { onClick: () => setCurrentTab('operators'), className: `w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${currentTab === 'operators'
                            ? 'bg-blue-600 text-white'
                            : 'hover:bg-slate-50 text-slate-700'}` },
                        React.createElement(Building, { className: "w-4 h-4" }),
                        React.createElement("span", null,
                            "Operator Licensing (",
                            operators.length,
                            ")")),
                    React.createElement("button", { onClick: () => setCurrentTab('all-buses'), className: `w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${currentTab === 'all-buses'
                            ? 'bg-blue-600 text-white'
                            : 'hover:bg-slate-50 text-slate-700'}` },
                        React.createElement(BusIcon, { className: "w-4 h-4" }),
                        React.createElement("span", null,
                            "All Platform Buses (",
                            buses.length,
                            ")")),
                    React.createElement("button", { onClick: () => setCurrentTab('all-bookings'), className: `w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${currentTab === 'all-bookings'
                            ? 'bg-blue-600 text-white'
                            : 'hover:bg-slate-50 text-slate-700'}` },
                        React.createElement(Users, { className: "w-4 h-4" }),
                        React.createElement("span", null,
                            "All Passenger Bookings (",
                            bookings.length,
                            ")"))),
                React.createElement("div", { className: "p-4 border-t border-slate-200 text-[11px] text-slate-600" },
                    "Fleet, bookings & revenue: Live database",
                    React.createElement("br", null),
                    "Security policy: Level 3 Enforced")),
            React.createElement("main", { className: "flex-1 p-6 sm:p-8 overflow-y-auto bg-slate-50" },
                dashboardError && React.createElement("p", { role: "alert", className: "mb-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800" }, dashboardError),
                currentTab === 'overview' && (React.createElement("div", { className: "space-y-6" },
                    React.createElement("div", null,
                        React.createElement("h1", { className: "text-2xl font-black text-slate-900" }, "Platform Governance & Audit"),
                        React.createElement("p", { className: "text-xs text-slate-600 mt-0.5" }, "Fleet, booking, paid-revenue, and operator category reports are live database data.")),
                    React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" },
                        React.createElement("div", { className: "bg-white border border-slate-200 rounded-2xl p-5 shadow-xs" },
                            React.createElement("div", { className: "text-xs font-bold text-slate-600 uppercase tracking-wider mb-1" }, "Total Operators"),
                            React.createElement("div", { className: "text-2xl font-black text-slate-900 font-mono tabular-nums" },
                                databaseOperatorCount,
                                " Organizations"),
                            React.createElement("div", { className: "text-[11px] text-emerald-700 font-semibold mt-1" }, "Operator accounts in database")),
                        React.createElement("div", { className: "bg-white border border-slate-200 rounded-2xl p-5 shadow-xs" },
                            React.createElement("div", { className: "text-xs font-bold text-slate-600 uppercase tracking-wider mb-1" }, "Platform Fleet Size"),
                            React.createElement("div", { className: "text-2xl font-black text-slate-900 font-mono tabular-nums" },
                                totalFleetCount,
                                " Coaches"),
                            React.createElement("div", { className: "text-[11px] text-blue-400 font-semibold mt-1" }, "Database fleet inventory")),
                        React.createElement("div", { className: "bg-white border border-slate-200 rounded-2xl p-5 shadow-xs" },
                            React.createElement("div", { className: "text-xs font-bold text-slate-600 uppercase tracking-wider mb-1" }, "Total Bookings"),
                            React.createElement("div", { className: "text-2xl font-black text-slate-900 font-mono tabular-nums" },
                                bookings.length,
                                " Passengers"),
                            React.createElement("div", { className: "text-[11px] text-emerald-700 font-semibold mt-1" }, "Database booking records")),
                        React.createElement("div", { className: "bg-white border border-slate-200 rounded-2xl p-5 shadow-xs" },
                            React.createElement("div", { className: "text-xs font-bold text-slate-600 uppercase tracking-wider mb-1" }, "Paid Revenue"),
                            React.createElement("div", { className: "text-2xl font-black text-slate-900 font-mono tabular-nums" },
                                "\u20B9",
                                totalGMV.toLocaleString()),
                            React.createElement("div", { className: "text-[11px] text-emerald-700 font-semibold mt-1" },
                                "Paid revenue from database"))),
                    React.createElement("div", { className: "bg-white border border-slate-200 rounded-2xl p-6 shadow-xs" },
                        React.createElement("h3", { className: "font-bold text-slate-900 text-base mb-4 flex items-center gap-2" },
                            React.createElement(TrendingUp, { className: "w-5 h-5 text-blue-700" }),
                            React.createElement("span", null, "Revenue by operator category")),
                        React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4" },
                            (report?.operatorTypeRevenue || []).map(category => (React.createElement("div", { key: category.type, className: "rounded-xl border border-slate-200 bg-slate-50 p-4" },
                                React.createElement("div", { className: "text-xs font-bold uppercase tracking-wider text-slate-600" }, category.type === 'government' ? 'Government operators' : 'Private operators'),
                                React.createElement("div", { className: "mt-2 text-xl font-black text-slate-900" }, "\u20B9", Number(category.paidRevenue || 0).toLocaleString()),
                                React.createElement("div", { className: "mt-1 text-xs text-slate-600" }, category.bookingCount, " bookings · paid revenue")))))),
                    React.createElement("div", { className: "bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs" },
                        React.createElement("div", { className: "p-5 border-b border-slate-200 flex items-center justify-between" },
                            React.createElement("h3", { className: "font-bold text-slate-900 text-sm" }, "Operator Accounts & Licensing Status"),
                            React.createElement("button", { onClick: () => setCurrentTab('operators'), className: "text-xs font-bold text-blue-700 hover:underline cursor-pointer" }, "Manage Operator Approvals \u2192")),
                        React.createElement("div", { className: "overflow-x-auto" },
                            React.createElement("table", { className: "w-full text-left text-xs text-slate-700" },
                                React.createElement("thead", { className: "bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider border-b border-slate-200" },
                                    React.createElement("tr", null,
                                        React.createElement("th", { className: "py-3 px-5" }, "Operator Name"),
                                        React.createElement("th", { className: "py-3 px-5" }, "Category"),
                                        React.createElement("th", { className: "py-3 px-5" }, "License"),
                                        React.createElement("th", { className: "py-3 px-5" }, "Fleet"),
                                        React.createElement("th", { className: "py-3 px-5" }, "Rating"),
                                        React.createElement("th", { className: "py-3 px-5" }, "Status"))),
                                React.createElement("tbody", { className: "divide-y divide-slate-200" }, operators.map((op) => (React.createElement("tr", { key: op.id, className: "hover:bg-slate-50/60" },
                                    React.createElement("td", { className: "py-3 px-5 font-bold text-slate-900" }, op.name),
                                    React.createElement("td", { className: "py-3 px-5" },
                                        React.createElement("span", { className: `text-[10px] font-bold px-2 py-0.5 rounded ${op.type === 'government'
                                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                : 'bg-blue-50 text-blue-700 border border-blue-200'}` }, op.type === 'government' ? 'Govt STU' : 'Private')),
                                    React.createElement("td", { className: "py-3 px-5 font-mono" }, op.licenseNumber),
                                    React.createElement("td", { className: "py-3 px-5 font-mono" },
                                        op.fleetCount,
                                        " Buses"),
                                    React.createElement("td", { className: "py-3 px-5 text-amber-700 font-semibold" },
                                        "\u2605 ",
                                        op.rating),
                                    React.createElement("td", { className: "py-3 px-5" },
                                        React.createElement("span", { className: "text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700" }, op.status.toUpperCase()))))))))))),
                currentTab === 'operators' && (React.createElement("div", { className: "space-y-6" },
                    React.createElement("div", null,
                        React.createElement("h1", { className: "text-2xl font-black text-slate-900" }, "Operator Approvals & Compliance"),
                        React.createElement("p", { className: "text-xs text-slate-600 mt-0.5" }, "Approve newly onboarded transport companies, suspend delinquent operators, and verify licenses.")),
                    React.createElement("div", { className: "bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs" },
                        React.createElement("table", { className: "w-full text-left text-xs text-slate-700" },
                            React.createElement("thead", { className: "bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider border-b border-slate-200" },
                                React.createElement("tr", null,
                                    React.createElement("th", { className: "py-3 px-5" }, "Operator"),
                                    React.createElement("th", { className: "py-3 px-5" }, "Category"),
                                    React.createElement("th", { className: "py-3 px-5" }, "Permit Number"),
                                    React.createElement("th", { className: "py-3 px-5" }, "Contact"),
                                    React.createElement("th", { className: "py-3 px-5" }, "Fleet"),
                                    React.createElement("th", { className: "py-3 px-5" }, "Compliance Status"),
                                    React.createElement("th", { className: "py-3 px-5" }, "Action"))),
                            React.createElement("tbody", { className: "divide-y divide-slate-200" }, operators.map((op) => (React.createElement("tr", { key: op.id, className: "hover:bg-slate-50/60" },
                                React.createElement("td", { className: "py-3.5 px-5 font-bold text-slate-900" }, op.name),
                                React.createElement("td", { className: "py-3.5 px-5" },
                                    React.createElement("span", { className: `text-[10px] font-bold px-2 py-0.5 rounded ${op.type === 'government'
                                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                            : 'bg-blue-50 text-blue-700 border border-blue-200'}` }, op.type === 'government' ? 'Govt STU' : 'Private')),
                                React.createElement("td", { className: "py-3.5 px-5 font-mono" }, op.licenseNumber),
                                React.createElement("td", { className: "py-3.5 px-5" }, op.email),
                                React.createElement("td", { className: "py-3.5 px-5 font-mono" },
                                    op.fleetCount,
                                    " Buses"),
                                React.createElement("td", { className: "py-3.5 px-5" },
                                    React.createElement("span", { className: `text-[10px] font-bold px-2 py-0.5 rounded ${op.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}` }, op.status.toUpperCase())),
                                React.createElement("td", { className: "py-3.5 px-5" }, op.status === 'active' ? (React.createElement("button", { onClick: () => handleUpdateStatus(op, 'suspended'), className: "text-xs font-semibold text-blue-700 hover:underline cursor-pointer" }, "Suspend")) : (React.createElement("button", { onClick: () => handleUpdateStatus(op, 'active'), className: "text-xs font-semibold text-emerald-700 hover:underline cursor-pointer" }, "Approve & Activate"))))))))))),
                currentTab === 'all-buses' && (React.createElement("div", { className: "space-y-6" },
                    React.createElement("div", null,
                        React.createElement("h1", { className: "text-2xl font-black text-slate-900" }, "All Platform Buses"),
                        React.createElement("p", { className: "text-xs text-slate-600 mt-0.5" }, "Master fleet inventory across both Government and Private carriers.")),
                    React.createElement("div", { className: "bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs" },
                        React.createElement("table", { className: "w-full text-left text-xs text-slate-700" },
                            React.createElement("thead", { className: "bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider border-b border-slate-200" },
                                React.createElement("tr", null,
                                    React.createElement("th", { className: "py-3 px-5" }, "Bus Name"),
                                    React.createElement("th", { className: "py-3 px-5" }, "Operator"),
                                    React.createElement("th", { className: "py-3 px-5" }, "Registration"),
                                    React.createElement("th", { className: "py-3 px-5" }, "Seating Type"),
                                    React.createElement("th", { className: "py-3 px-5" }, "Capacity"),
                                    React.createElement("th", { className: "py-3 px-5" }, "Status"))),
                            React.createElement("tbody", { className: "divide-y divide-slate-200" }, buses.map((b) => (React.createElement("tr", { key: b.id, className: "hover:bg-slate-50/60" },
                                React.createElement("td", { className: "py-3 px-5 font-bold text-slate-900" }, b.name),
                                React.createElement("td", { className: "py-3 px-5" }, b.operatorName),
                                React.createElement("td", { className: "py-3 px-5 font-mono font-bold text-blue-700" }, b.registrationNumber),
                                React.createElement("td", { className: "py-3 px-5" }, b.busType),
                                React.createElement("td", { className: "py-3 px-5 font-mono" },
                                    b.totalSeats,
                                    " seats"),
                                React.createElement("td", { className: "py-3 px-5" },
                                    React.createElement("span", { className: "text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700" }, b.status.toUpperCase())))))))))),
                currentTab === 'all-bookings' && (React.createElement("div", { className: "space-y-6" },
                    React.createElement("div", null,
                        React.createElement("h1", { className: "text-2xl font-black text-slate-900" }, "Master Passenger Bookings Ledger"),
                        React.createElement("p", { className: "text-xs text-slate-600 mt-0.5" }, "Platform-wide audit of all passenger transactions and cancellations.")),
                    React.createElement("div", { className: "bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs" },
                        React.createElement("table", { className: "w-full text-left text-xs text-slate-700" },
                            React.createElement("thead", { className: "bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider border-b border-slate-200" },
                                React.createElement("tr", null,
                                    React.createElement("th", { className: "py-3 px-5" }, "PNR"),
                                    React.createElement("th", { className: "py-3 px-5" }, "Passenger"),
                                    React.createElement("th", { className: "py-3 px-5" }, "Carrier"),
                                    React.createElement("th", { className: "py-3 px-5" }, "Route"),
                                    React.createElement("th", { className: "py-3 px-5" }, "Seats"),
                                    React.createElement("th", { className: "py-3 px-5" }, "Total Paid"),
                                    React.createElement("th", { className: "py-3 px-5" }, "Status"))),
                            React.createElement("tbody", { className: "divide-y divide-slate-200" }, bookings.map((bk) => (React.createElement("tr", { key: bk.id, className: "hover:bg-slate-50/60" },
                                React.createElement("td", { className: "py-3 px-5 font-mono font-bold text-blue-400" }, bk.pnr),
                                React.createElement("td", { className: "py-3 px-5 font-medium text-slate-900" }, bk.passengerName),
                                React.createElement("td", { className: "py-3 px-5" }, bk.operatorName),
                                React.createElement("td", { className: "py-3 px-5" },
                                    bk.source,
                                    " \u2192 ",
                                    bk.destination),
                                React.createElement("td", { className: "py-3 px-5 font-mono font-bold" }, bk.selectedSeats.join(', ')),
                                React.createElement("td", { className: "py-3 px-5 font-mono font-bold text-emerald-700" },
                                    "\u20B9",
                                    bk.grandTotal),
                                React.createElement("td", { className: "py-3 px-5" },
                                    React.createElement("span", { className: `text-[10px] font-bold px-2 py-0.5 rounded ${bk.status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}` }, bk.status))))))))))))));
};
__exports.AdminPortal = AdminPortal;

});

__define("components/CodeInspector", function(__exports, __require){
"use strict";
const { useState } = React;
const { Copy, Check, FileCode, Download, ExternalLink, Folder } = __require("lucide-react");
const PROJECT_FILES = [
    // Passenger
    { path: 'index.html', category: 'passenger', description: 'Public Homepage & Search Hero', url: 'standalone/index.html' },
    { path: 'login.html', category: 'passenger', description: 'Passenger-Only Login (No Operator/Admin choice)', url: 'standalone/login.html' },
    { path: 'register.html', category: 'passenger', description: 'Passenger Registration Form', url: 'standalone/register.html' },
    { path: 'search-results.html', category: 'passenger', description: 'Available Buses & Filter Panel', url: 'standalone/search-results.html' },
    { path: 'seat-selection.html', category: 'passenger', description: 'Interactive Seat Selection (Lower & Upper Deck)', url: 'standalone/seat-selection.html' },
    { path: 'ticket-details.html', category: 'passenger', description: 'Printable E-Ticket Boarding Pass with QR Code', url: 'standalone/ticket-details.html' },
    { path: 'user-dashboard.html', category: 'passenger', description: 'Passenger Bookings & Cancellation Dashboard', url: 'standalone/user-dashboard.html' },
    // Operator
    { path: 'operator-login.html', category: 'operator', description: 'Operator Login (Unified for Govt & Private)', url: 'standalone/operator-login.html' },
    { path: 'operator-dashboard.html', category: 'operator', description: 'Fleet Operations Overview & Telemetry', url: 'standalone/operator-dashboard.html' },
    { path: 'buses.html', category: 'operator', description: 'Coach Fleet Management (Add, Edit, Deactivate)', url: 'standalone/buses.html' },
    { path: 'routes.html', category: 'operator', description: 'Transit Corridors & Boarding Checkpoints', url: 'standalone/routes.html' },
    { path: 'schedules.html', category: 'operator', description: 'Trip Departure Times & Dynamic Pricing', url: 'standalone/schedules.html' },
    { path: 'bookings.html', category: 'operator', description: 'Trip Passenger Manifests & Gate Verification', url: 'standalone/bookings.html' },
    // Admin
    { path: 'admin-login.html', category: 'admin', description: 'Platform Admin Isolated Login Gateway', url: 'standalone/admin-login.html' },
    { path: 'admin-dashboard.html', category: 'admin', description: 'Platform Governance & Govt vs Private Analytics', url: 'standalone/admin-dashboard.html' },
    { path: 'operators.html', category: 'admin', description: 'Operator Licensing Audit & Account Approvals', url: 'standalone/operators.html' },
    // All in one
    { path: 'gobus-all-in-one.html', category: 'all-in-one', description: 'Single Standalone HTML with Embedded CSS & JS', url: 'standalone/gobus-all-in-one.html' },
    // CSS
    { path: 'css/style.css', category: 'css', description: 'Core Typography, Variables & Layout', url: 'standalone/css/style.css' },
    { path: 'css/dashboard.css', category: 'css', description: 'SaaS Tables, Seat Map & Boarding Pass', url: 'standalone/css/dashboard.css' },
    { path: 'css/forms.css', category: 'css', description: 'Form Controls & Auth Card Styling', url: 'standalone/css/forms.css' },
    { path: 'css/responsive.css', category: 'css', description: 'Mobile & Tablet Responsive Rules', url: 'standalone/css/responsive.css' },
    // JS
    { path: 'js/main.js', category: 'js', description: 'Passenger Search & Seat Selection Script', url: 'standalone/js/main.js' },
    { path: 'js/dashboard.js', category: 'js', description: 'Operator & Admin Table Filter Script', url: 'standalone/js/dashboard.js' },
];
const CodeInspector = () => {
    const [selectedFile, setSelectedFile] = useState(PROJECT_FILES[0]);
    const [fileContent, setFileContent] = useState('Loading file source code...');
    const [copied, setCopied] = useState(false);
    const [activeCategory, setActiveCategory] = useState('all');
    // Load file content dynamically
    React.useEffect(() => {
        fetch(selectedFile.url)
            .then((res) => {
            if (!res.ok)
                throw new Error('Failed to load file');
            return res.text();
        })
            .then((text) => setFileContent(text))
            .catch((err) => setFileContent(`<!-- Source file ready at /public/standalone/${selectedFile.path} -->`));
    }, [selectedFile]);
    const handleCopy = () => {
        navigator.clipboard.writeText(fileContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    const filteredFiles = activeCategory === 'all'
        ? PROJECT_FILES
        : PROJECT_FILES.filter(f => f.category === activeCategory);
    return (React.createElement("div", { className: "bg-slate-900 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8" },
        React.createElement("div", { className: "max-w-7xl mx-auto space-y-6" },
            React.createElement("div", { className: "bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4" },
                React.createElement("div", null,
                    React.createElement("div", { className: "flex items-center gap-2" },
                        React.createElement(FileCode, { className: "w-6 h-6 text-amber-500" }),
                        React.createElement("h1", { className: "text-2xl font-black text-white" }, "GoBus Project Source Code Inspector")),
                    React.createElement("p", { className: "text-xs text-slate-400 mt-1" }, "Browse, inspect, and copy complete HTML5, CSS3, and JavaScript files built for your college project submission.")),
                React.createElement("div", { className: "flex items-center gap-2" },
                    React.createElement("a", { href: selectedFile.url, target: "_blank", rel: "noreferrer", className: "px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5" },
                        React.createElement(ExternalLink, { className: "w-4 h-4" }),
                        React.createElement("span", null, "Open in New Tab")),
                    React.createElement("button", { onClick: handleCopy, className: "px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm" },
                        copied ? React.createElement(Check, { className: "w-4 h-4" }) : React.createElement(Copy, { className: "w-4 h-4" }),
                        React.createElement("span", null, copied ? 'Code Copied!' : 'Copy Entire File')))),
            React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-6 items-start" },
                React.createElement("div", { className: "bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-sm space-y-3" },
                    React.createElement("div", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5" },
                        React.createElement(Folder, { className: "w-4 h-4 text-amber-500" }),
                        React.createElement("span", null, "Project Files")),
                    React.createElement("div", { className: "flex flex-wrap gap-1 pb-2 border-b border-slate-800 text-[11px]" }, ['all', 'passenger', 'operator', 'admin', 'css', 'js'].map((cat) => (React.createElement("button", { key: cat, onClick: () => setActiveCategory(cat), className: `px-2 py-1 rounded capitalize font-semibold transition-colors cursor-pointer ${activeCategory === cat
                            ? 'bg-amber-600 text-white'
                            : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}` }, cat)))),
                    React.createElement("div", { className: "space-y-1 max-h-[600px] overflow-y-auto pr-1" }, filteredFiles.map((f) => {
                        const isSelected = selectedFile.path === f.path;
                        return (React.createElement("button", { key: f.path, onClick: () => setSelectedFile(f), className: `w-full text-left p-2.5 rounded-xl transition-all cursor-pointer flex flex-col gap-0.5 ${isSelected
                                ? 'bg-amber-600/20 border border-amber-500/50 text-white'
                                : 'hover:bg-slate-900 border border-transparent text-slate-400'}` },
                            React.createElement("div", { className: "flex items-center justify-between" },
                                React.createElement("span", { className: "font-mono text-xs font-bold text-slate-200" }, f.path),
                                React.createElement("span", { className: "text-[9px] uppercase px-1.5 py-0.2 rounded bg-slate-900 font-bold text-slate-400" }, f.category)),
                            React.createElement("span", { className: "text-[11px] text-slate-500 truncate" }, f.description)));
                    }))),
                React.createElement("div", { className: "lg:col-span-3 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl" },
                    React.createElement("div", { className: "bg-slate-900 px-5 py-3 border-b border-slate-800 flex items-center justify-between" },
                        React.createElement("div", null,
                            React.createElement("span", { className: "font-mono text-xs font-bold text-amber-400" }, selectedFile.path),
                            React.createElement("span", { className: "text-xs text-slate-500 ml-2" },
                                "(",
                                selectedFile.description,
                                ")")),
                        React.createElement("button", { onClick: handleCopy, className: "text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer" },
                            copied ? React.createElement(Check, { className: "w-3.5 h-3.5 text-emerald-400" }) : React.createElement(Copy, { className: "w-3.5 h-3.5" }),
                            React.createElement("span", null, copied ? 'Copied' : 'Copy'))),
                    React.createElement("pre", { className: "p-5 font-mono text-xs text-slate-300 overflow-x-auto max-h-[680px] leading-relaxed selection:bg-amber-500 selection:text-black" },
                        React.createElement("code", null, fileContent)))))));
};
__exports.CodeInspector = CodeInspector;

});

__define("components/JavaGuideModal", function(__exports, __require){
"use strict";
const { BookOpen, Terminal, Database, Server, CheckCircle, AlertTriangle, ArrowRight } = __require("lucide-react");
const JavaGuideModal = () => {
    return (React.createElement("div", { className: "bg-slate-900 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8" },
        React.createElement("div", { className: "max-w-4xl mx-auto space-y-8" },
            React.createElement("div", { className: "bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl" },
                React.createElement("div", { className: "flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2" },
                    React.createElement(BookOpen, { className: "w-4 h-4" }),
                    React.createElement("span", null, "College Project Submission & Architecture Reference")),
                React.createElement("h1", { className: "text-3xl font-black text-white" }, "VS Code Live Server & Java/MySQL Integration Guide"),
                React.createElement("p", { className: "text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed" }, "Step-by-step instructions for running the GoBus frontend locally in Visual Studio Code using the Live Server extension, followed by complete backend preparation for Java Spring Boot / Servlets and MySQL.")),
            React.createElement("div", { className: "bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4" },
                React.createElement("div", { className: "flex items-center gap-2 text-emerald-400 font-bold text-sm" },
                    React.createElement(Terminal, { className: "w-5 h-5" }),
                    React.createElement("span", null, "1. How to Open and Run in VS Code (Live Server)")),
                React.createElement("div", { className: "space-y-3 text-xs sm:text-sm text-slate-300" },
                    React.createElement("div", { className: "p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2" },
                        React.createElement("strong", { className: "text-white block font-bold" }, "Step 1: Download or copy the project files"),
                        React.createElement("p", { className: "text-slate-400" }, "Place the standalone files into your project folder on your computer:"),
                        React.createElement("pre", { className: "p-3 bg-black/50 rounded-xl font-mono text-xs text-emerald-300" }, `GoBus/
├── index.html              (Public Homepage)
├── login.html              (Passenger Login)
├── register.html           (Passenger Registration)
├── search-results.html     (Available Buses)
├── seat-selection.html     (Interactive Seat Map)
├── ticket-details.html     (Printable E-Ticket)
├── user-dashboard.html     (Passenger Dashboard)
├── operator-login.html     (Operator Login)
├── operator-dashboard.html (Operator Analytics)
├── buses.html              (Fleet Management)
├── routes.html             (Transit Routes)
├── schedules.html          (Trip Schedules)
├── bookings.html           (Passenger Manifests)
├── admin-login.html        (Platform Admin Gateway)
├── admin-dashboard.html    (Platform Governance)
├── operators.html          (Operator Approvals)
├── css/
│   ├── style.css
│   ├── dashboard.css
│   ├── forms.css
│   └── responsive.css
└── js/
    ├── main.js
    └── dashboard.js`)),
                    React.createElement("div", { className: "p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2" },
                        React.createElement("strong", { className: "text-white block font-bold" }, "Step 2: Install Live Server in Visual Studio Code"),
                        React.createElement("p", { className: "text-slate-400" },
                            "1. Open VS Code \u2192 Click on the Extensions icon on the left sidebar (or press ",
                            React.createElement("kbd", { className: "px-1.5 py-0.5 bg-slate-800 rounded font-mono" }, "Ctrl+Shift+X"),
                            ").",
                            React.createElement("br", null),
                            "2. Search for ",
                            React.createElement("strong", null, "\"Live Server\""),
                            " (by Ritwick Dey) and click ",
                            React.createElement("strong", null, "Install"),
                            ".")),
                    React.createElement("div", { className: "p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2" },
                        React.createElement("strong", { className: "text-white block font-bold" }, "Step 3: Launch the Website"),
                        React.createElement("p", { className: "text-slate-400" },
                            "Right-click on ",
                            React.createElement("code", { className: "text-emerald-300 font-mono" }, "index.html"),
                            " and click ",
                            React.createElement("strong", null, "\"Open with Live Server\""),
                            ".",
                            React.createElement("br", null),
                            "Your browser will automatically open ",
                            React.createElement("code", { className: "text-emerald-300 font-mono" }, "http://127.0.0.1:5500/index.html"),
                            " with the live GoBus website.")))),
            React.createElement("div", { className: "bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4" },
                React.createElement("div", { className: "flex items-center gap-2 text-amber-400 font-bold text-sm" },
                    React.createElement(Server, { className: "w-5 h-5" }),
                    React.createElement("span", null, "2. Classification: Frontend Prototype vs. Java Backend Requirements")),
                React.createElement("div", { className: "overflow-x-auto" },
                    React.createElement("table", { className: "w-full text-left text-xs" },
                        React.createElement("thead", { className: "bg-slate-900 text-slate-400 uppercase font-semibold border-b border-slate-800" },
                            React.createElement("tr", null,
                                React.createElement("th", { className: "py-3 px-4" }, "Feature / Flow"),
                                React.createElement("th", { className: "py-3 px-4" }, "Current Frontend Demo"),
                                React.createElement("th", { className: "py-3 px-4" }, "Future Java Backend + MySQL Requirement"))),
                        React.createElement("tbody", { className: "divide-y divide-slate-800 text-slate-300" },
                            React.createElement("tr", null,
                                React.createElement("td", { className: "py-3 px-4 font-bold text-white" }, "Passenger Authentication"),
                                React.createElement("td", { className: "py-3 px-4 text-emerald-400" }, "Demo login using rahul.sharma@example.com"),
                                React.createElement("td", { className: "py-3 px-4 text-slate-400" },
                                    React.createElement("code", { className: "text-amber-300" }, "POST /api/auth/login"),
                                    " with BCrypt hashed passwords and JWT token in Authorization header.")),
                            React.createElement("tr", null,
                                React.createElement("td", { className: "py-3 px-4 font-bold text-white" }, "Operator Permissions"),
                                React.createElement("td", { className: "py-3 px-4 text-emerald-400" }, "Simulated by company email domain (Govt vs Private)"),
                                React.createElement("td", { className: "py-3 px-4 text-slate-400" },
                                    "Spring Security RBAC: ",
                                    React.createElement("code", { className: "text-amber-300" }, "hasRole('OPERATOR')"),
                                    " with SQL tenant isolation by ",
                                    React.createElement("code", { className: "text-amber-300" }, "operator_id"),
                                    ".")),
                            React.createElement("tr", null,
                                React.createElement("td", { className: "py-3 px-4 font-bold text-white" }, "Seat Locks & Double-Booking"),
                                React.createElement("td", { className: "py-3 px-4 text-emerald-400" }, "Local state toggle with pre-marked booked seats"),
                                React.createElement("td", { className: "py-3 px-4 text-slate-400" },
                                    "Database pessimistic locking (",
                                    React.createElement("code", { className: "text-amber-300" }, "SELECT ... FOR UPDATE"),
                                    ") or Redis 10-minute temporary seat lock.")),
                            React.createElement("tr", null,
                                React.createElement("td", { className: "py-3 px-4 font-bold text-white" }, "Ticket & QR Generation"),
                                React.createElement("td", { className: "py-3 px-4 text-emerald-400" }, "Dynamic SVG QR with printable stylesheet"),
                                React.createElement("td", { className: "py-3 px-4 text-slate-400" }, "ZXing Java library generating encrypted QR code payloads verified by conductor scanner devices.")),
                            React.createElement("tr", null,
                                React.createElement("td", { className: "py-3 px-4 font-bold text-white" }, "Payment Processing"),
                                React.createElement("td", { className: "py-3 px-4 text-emerald-400" }, "Razorpay Checkout with server-side signature and capture verification"),
                                React.createElement("td", { className: "py-3 px-4 text-slate-400" }, "Server validates Razorpay signature, captured status, order, amount, and currency before confirming the booking.")))))),
            React.createElement("div", { className: "bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4" },
                React.createElement("div", { className: "flex items-center gap-2 text-blue-400 font-bold text-sm" },
                    React.createElement(Database, { className: "w-5 h-5" }),
                    React.createElement("span", null, "3. Proposed MySQL Database Schema (`gobus_db`)")),
                React.createElement("pre", { className: "p-4 bg-black/60 rounded-2xl font-mono text-xs text-blue-300 overflow-x-auto leading-relaxed" }, `-- GoBus MySQL Production Schema

CREATE DATABASE IF NOT EXISTS gobus_db;
USE gobus_db;

-- 1. Users Table (Passengers & Administrators)
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('PASSENGER', 'OPERATOR', 'ADMIN') NOT NULL DEFAULT 'PASSENGER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bus Operators Table (Government STUs and Private Fleets)
CREATE TABLE operators (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    company_name VARCHAR(150) NOT NULL,
    category ENUM('GOVERNMENT', 'PRIVATE') NOT NULL,
    license_number VARCHAR(50) UNIQUE NOT NULL,
    status ENUM('PENDING', 'ACTIVE', 'SUSPENDED') DEFAULT 'ACTIVE',
    rating DECIMAL(2,1) DEFAULT 4.5,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Buses Table
CREATE TABLE buses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    operator_id BIGINT NOT NULL,
    bus_name VARCHAR(100) NOT NULL,
    reg_number VARCHAR(30) UNIQUE NOT NULL,
    bus_type ENUM('VOLVO_MULTI_AXLE', 'AC_SLEEPER', 'BHARATBENZ_SEATER', 'EXPRESS') NOT NULL,
    total_seats INT NOT NULL,
    status ENUM('ACTIVE', 'MAINTENANCE', 'INACTIVE') DEFAULT 'ACTIVE',
    FOREIGN KEY (operator_id) REFERENCES operators(id)
);

-- 4. Routes Table
CREATE TABLE routes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    source_city VARCHAR(50) NOT NULL,
    destination_city VARCHAR(50) NOT NULL,
    distance_km INT NOT NULL,
    duration_hours VARCHAR(20) NOT NULL
);

-- 5. Schedules Table
CREATE TABLE schedules (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    bus_id BIGINT NOT NULL,
    route_id BIGINT NOT NULL,
    departure_time TIME NOT NULL,
    arrival_time TIME NOT NULL,
    base_fare DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (bus_id) REFERENCES buses(id),
    FOREIGN KEY (route_id) REFERENCES routes(id)
);

-- 6. Bookings Table
CREATE TABLE bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    pnr VARCHAR(20) UNIQUE NOT NULL,
    user_id BIGINT NOT NULL,
    schedule_id BIGINT NOT NULL,
    journey_date DATE NOT NULL,
    seats_reserved VARCHAR(50) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('CONFIRMED', 'CANCELLED', 'COMPLETED') DEFAULT 'CONFIRMED',
    payment_method VARCHAR(30) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (schedule_id) REFERENCES schedules(id)
);`)),
            React.createElement("div", { className: "bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4" },
                React.createElement("div", { className: "flex items-center gap-2 text-indigo-400 font-bold text-sm" },
                    React.createElement(Server, { className: "w-5 h-5" }),
                    React.createElement("span", null, "4. Sample Java Spring Boot REST Controller (`BusBookingController.java`)")),
                React.createElement("pre", { className: "p-4 bg-black/60 rounded-2xl font-mono text-xs text-indigo-300 overflow-x-auto leading-relaxed" }, `package com.gobus.api.controller;

import com.gobus.api.model.*;
import com.gobus.api.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allows connection from your frontend
public class BusBookingController {

    @Autowired
    private BookingService bookingService;

    // 1. Search Buses by Route and Date
    @GetMapping("/buses/search")
    public ResponseEntity<List<ScheduleDTO>> searchBuses(
            @RequestParam String source,
            @RequestParam String destination,
            @RequestParam String date) {
        List<ScheduleDTO> schedules = bookingService.findAvailableBuses(source, destination, date);
        return ResponseEntity.ok(schedules);
    }

    // 2. Reserve Seat & Create Booking
    @PostMapping("/bookings/create")
    public ResponseEntity<BookingResponseDTO> createBooking(@RequestBody BookingRequestDTO request) {
        BookingResponseDTO booking = bookingService.reserveSeatsAndProcessPayment(request);
        return ResponseEntity.ok(booking);
    }

    // 3. Cancel Booking with Refund
    @PostMapping("/bookings/{id}/cancel")
    public ResponseEntity<String> cancelBooking(@PathVariable Long id) {
        bookingService.cancelBookingAndInitiateRefund(id);
        return ResponseEntity.ok("Booking " + id + " cancelled successfully. Refund initiated.");
    }
}`)))));
};
__exports.JavaGuideModal = JavaGuideModal;

});

__define("App", function(__exports, __require){
"use strict";
/**
 * GoBus - Complete Professional Bus Booking & Transport Management Website
 * Features strictly separated Passenger, Operator, and Admin experiences.
 */
const { useState, useEffect } = React;
const { StorageService } = __require("storageService");
const { Navbar } = __require("components/Navbar");
const { HeroSearch } = __require("components/HeroSearch");
const { BusListings } = __require("components/BusListings");
const { SeatMap } = __require("components/SeatMap");
const { CheckoutModal } = __require("components/CheckoutModal");
const { TicketPass } = __require("components/TicketPass");
const { PassengerDashboard } = __require("components/PassengerDashboard");
const { PassengerLogin } = __require("components/PassengerLogin");
const { PassengerRegister } = __require("components/PassengerRegister");
const { OperatorLogin } = __require("components/OperatorLogin");
const { OperatorPortal } = __require("components/OperatorPortal");
const { AdminLogin } = __require("components/AdminLogin");
const { AdminPortal } = __require("components/AdminPortal");
const { CodeInspector } = __require("components/CodeInspector");
const { JavaGuideModal } = __require("components/JavaGuideModal");
const { Bus: BusIcon, Shield, Clock, Award, MapPin, ArrowRight } = __require("lucide-react");
function App() {
    const [activePage, setActivePage] = useState(() => {
        if (window.location.pathname.startsWith('/admin-login'))
            return 'admin-login';
        if (window.location.pathname.startsWith('/busoperator'))
            return 'operator-login';
        return 'home';
    });
    const [currentUser, setCurrentUser] = useState(() => StorageService.getCurrentUser());
    // Search parameters
    const [searchSource, setSearchSource] = useState('Bengaluru');
    const [searchDestination, setSearchDestination] = useState('Mysuru');
    const [searchDate, setSearchDate] = useState(() => new Date().toISOString().split('T')[0]);
    // Selected Booking State
    const [selectedBus, setSelectedBus] = useState(null);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [checkoutParams, setCheckoutParams] = useState(null);
    const [activeTicket, setActiveTicket] = useState(() => {
        const list = StorageService.getBookings();
        return list[0] || null;
    });
    // Cached master data
    const [buses, setBuses] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [searchError, setSearchError] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    useEffect(() => {
        setBuses(StorageService.getBuses());
        setRoutes(StorageService.getRoutes());
        setSchedules(StorageService.getSchedules());
    }, []);
    useEffect(() => {
        if (activePage !== 'search-results' || currentUser?.role !== 'passenger')
            return;
        let active = true;
        setIsSearching(true);
        setSearchError('');
        window.GoBusApi.searchTrips(
            searchSource, searchDestination, searchDate)
            .then((trips) => {
                if (!active)
                    return;
                const routeMap = new Map();
                trips.forEach((trip) => routeMap.set(trip.route.id, trip.route));
                setBuses(trips.map((trip) => trip.bus));
                setSchedules(trips.map((trip) => trip.schedule));
                setRoutes(Array.from(routeMap.values()));
            })
            .catch((error) => {
                if (!active)
                    return;
                setBuses([]);
                setSchedules([]);
                setRoutes([]);
                setSearchError(error.message);
            })
            .finally(() => {
                if (active)
                    setIsSearching(false);
            });
        return () => {
            active = false;
        };
    }, [activePage, currentUser?.id, searchSource, searchDestination, searchDate]);
    const handleSearch = (from, to, date) => {
        setSearchSource(from);
        setSearchDestination(to);
        setSearchDate(date);
        setActivePage('search-results');
    };
    const handleSelectBus = (bus, schedule, route) => {
        setSelectedBus(bus);
        setSelectedSchedule(schedule);
        setSelectedRoute(route);
        setActivePage('seat-selection');
    };
    const handleProceedToCheckout = (selectedSeats, boardingPoint, droppingPoint, totalFare, tax, grandTotal) => {
        setCheckoutParams({
            selectedSeats,
            boardingPoint,
            droppingPoint,
            totalFare,
            tax,
            grandTotal,
        });
    };
    const handleBookingSuccess = (booking) => {
        setCheckoutParams(null);
        setActiveTicket(booking);
        setActivePage('ticket-details');
    };
    const handleLogout = () => {
        window.GoBusApi.logout().catch((error) => {
            console.error('Unable to end GoBus session cleanly.', error);
        });
        StorageService.setCurrentUser(null);
        setCurrentUser(null);
        setActivePage('home');
    };
    return (React.createElement("div", { className: "min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-900 selection:bg-blue-600 selection:text-white" },
        (() => {
            // --- PASSENGER LOGIN & REGISTER ---
            if (activePage === 'passenger-login') {
                return (React.createElement(PassengerLogin, { onLoginSuccess: (user) => {
                        StorageService.setCurrentUser(user);
                        setCurrentUser(user);
                        setActivePage('user-dashboard');
                    }, onGoToRegister: () => setActivePage('passenger-register'), onGoHome: () => setActivePage('home') }));
            }
            if (activePage === 'passenger-register') {
                return (React.createElement(PassengerRegister, { onRegisterSuccess: (user) => {
                        setCurrentUser(user);
                        setActivePage('user-dashboard');
                    }, onGoToLogin: () => setActivePage('passenger-login'), onGoHome: () => setActivePage('home') }));
            }
            // --- OPERATOR PORTAL ---
            if (activePage.startsWith('operator-')) {
                if (!currentUser || currentUser.role !== 'operator') {
                    return (React.createElement(OperatorLogin, { onLoginSuccess: (user) => {
                            StorageService.setCurrentUser(user);
                            setCurrentUser(user);
                            setActivePage('operator-dashboard');
                        }, onGoHome: () => {
                            if (window.location.pathname.startsWith('/busoperator')) {
                                window.history.pushState({}, '', '/');
                                document.title = 'GoBus - Professional Bus Booking & Transport Management';
                            }
                            setActivePage('home');
                        } }));
                }
                return React.createElement(OperatorPortal, { user: currentUser, onLogout: handleLogout });
            }
            // --- PLATFORM ADMIN PORTAL ---
            if (activePage.startsWith('admin-')) {
                if (!currentUser || currentUser.role !== 'admin') {
                    return (React.createElement(AdminLogin, { onLoginSuccess: (user) => {
                            StorageService.setCurrentUser(user);
                            setCurrentUser(user);
                            setActivePage('admin-dashboard');
                        }, onGoHome: () => {
                            if (window.location.pathname.startsWith('/admin-login')) {
                                window.history.pushState({}, '', '/');
                                document.title = 'GoBus - Professional Bus Booking & Transport Management';
                            }
                            setActivePage('home');
                        } }));
                }
                return React.createElement(AdminPortal, { user: currentUser, onLogout: handleLogout });
            }
            // --- CODE INSPECTOR & JAVA GUIDE ---
            if (activePage === 'code-inspector') {
                return React.createElement(CodeInspector, null);
            }
            if (activePage === 'java-guide') {
                return React.createElement(JavaGuideModal, null);
            }
            if (activePage === 'search-results' && currentUser?.role !== 'passenger') {
                return (React.createElement(PassengerLogin, { onLoginSuccess: (user) => {
                        StorageService.setCurrentUser(user);
                        setCurrentUser(user);
                        setActivePage('search-results');
                    }, onGoToRegister: () => setActivePage('passenger-register'), onGoHome: () => setActivePage('home') }));
            }
            if ((activePage === 'user-dashboard' || activePage === 'ticket-details') && currentUser?.role !== 'passenger') {
                return (React.createElement(PassengerLogin, { onLoginSuccess: (user) => {
                        StorageService.setCurrentUser(user);
                        setCurrentUser(user);
                        setActivePage('user-dashboard');
                    }, onGoToRegister: () => setActivePage('passenger-register'), onGoHome: () => setActivePage('home') }));
            }
            // --- PASSENGER DASHBOARD ---
            if (activePage === 'user-dashboard') {
                return (React.createElement("div", null,
                    React.createElement(Navbar, { activePage: activePage, setActivePage: setActivePage, currentUser: currentUser, onLogout: handleLogout }),
                    React.createElement(PassengerDashboard, { user: currentUser, onViewTicket: (bk) => {
                            setActiveTicket(bk);
                            setActivePage('ticket-details');
                        }, onBookNew: () => setActivePage('search-results'), onLogout: handleLogout })));
            }
            // --- TICKET DETAILS / BOARDING PASS ---
            if (activePage === 'ticket-details') {
                if (!activeTicket) {
                    return (React.createElement("div", { className: "p-10 text-center" },
                        React.createElement("p", null, "No active ticket selected."),
                        React.createElement("button", { onClick: () => setActivePage('home'), className: "mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg" }, "Return to Home")));
                }
                return (React.createElement("div", null,
                    React.createElement(Navbar, { activePage: activePage, setActivePage: setActivePage, currentUser: currentUser, onLogout: handleLogout }),
                    React.createElement(TicketPass, { booking: activeTicket, onGoToDashboard: () => setActivePage('user-dashboard'), onBookAnother: () => setActivePage('home') })));
            }
            // --- SEAT SELECTION ---
            if (activePage === 'seat-selection') {
                if (!selectedBus || !selectedSchedule || !selectedRoute) {
                    return (React.createElement("div", { className: "p-10 text-center" },
                        React.createElement("p", null, "Please select a bus schedule first."),
                        React.createElement("button", { onClick: () => setActivePage('search-results'), className: "mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg" }, "View Available Buses")));
                }
                return (React.createElement("div", null,
                    React.createElement(Navbar, { activePage: activePage, setActivePage: setActivePage, currentUser: currentUser, onLogout: handleLogout }),
                    React.createElement(SeatMap, { bus: selectedBus, schedule: selectedSchedule, route: selectedRoute, journeyDate: searchDate, onProceedToCheckout: handleProceedToCheckout, onBack: () => setActivePage('search-results') }),
                    checkoutParams && (React.createElement(CheckoutModal, { bus: selectedBus, schedule: selectedSchedule, journeyDate: searchDate, source: searchSource, destination: searchDestination, selectedSeats: checkoutParams.selectedSeats, boardingPoint: checkoutParams.boardingPoint, droppingPoint: checkoutParams.droppingPoint, totalFare: checkoutParams.totalFare, tax: checkoutParams.tax, grandTotal: checkoutParams.grandTotal, currentUser: currentUser, onBookingSuccess: handleBookingSuccess, onClose: () => setCheckoutParams(null) }))));
            }
            // --- SEARCH RESULTS ---
            if (activePage === 'search-results') {
                return (React.createElement("div", null,
                    React.createElement(Navbar, { activePage: activePage, setActivePage: setActivePage, currentUser: currentUser, onLogout: handleLogout }),
                    searchError && React.createElement("p", { role: "alert", className: "mx-auto mt-6 max-w-7xl rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700" }, searchError),
                    isSearching && React.createElement("p", { className: "mx-auto mt-6 max-w-7xl text-sm text-slate-500" }, "Searching live schedules..."),
                    React.createElement(BusListings, { source: searchSource, destination: searchDestination, date: searchDate, buses: buses, routes: routes, schedules: schedules, onSelectBus: handleSelectBus, onModifySearch: () => setActivePage('home') })));
            }
            // --- PASSENGER HOMEPAGE (DEFAULT) ---
            return (React.createElement("div", null,
                React.createElement(Navbar, { activePage: activePage, setActivePage: setActivePage, currentUser: currentUser, onLogout: handleLogout }),
                React.createElement(HeroSearch, { onSearch: handleSearch }),
                React.createElement("section", { id: "partners-section", className: "py-20 bg-white border-b border-slate-200" },
                    React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" },
                        React.createElement("div", { className: "text-center max-w-2xl mx-auto mb-14" },
                            React.createElement("span", { className: "text-xs font-bold text-blue-600 uppercase tracking-wider block mb-2" }, "Certified Transit Undertakings"),
                            React.createElement("h2", { className: "text-3xl font-extrabold text-slate-900 tracking-tight" }, "Government State RTCs & Luxury Private Fleets"),
                            React.createElement("p", { className: "text-sm text-slate-500 mt-2" }, "GoBus connects you directly to state transport depots and premier private operators with standardized quality and fair pricing.")),
                        React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8" },
                            React.createElement("div", { className: "bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow" },
                                React.createElement("div", { className: "w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-5" },
                                    React.createElement(BusIcon, { className: "w-6 h-6" })),
                                React.createElement("div", { className: "inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2" }, "Government STU"),
                                React.createElement("h3", { className: "text-lg font-bold text-slate-900 mb-2" }, "KSRTC Airavat & Club Class"),
                                React.createElement("p", { className: "text-xs text-slate-600 leading-relaxed" }, "Official Karnataka state corporation operating multi-axle Volvo coaches with verified safety records and subsidized student/senior fares.")),
                            React.createElement("div", { className: "bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow" },
                                React.createElement("div", { className: "w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-5" },
                                    React.createElement(Shield, { className: "w-6 h-6" })),
                                React.createElement("div", { className: "inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 mb-2" }, "Government STU"),
                                React.createElement("h3", { className: "text-lg font-bold text-slate-900 mb-2" }, "MSRTC Shivneri Premium"),
                                React.createElement("p", { className: "text-xs text-slate-600 leading-relaxed" }, "High-frequency express connectivity along Mumbai-Pune and interstate Maharashtra corridors with Scania Metrolink coaches.")),
                            React.createElement("div", { className: "bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow" },
                                React.createElement("div", { className: "w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold mb-5" },
                                    React.createElement(Award, { className: "w-6 h-6" })),
                                React.createElement("div", { className: "inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200 mb-2" }, "Private Luxury Fleet"),
                                React.createElement("h3", { className: "text-lg font-bold text-slate-900 mb-2" }, "Royal Star & Zingbus Sleeper"),
                                React.createElement("p", { className: "text-xs text-slate-600 leading-relaxed" }, "Premium 2+1 full-flat air conditioned sleeper berths with clean linens, individual USB ports, air purification, and GPS tracking."))))),
                React.createElement("section", { className: "py-20 bg-slate-50" },
                    React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" },
                        React.createElement("div", { className: "text-center max-w-2xl mx-auto mb-14" },
                            React.createElement("h2", { className: "text-3xl font-extrabold text-slate-900 tracking-tight" }, "Popular Interstate Bus Corridors"),
                            React.createElement("p", { className: "text-sm text-slate-500 mt-2" }, "Reserve seats on high-frequency daily routes with instant confirmation.")),
                        React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" }, [
                            { from: 'Bengaluru', to: 'Mysuru', duration: '3h 15m', fare: '₹380', buses: '14 Buses Daily' },
                            { from: 'Mumbai', to: 'Pune', duration: '3h 30m', fare: '₹520', buses: '22 Buses Daily' },
                            { from: 'Bengaluru', to: 'Hyderabad', duration: '8h 45m', fare: '₹1,150', buses: '8 Sleeper Coaches' },
                            { from: 'Delhi', to: 'Jaipur', duration: '5h 15m', fare: '₹620', buses: '12 Buses Daily' },
                            { from: 'Mumbai', to: 'Goa', duration: '11h 30m', fare: '₹1,350', buses: '6 Luxury Sleepers' },
                            { from: 'Chennai', to: 'Coimbatore', duration: '8h 00m', fare: '₹890', buses: '10 Buses Daily' },
                        ].map((route, idx) => (React.createElement("div", { key: idx, onClick: () => handleSearch(route.from, route.to, searchDate), className: "bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group" },
                            React.createElement("div", { className: "flex items-center justify-between mb-3" },
                                React.createElement("span", { className: "text-xs font-bold text-slate-500" }, route.duration),
                                React.createElement("span", { className: "text-sm font-mono font-bold text-blue-700" },
                                    "From ",
                                    route.fare)),
                            React.createElement("div", { className: "flex items-center gap-2 text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors" },
                                React.createElement("span", null, route.from),
                                React.createElement(ArrowRight, { className: "w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" }),
                                React.createElement("span", null, route.to)),
                            React.createElement("div", { className: "text-xs text-slate-400 mt-2" }, route.buses))))))),
                React.createElement("footer", { className: "bg-slate-950 text-slate-400 py-16 border-t border-slate-800" },
                    React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" },
                        React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800" },
                            React.createElement("div", null,
                                React.createElement("div", { className: "flex items-center gap-2 text-white font-extrabold text-xl mb-3" },
                                    React.createElement(BusIcon, { className: "w-6 h-6 text-blue-500" }),
                                    React.createElement("span", null, "GoBus Intercity")),
                                React.createElement("p", { className: "text-xs text-slate-400 leading-relaxed" }, "College Project Prototype for an enterprise bus reservation system with Government and Private multi-tenant fleet isolation.")),
                            React.createElement("div", null,
                                React.createElement("h4", { className: "text-xs font-bold uppercase tracking-wider text-slate-200 mb-3" }, "Passenger Booking"),
                                React.createElement("ul", { className: "space-y-2 text-xs" },
                                    React.createElement("li", null,
                                        React.createElement("button", { onClick: () => setActivePage('search-results'), className: "hover:text-white transition-colors cursor-pointer" }, "Search Intercity Routes")),
                                    React.createElement("li", null,
                                        React.createElement("button", { onClick: () => setActivePage('user-dashboard'), className: "hover:text-white transition-colors cursor-pointer" }, "Manage Boarding Pass")),
                                    React.createElement("li", null,
                                        React.createElement("button", { onClick: () => setActivePage('user-dashboard'), className: "hover:text-white transition-colors cursor-pointer" }, "Cancellation Refunds")))),
                            React.createElement("div", null,
                                React.createElement("h4", { className: "text-xs font-bold uppercase tracking-wider text-slate-200 mb-3" }, "Project Tools"),
                                React.createElement("ul", { className: "space-y-2 text-xs" },
                                    React.createElement("li", null,
                                        React.createElement("button", { onClick: () => setActivePage('code-inspector'), className: "text-amber-400 hover:text-amber-300 font-semibold cursor-pointer" }, "Source Code Inspector")),
                                    React.createElement("li", null,
                                        React.createElement("button", { onClick: () => setActivePage('java-guide'), className: "text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer" }, "VS Code Live Server Guide")),
                                    React.createElement("li", null,
                                        React.createElement("a", { href: "/standalone/gobus-all-in-one.html", target: "_blank", rel: "noreferrer", className: "text-slate-300 hover:text-white" }, "All-In-One HTML File \u2197"))))),
                        React.createElement("div", { className: "pt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500" },
                            React.createElement("div", null, "\u00A9 2026 GoBus Transport Systems Inc. All rights reserved."),
                            React.createElement("div", { className: "flex items-center gap-4" },
                                React.createElement("span", null, "Clean Architecture"),
                                React.createElement("span", null, "\u00B7"),
                                React.createElement("span", null, "Separated Roles"),
                                React.createElement("span", null, "\u00B7"),
                                React.createElement("span", null, "Ready for Spring Boot / MySQL")))))));
        })()));
}
__exports.default = App;

});
