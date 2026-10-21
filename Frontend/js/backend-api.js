(function (global) {
  'use strict';

  const SESSION_KEY = 'gobus_backend_session_v1';
  const USER_KEY = 'gobus_current_user_v1';
  const apiBase = global.GOBUS_API_BASE_URL ||
    `${global.location.protocol}//${global.location.hostname}:8080/api`;

  function clearSession() {
    global.localStorage.removeItem(SESSION_KEY);
    global.localStorage.removeItem(USER_KEY);
  }

  async function request(path, options) {
    const settings = options || {};
    const headers = Object.assign(
      { 'Content-Type': 'application/json' },
      settings.headers || {}
    );
    const sessionId = global.localStorage.getItem(SESSION_KEY);
    if (sessionId) headers['X-Session-Id'] = sessionId;

    let response;
    try {
      response = await global.fetch(`${apiBase}${path}`, Object.assign(
        {},
        settings,
        { headers }
      ));
    } catch (error) {
      throw new Error('Cannot reach the GoBus backend. Start the Java API server and try again.');
    }

    let body;
    try {
      body = await response.json();
    } catch (error) {
      throw new Error(`The GoBus backend returned an invalid response (${response.status}).`);
    }
    if (response.status === 401) clearSession();
    if (!response.ok || body.success === false) {
      throw new Error(body.error || `Backend request failed (${response.status}).`);
    }
    return body.data;
  }

  function userFromSession(data) {
    const user = data && data.user;
    if (!data || !data.sessionId || !user) {
      throw new Error('The backend returned an incomplete sign-in response.');
    }
    global.localStorage.setItem(SESSION_KEY, data.sessionId);
    const currentUser = {
      id: user.userId,
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      role: user.role,
      operatorId: user.operatorId || undefined,
      operatorType: user.operatorType || undefined
    };
    global.localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
    return currentUser;
  }

  global.GoBusApi = {
    hasSession() {
      return Boolean(global.localStorage.getItem(SESSION_KEY));
    },
    async login(email, password, expectedRole) {
      const user = userFromSession(await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      }));
      if (expectedRole && user.role !== expectedRole) {
        await this.logout();
        throw new Error(`This account is not authorized for the ${expectedRole} portal.`);
      }
      return user;
    },
    async register(name, email, phone, password) {
      return userFromSession(await request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, phone, password })
      }));
    },
    async logout() {
      try {
        if (this.hasSession()) {
          await request('/auth/session', { method: 'DELETE' });
        }
      } finally {
        clearSession();
      }
    },
    async searchTrips(source, destination, date) {
      const query = new URLSearchParams({ source, destination, date });
      return request(`/trips/search?${query.toString()}`, { method: 'GET' });
    },
    async getSeats(scheduleId, date) {
      const query = new URLSearchParams({ scheduleId, date });
      return request(`/seats?${query.toString()}`, { method: 'GET' });
    },
    async createBooking(booking) {
      return request('/bookings', {
        method: 'POST',
        body: JSON.stringify(booking)
      });
    },
    async createPaymentOrder(pnr) {
      return request('/payments/orders', {
        method: 'POST',
        body: JSON.stringify({ pnr })
      });
    },
    async getPaymentConfiguration() {
      return request('/payments/config', { method: 'GET' });
    },
    async verifyPayment(pnr, payment) {
      return request('/payments/verify', {
        method: 'POST',
        body: JSON.stringify(Object.assign({ pnr }, payment))
      });
    },
    async getBookings() {
      return request('/bookings', { method: 'GET' });
    },
    async getAdminBuses() {
      return request('/admin/buses', { method: 'GET' });
    },
    async getAdminBookings() {
      return request('/admin/bookings', { method: 'GET' });
    },
    async getAdminReports() {
      return request('/admin/reports', { method: 'GET' });
    },
    async getAdminOperators() {
      return request('/admin/operators', { method: 'GET' });
    },
    async updateOperatorStatus(operatorId, status) {
      return request(`/admin/operators/${encodeURIComponent(operatorId)}/status`, {
        method: 'POST',
        body: JSON.stringify({ status })
      });
    },
    async updateBusStatus(busId, status) {
      return request(`/admin/buses/${encodeURIComponent(busId)}/status`, {
        method: 'POST',
        body: JSON.stringify({ status })
      });
    },
    async updateOperatorBusStatus(busId, status) {
      return request(`/operator/buses/${encodeURIComponent(busId)}/status`, {
        method: 'POST',
        body: JSON.stringify({ status })
      });
    },
    async getOperatorBuses() {
      return request('/operator/buses', { method: 'GET' });
    },
    async getOperatorBookings() {
      return request('/operator/bookings', { method: 'GET' });
    },
    async getOperatorRoutes() {
      return request('/operator/routes', { method: 'GET' });
    },
    async getOperatorSchedules() {
      return request('/operator/schedules', { method: 'GET' });
    },
    async registerOperatorBus(bus) {
      return request('/operator/buses', {
        method: 'POST',
        body: JSON.stringify(bus)
      });
    },
    async cancelBooking(pnr) {
      return request(`/bookings/${encodeURIComponent(pnr)}/cancel`, {
        method: 'POST',
        body: '{}'
      });
    }
  };
})(window);
