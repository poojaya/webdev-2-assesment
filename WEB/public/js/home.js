const API_BASE = 'http://localhost:3060/api';

fetch(`${API_BASE}/events`)
  .then(resp => resp.json())
  .then(events => {
    const listEl = document.getElementById('events-list');
    if (!events.length) {
      listEl.textContent = 'No events found';
      return;
    }
    events.forEach(ev => {
      const p = document.createElement('p');
      p.innerHTML = `<strong>${ev.title}</strong> in ${ev.city} - <a href="event.html?id=${ev.event_id}">Details</a>`;
      listEl.appendChild(p);
    });
  })
  .catch(err => {
    console.error(err);
    document.getElementById('events-list').textContent = 'Failed to load events.';
  });
