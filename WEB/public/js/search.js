const API = 'http://localhost:3060/api';
const categorySelect = document.getElementById('category');
const form = document.getElementById('searchForm');
const results = document.getElementById('results');

async function loadCategories() {
  const res = await fetch(`${API}/categories`);
  const cats = await res.json();
  categorySelect.innerHTML = `<option value="">All categories</option>` +
    cats.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const params = new URLSearchParams();
  const d = form.date.value.trim();
  const city = form.city.value.trim();
  const cat = form.category.value;
  if (d) params.append('date', d);
  if (city) params.append('city', city);
  if (cat) params.append('category', cat);

  results.textContent = 'Searching...';
  try {
    const res = await fetch(`${API}/events/search?${params}`);
    const events = await res.json();
    results.innerHTML = '';
    if (!events.length) { results.textContent = 'No matches.'; return; }
    events.forEach(ev => {
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `
        <strong>${ev.title}</strong> — ${ev.city}
        <div><a href="event.html?id=${ev.event_id}">Details</a></div>
      `;
      results.appendChild(div);
    });
  } catch {
    results.textContent = 'Search failed.';
  }
});

document.getElementById('clearBtn').addEventListener('click', () => {
  form.reset();
  results.innerHTML = '';
});

document.addEventListener('DOMContentLoaded', loadCategories);
