/**
 * GoBus Dashboard Controller - dashboard.js
 * Handles Operator & Admin portal interactions, table search/filter, and CRUD operations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Table search filter
  const tableSearchInput = document.getElementById('tableSearchInput');
  if (tableSearchInput) {
    tableSearchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      const rows = document.querySelectorAll('.data-table tbody tr');
      rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(term) ? '' : 'none';
      });
    });
  }

  // Operator Login Form Handler
  const operatorLoginForm = document.getElementById('operatorLoginForm');
  if (operatorLoginForm) {
    operatorLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('operatorEmail')?.value || '';
      const isGovt = email.includes('gov') || email.includes('ksrtc') || email.includes('msrtc');
      
      sessionStorage.setItem('gobus_operator_session', JSON.stringify({
        name: isGovt ? 'KSRTC State Transport' : 'Royal Star Luxury Travels',
        type: isGovt ? 'government' : 'private',
        badge: isGovt ? 'Government State Transport (STU)' : 'Private Luxury Fleet',
        role: 'operator'
      }));
      window.location.href = 'operator-dashboard.html';
    });
  }

  // Admin Login Form Handler
  const adminLoginForm = document.getElementById('adminLoginForm');
  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      sessionStorage.setItem('gobus_admin_session', JSON.stringify({
        name: 'Platform Super Administrator',
        role: 'admin'
      }));
      window.location.href = 'admin-dashboard.html';
    });
  }
});
