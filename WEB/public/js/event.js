const API_BASE = 'http://localhost:3060/api';
const params = new URLSearchParams(window.location.search);
const eventId = params.get('id');
const detailDiv = document.getElementById('event-detail');

if (!eventId) {
  detailDiv.textContent = 'Event ID not provided.';
} else {
  fetch(`${API_BASE}/events/${eventId}`)
    .then(res => res.json())
    .then(event => {
      detailDiv.innerHTML = `
        <h2>${event.title}</h2>
        <p>${event.description || ''}</p>
        <p><strong>Location:</strong> ${event.city || ''}</p>
        <p><strong>Date:</strong> ${new Date(event.start_datetime).toLocaleString()}</p>
        <button id="registerBtn">Register</button>
      `;
      document.getElementById('registerBtn').addEventListener('click', () => {
        alert('This feature is currently under construction.');
      });
    })
    .catch(() => {
      detailDiv.textContent = 'Failed to load event details.';
    });
}
