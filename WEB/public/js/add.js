const API_BASE = 'http://localhost:3060/api';

document.getElementById('eventForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const msg = document.getElementById('msg');
  msg.textContent = '';

  const body = {
    org_id: Number(document.getElementById('org_id').value),
    category_id: Number(document.getElementById('category_id').value),
    title: document.getElementById('title').value.trim(),
    description: document.getElementById('description').value.trim(),
    start_datetime: document.getElementById('start_datetime').value.trim(),
    end_datetime: document.getElementById('end_datetime').value.trim() || null,
    city: document.getElementById('city').value.trim(),
    venue: document.getElementById('venue').value.trim(),
    status: document.getElementById('status').value.trim() || 'ACTIVE'
  };

  if (!body.org_id || !body.category_id || !body.title || !body.start_datetime) {
    msg.textContent = 'Please fill required fields';
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      const err = await res.json().catch(()=>({}));
      throw new Error(err.error || `HTTP ${res.status}`);
    }
    const data = await res.json();
    msg.textContent = `Created with id ${data.event_id}`;
    document.getElementById('eventForm').reset();
  } catch (err) {
    console.error(err);
    msg.textContent = `Error: ${err.message}`;
  }
});
