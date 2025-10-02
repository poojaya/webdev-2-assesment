const API_BASE = 'http://localhost:3060/api';

function currency(n) {
  if (n == null) return '-';
  return Number(n).toLocaleString(undefined, { style: 'currency', currency: 'AUD' });
}
function fmt(iso) {
  if (!iso) return '-';
  return new Date(iso).toLocaleString();
}

async function loadEvent() {
  const id = new URLSearchParams(location.search).get('id');
  const container = document.getElementById('event-detail');
  if (!id) {
    container.textContent = 'Missing id';
    return;
  }
  try {
    const res = await fetch(`${API_BASE}/events/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const e = await res.json();

    container.innerHTML = `
      <h1>${e.title}</h1>
      <p><b>When:</b> ${fmt(e.start_datetime)} ${e.end_datetime ? ' – ' + fmt(e.end_datetime) : ''}</p>
      <p><b>Where:</b> ${[e.venue, e.city, e.state, e.country].filter(Boolean).join(', ')}</p>
      <p><b>Category:</b> ${e.category_name} · <b>Organisation:</b> ${e.org_name}</p>
      <p><b>Ticket:</b> ${currency(e.ticket_price)}</p>
      <p><b>Goal:</b> ${currency(e.goal_amount)} · <b>Raised:</b> ${currency(e.raised_amount)}</p>
      <p>${e.description ?? ''}</p>
    `;
  } catch (err) {
    container.innerHTML = `<span style="color:red">Failed to load: ${err.message}</span>`;
  }
}

window.addEventListener('DOMContentLoaded', loadEvent);
