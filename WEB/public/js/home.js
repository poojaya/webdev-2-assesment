const API = 'http://localhost:3060/api';

async function loadHome() {
  const list = document.getElementById('events-list');
  list.textContent = 'Loading...';
  try {
    const resp = await fetch(`${API}/events`);
    const events = await resp.json();
    list.innerHTML = '';
    if (!events.length) { list.textContent = 'No upcoming events.'; return; }
    events.forEach(ev => {
      const card = document.createElement('div');
      const date = new Date(ev.start_datetime).toLocaleString();
      card.className = 'card';
      card.innerHTML = `
        <h3>${ev.title}</h3>
        <p>${ev.category_name} • ${ev.city} • ${date}</p>
        <a href="event.html?id=${ev.event_id}">View details</a>
      `;
      list.appendChild(card);
    });
  } catch {
    list.textContent = 'Failed to load events.';
  }
}
document.addEventListener('DOMContentLoaded', loadHome);
