const API = 'http://localhost:3060/api';
const id = new URLSearchParams(location.search).get('id');
const container = document.getElementById('event-detail');

async function loadEvent() {
  if (!id) { container.textContent = 'No event id.'; return; }
  try {
    const res = await fetch(`${API}/events/${id}`);
    if (!res.ok) { container.textContent = 'Event not found.'; return; }
    const e = await res.json();
    container.innerHTML = `
      <h2>${e.title}</h2>
      <p>${e.description || ''}</p>
      <p><strong>When:</strong> ${new Date(e.start_datetime).toLocaleString()}</p>
      <p><strong>Where:</strong> ${e.venue || ''}, ${e.city || ''}</p>
      <p><strong>Category:</strong> ${e.category_name} • <strong>Price:</strong> ${Number(e.price).toFixed(2)}</p>
      <p><strong>Goal:</strong> $${Number(e.goal_amount).toFixed(2)} • <strong>Raised:</strong> $${Number(e.raised_amount).toFixed(2)}</p>
      <button id="registerBtn">Register</button>
    `;
    document.getElementById('registerBtn').onclick = () => alert('This feature is currently under construction.');
  } catch {
    container.textContent = 'Failed to load details.';
  }
}
document.addEventListener('DOMContentLoaded', loadEvent);
