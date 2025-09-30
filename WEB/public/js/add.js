const API_BASE = (window.API_BASE) || 'http://localhost:3060/api';

function val(id) { return document.getElementById(id).value.trim(); }
function isoOrNull(id) {
  const v = val(id);
  return v ? new Date(v).toISOString() : null;
}

async function create(ev) {
  ev.preventDefault();
  const msg = document.getElementById('msg');
  msg.textContent = '';

  // Required fields
  const org_id = parseInt(val('org_id'), 10);
  const category_id = parseInt(val('category_id'), 10);
  const title = val('title');
  const start_local = val('start_datetime');

  if (!org_id || !category_id || !title || !start_local) {
    msg.textContent = 'Please fill Organisation, Category, Title and Start date/time.';
    return;
  }

  const payload = {
    org_id,
    category_id,
    title,
    description: val('description') || null,
    start_datetime: new Date(start_local).toISOString(),
    end_datetime: isoOrNull('end_datetime'),
    venue: val('venue') || null,
    city: val('city') || null,
    state: val('state') || null,
    country: val('country') || null,
    capacity: val('capacity') ? Number(val('capacity')) : null,
    ticket_price: val('ticket_price') ? Number(val('ticket_price')) : null,
    goal_amount: val('goal_amount') ? Number(val('goal_amount')) : 0
  };

  try {
    const res = await fetch(`${API_BASE}/events`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const err = await res.json().catch(()=>({}));
      throw new Error(err.error || `HTTP ${res.status}`);
    }

    const created = await res.json();
    location.href = `/event.html?id=${created.event_id}`;
  } catch (e) {
    msg.textContent = e.message || 'Failed to create event';
  }
}

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('add-form').addEventListener('submit', create);
});
