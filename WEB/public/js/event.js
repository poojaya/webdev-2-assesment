// /WEB/public/js/event.js
const API_BASE = 'http://localhost:3060/api';

function fmtDateTime(iso) {
  if (!iso) return '-';
  const d = new Date(iso);
  return d.toLocaleString();
}

function currency(n) {
  if (n == null) return '-';
  return Number(n).toLocaleString(undefined, { style: 'currency', currency: 'AUD' });
}

async function loadEvent() {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  if (!id) {
    document.getElementById('event-detail').innerHTML = '<p>No event id.</p>';
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/events/${id}`);
    if (!res.ok) throw new Error('Failed to load');
    const e = await res.json();

    const prog = e.goal_amount ? Math.min(100, Math.round((Number(e.raised_amount || 0) / Number(e.goal_amount)) * 100)) : 0;

    document.getElementById('event-detail').innerHTML = `
      <h1>${e.title}</h1>
      <p>${e.description || ''}</p>

      <h3>Details</h3>
      <ul>
        <li><strong>Category:</strong> ${e.category_name}</li>
        <li><strong>Organisation:</strong> ${e.org_name}</li>
        <li><strong>When:</strong> ${fmtDateTime(e.start_datetime)} — ${fmtDateTime(e.end_datetime)}</li>
        <li><strong>Where:</strong> ${[e.venue, e.city, e.state, e.country].filter(Boolean).join(', ') || '-'}</li>
        <li><strong>Capacity:</strong> ${e.capacity ?? '-'}</li>
        <li><strong>Ticket price:</strong> ${currency(e.ticket_price)}</li>
      </ul>

      <h3>Fundraising</h3>
      <p><strong>Goal:</strong> ${currency(e.goal_amount)} &nbsp; <strong>Raised:</strong> ${currency(e.raised_amount)} (${prog}%)</p>
      <div style="background:#eee;height:10px;border-radius:6px;overflow:hidden">
        <div style="height:10px;width:${prog}%;background:#4caf50"></div>
      </div>

      <p style="margin-top:16px"><a href="/index.html" class="link">← Back to home</a></p>
    `;
  } catch (err) {
    console.error(err);
    document.getElementById('event-detail').innerHTML = '<p>Failed to load the event.</p>';
  }
}

window.addEventListener('DOMContentLoaded', loadEvent);
