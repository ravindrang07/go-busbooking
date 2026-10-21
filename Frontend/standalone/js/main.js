/**
 * GoBus Client-side Controller - main.js
 * Handles passenger search, interactive seat selection, checkout, and demo authentication.
 * Ready for future Java REST API endpoint replacement.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Search Form Submission Handler
  const searchForm = document.getElementById('searchBusForm');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const source = document.getElementById('sourceCity')?.value || 'Bengaluru';
      const destination = document.getElementById('destCity')?.value || 'Mysuru';
      const date = document.getElementById('travelDate')?.value || new Date().toISOString().split('T')[0];
      
      // Store in session and redirect to search results
      sessionStorage.setItem('gobus_search_query', JSON.stringify({ source, destination, date }));
      window.location.href = 'search-results.html';
    });
  }

  // 2. Interactive Seat Selection
  const seatButtons = document.querySelectorAll('.seat-available');
  const selectedSeatsList = document.getElementById('selectedSeatsDisplay');
  const totalPriceDisplay = document.getElementById('totalPriceDisplay');
  const proceedBtn = document.getElementById('proceedToPayBtn');
  
  let selectedSeats = [];
  const seatPrice = 550; // Demo unit price

  seatButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const seatId = btn.getAttribute('data-seat-id') || btn.innerText.trim();
      
      if (selectedSeats.includes(seatId)) {
        selectedSeats = selectedSeats.filter(s => s !== seatId);
        btn.classList.remove('seat-selected');
      } else {
        if (selectedSeats.length >= 6) {
          alert('Maximum 6 seats can be selected per booking.');
          return;
        }
        selectedSeats.push(seatId);
        btn.classList.add('seat-selected');
      }

      if (selectedSeatsList) {
        selectedSeatsList.innerText = selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None selected';
      }
      if (totalPriceDisplay) {
        totalPriceDisplay.innerText = `₹${selectedSeats.length * seatPrice}`;
      }
      if (proceedBtn) {
        proceedBtn.disabled = selectedSeats.length === 0;
      }
    });
  });

  // 3. Passenger Login Form Handler
  const passengerLoginForm = document.getElementById('passengerLoginForm');
  if (passengerLoginForm) {
    passengerLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Demo simulated authentication
      const email = document.getElementById('loginEmail')?.value;
      sessionStorage.setItem('gobus_user_session', JSON.stringify({
        name: 'Rahul Sharma',
        email: email || 'rahul.sharma@example.com',
        role: 'passenger'
      }));
      window.location.href = 'user-dashboard.html';
    });
  }
});
