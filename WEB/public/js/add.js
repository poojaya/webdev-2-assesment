const API_BASE = 'http://localhost:3060/api';

function toISO(dtLocalValue) {
  // dtLocal is "YYYY-MM-DDTHH:mm"
  if (!dtLocalValue) return null;
  const dt = new Date(dtLocalValue);
  return dt.toISOString();
}

window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('addForm');
  const err = document.getElementById('err');
  const ok  = document.getElementById('ok');

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    err.textContent = '';
    ok.textContent = '';

    // Client-side validation
    const required = ['org_id', 'category_id', 'title', 'start_datetime'];
    for (const f of required) {
      if (!form[f].value.trim()) {
        err.textContent = `Missing required field: ${f}`;
        form[f].focus();
        return;
      }
    }

    const body = {
      org_id: Number(form.org_id.value),
      category_id: Number(form.category_id.value),
      title: form.title.value.trim(),
      description: form.description.value.trim() || null,
      start_datetime: toISO(form.start_datetime.value),
      end_datetime: toISO(form.end_datetime.value),
      venue: form.venue.value.trim() || null,
      city: form.city.value.trim() || null,
      state: form.state.value.trim() || null,
      country: form.country.value.trim() || null,
      capacity: form.capacity.value ? Number(form.capacity.value) : null,
      ticket_price: form.ticket_price.value ? Number(form.ticket_price.value) : null,
      goal_amount: form.goal_amount.value ? Number(form.goal_amount.value) : null
    };

    try {
      const res = await fetch(`${API_BASE}/events`, {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || `Server error (${res.status})`);
      }
      const created = await res.json();
      ok.textContent = `Created #${created.event_id} ✓`;
      setTimeout(() => location.href = `/event.html?id=${created.event_id}`, 600);
    } catch (e) {
      err.textContent = e.message;
    }
  });
});
