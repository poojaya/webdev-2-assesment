// /WEB/public/js/home.js
const API_BASE = (window.API_BASE) || 'http://localhost:3060/api';

function fmtDate(iso){ return new Date(iso).toLocaleString(); }

(async function loadHome(){
  // only ACTIVE and starting after "now"
  const now = new Date().toISOString();
  const res = await fetch(`${API_BASE}/events?after=${encodeURIComponent(now)}&active=1`);
  const rows = await res.json();

  const el = document.getElementById('home-list');
  if (!rows.length) { el.textContent = 'No upcoming events.'; return; }

  el.innerHTML = `<ul>` + rows.map(e => `
    <li>
      <strong>${e.title}</strong> — ${fmtDate(e.start_datetime)} · ${e.city ?? '-'}
      <br><small>${e.category_name} · ${e.org_name}</small>
      <br><a href="/event.html?id=${e.event_id}">View details</a>
    </li>
  `).join('') + `</ul>`;
})();
