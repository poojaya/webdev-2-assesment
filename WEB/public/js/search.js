// /WEB/public/js/search.js
const API = 'http://localhost:3060/api';

function card(e) {
  const date = new Date(e.start_datetime).toLocaleString();
  return `
    <div class="card">
      <h3>${e.title}</h3>
      <p>${e.category_name} • ${e.org_name}</p>
      <p>${e.city || '-'} • ${date}</p>
      <p><a href="/event.html?id=${e.event_id}" class="link">View details</a></p>
    </div>
  `;
}

async function loadCategories() {
  const sel = document.getElementById('category');
  const res = await fetch(`${API}/categories`);
  const cats = await res.json();
  sel.innerHTML = `<option value="">Any category</option>` +
    cats.map(c => `<option value="${c.category_id}">${c.name}</option>`).join('');
}

async function performSearch(ev) {
  ev?.preventDefault();
  const q = document.getElementById('q').value.trim();
  const category = document.getElementById('category').value;
  const city = document.getElementById('city').value.trim();
  const date = document.getElementById('date').value; // yyyy-mm-dd

  const params = new URLSearchParams();
  if (q) params.set('q', q);
  if (category) params.set('category', category);
  if (city) params.set('city', city);
  if (date) params.set('date', date);

  const res = await fetch(`${API}/events?` + params.toString());
  const data = await res.json();

  const list = document.getElementById('results');
  list.innerHTML = data.length
    ? data.map(card).join('')
    : `<p>No results found.</p>`;
}

window.addEventListener('DOMContentLoaded', async () => {
  await loadCategories();
  await performSearch(); // initial
  document.getElementById('searchForm').addEventListener('submit', performSearch);
});
