const API_BASE = (window.API_BASE) || 'http://localhost:3060/api';

function fmtDateTime(iso) {
  if (!iso) return '-';
  const d = new Date(iso);
  return d.toLocaleString();
}
function currency(n) {
  if (n == null) return '-';
  return Number(n).toLocaleString(undefined, { style: 'currency', currency: 'AUD' });
}

async function runSearch(ev) {
  if (ev) ev.preventDefault();

  const params = new URLSearchParams();
  const q     = document.getElementById('q').value.trim();
  const cat   = document.getElementById('category').value;
  const org   = document.getElementById('org').value;
  const city  = document.getElementById('city').value.trim();
  const state = document.getElementById('state').value.trim();
  const date  = document.getElementById('date').value; // yyyy-mm-dd

  if (q) params.set('q', q);
  if (cat) params.set('category', cat);
  if (org) params.set('org', org);
  if (city) params.set('city', city);
  if (state) params.set('state', state);
  if (date) params.set('date', date);

  const res = await fetch(`${API_BASE}/events?` + params.toString());
  const rows = await res.json();
  renderTable(rows);
}

function renderTable(rows) {
  const tbody = document.getElementById('results-body');
  if (!rows.length) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center">No results</td></tr>`;
    return;
  }
  tbody.innerHTML = rows.map(e => `
    <tr>
      <td>${fmtDateTime(e.start_datetime)}</td>
      <td>${e.title}</td>
      <td>${e.category_name}</td>
      <td>${e.org_name}</td>
      <td>${[e.city, e.state].filter(Boolean).join(', ')}</td>
      <td>${currency(e.goal_amount)}</td>
      <td><a href="/event.html?id=${e.event_id}">View</a></td>
    </tr>
  `).join('');
}

async function fillSelect(id, url, valueField, textField, anyLabel) {
  const sel = document.getElementById(id);
  const res = await fetch(url);
  const rows = await res.json();
  sel.innerHTML = `<option value="">${anyLabel}</option>` +
    rows.map(r => `<option value="${r[valueField]}">${r[textField]}</option>`).join('');
}
window.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    fillSelect('category', `${API_BASE}/categories`, 'category_id', 'name', 'Any category'),
    fillSelect('org', `${API_BASE}/organisations`, 'org_id', 'name', 'Any organisation')
  ]);
  document.getElementById('search-form').addEventListener('submit', runSearch);
  document.getElementById('reset-btn').addEventListener('click', () => {
    document.getElementById('search-form').reset(); runSearch();
  });
  runSearch();
});

document.getElementById('register-btn')?.addEventListener('click', () => {
  alert('Registration is under construction for Assessment 2.');
});
