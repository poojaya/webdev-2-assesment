const API_BASE = 'http://localhost:3060/api';

function toMySQLDateTime(localValue) {
  // localValue from <input type="datetime-local"> is "YYYY-MM-DDTHH:MM"
  if (!localValue) return null;
  // Build a Date and format "YYYY-MM-DD HH:MM:SS"
  const d = new Date(localValue);
  const pad = (n)=> String(n).padStart(2,'0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
}

function numberOrNull(v) {
  if (v === '' || v == null) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

async function handleCreate(ev) {
  ev.preventDefault();
  const msg = document.getElementById('msg');
  msg.textContent = '';

  const org_id       = document.getElementById('org_id').value;
  const category_id  = document.getElementById('category_id').value;
  const title        = document.getElementById('title').value.trim();
  const start_local  = document.getElementById('start_datetime').value;
  const end_local    = document.getElementById('end_datetime').value;

  if (!org_id || !category_id || !title || !start_local) {
    msg.textContent = 'Please fill required fields (organisation, category, title, start date/time).';
    msg.style.color = 'red';
    return;
  }

  const start_datetime = toMySQLDateTime(start_local);
  const end_datetime   = end_local ? toMySQLDateTime(end_local) : null;

  if (end_datetime && new Date(end_local) < new Date(start_local)) {
    msg.textContent = 'End date/time must be after start date/time.';
    msg.style.color = 'red';
    return;
  }

  const payload = {
    org_id: Number(org_id),
    category_id: Number(category_id),
    title,
    description: document.getElementById('description').value.trim() || null,
    start_datetime,
    end_datetime,
    venue: document.getElementById('venue').value.trim() || null,
    city: document.getElementById('city').value.trim() || null,
    state: document.getElementById('state').value.trim() || null,
    country: document.getElementById('country').value.trim() || null,
    capacity: numberOrNull(document.getElementById('capacity').value),
    ticket_price: numberOrNull(document.getElementById('ticket_price').value),
    goal_amount: numberOrNull(document.getElementById('goal_amount').value),
  };

  try {
    const res = await fetch(`${API_BASE}/events`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });

    const text = await res.text(); // capture any error body
    let data = {};
    try { data = JSON.parse(text); } catch {}

    if (!res.ok) {
      msg.textContent = data.error ? `Server error: ${data.error}` : `Server error (${res.status})`;
      msg.style.color = 'red';
      return;
    }

    // success: redirect to detail
    location.href = `/event.html?id=${data.event_id}`;
  } catch (e) {
    msg.textContent = `Network/JS error: ${e.message}`;
    msg.style.color = 'red';
  }
}

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('create-form').addEventListener('submit', handleCreate);
});
