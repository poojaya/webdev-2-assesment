const API_BASE = 'http://localhost:3060/api';

const form = document.getElementById('searchForm');
const resultsDiv = document.getElementById('results');
const categorySelect = document.getElementById('category');

// Populate categories dropdown
fetch(`${API_BASE}/categories`)
  .then(res => res.json())
  .then(categories => {
    categorySelect.innerHTML = `<option value="">All Categories</option>` +
      categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
  });

form.addEventListener('submit', e => {
  e.preventDefault();
  const params = new URLSearchParams();
  if (form.date.value) params.append('date', form.date.value);
  if (form.city.value) params.append('city', form.city.value);
  if (form.category.value) params.append('category', form.category.value);

  fetch(`${API_BASE}/events/search?${params.toString()}`)
    .then(res => res.json())
    .then(events => {
      resultsDiv.innerHTML = '';
      if(!events.length) {
        resultsDiv.textContent = 'No matching events found';
        return;
      }
      events.forEach(ev => {
        const div = document.createElement('div');
        div.innerHTML = `<strong>${ev.title}</strong> in ${ev.city} - <a href="event.html?id=${ev.event_id}">Details</a>`;
        resultsDiv.appendChild(div); 
      });
    })
    .catch(() => resultsDiv.textContent = 'Search failed.');
});

// Clear button functionality
document.getElementById('clearBtn').addEventListener('click', () => {
  form.reset();
  resultsDiv.innerHTML = '';
});
