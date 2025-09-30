// Change if your API port changes
const API_BASE = 'http://localhost:3060/api';

function fmtDateTime(iso) {
  if (!iso) return '-';
  return new Date(iso).toLocaleString();
}

function buildQueryFromForm(form) {
  const p = new URLSearchParams();
  ['q','category','org','city','state','date','after'].forEach(k => {
    const v = form[k].value.trim();
    if (v) p.append(k, v);
  });
  return p.toString();
}

async function load(query = '') {
  const url = `${API_BASE}/events${query ? `?${query}` : ''}`;
  const res = await fetch(url);
  const rows = await res.json();

  const tbody = document.querySelector('#results tbody');
  tbody.innerHTML = rows.map(e => `
    <tr>
      <td>${e.event_id}</td>
      <td><a href="/event.html?id=${e.event_id}">${e.title}</a></td>
      <td>${fmtDateTime(e.start_datetime)}</td>
      <td>${e.city ?? '-'}</td>
      <td>${e.category_name ?? e.category_id}</td>
      <td>${e.org_name ?? e.org_id}</td>
      <td>
        <button data-del="${e.event_id}">Delete</button>
      </td>
    </tr>
  `).join('');
}

async function deleteEvent(id) {
  if (!confirm(`Delete event #${id}?`)) return;
  const res = await fetch(`${API_BASE}/events/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    alert('Delete failed');
    return;
  }
  // reload with current filters
  const q = buildQueryFromForm(document.getElementById('searchForm'));
  load(q);
}

window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('searchForm');
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const q = buildQueryFromForm(form);
    load(q);
  });

  document.getElementById('clearBtn').addEventListener('click', () => {
    form.reset();
    load();
  });

  document.querySelector('#results').addEventListener('click', (e) => {
    const id = e.target?.dataset?.del;
    if (id) deleteEvent(Number(id));
  });

  load();
});
