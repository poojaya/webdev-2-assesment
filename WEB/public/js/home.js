const API_BASE = 'http://localhost:3060/api';
fetch(`${API_BASE}/events`)
  .then(res => res.json())
  .then(events => {
    const wrap = document.getElementById('events');
    if (!events.length) {
      wrap.textContent = 'No upcoming events';
      return;
    }
    events.forEach(ev => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${ev.title}</h3>
        <p>${ev.category_id} • ${ev.city}</p>
        <a href="/event.html?id=${ev.event_id}">View details</a>
      `;
      wrap.appendChild(card);      
    });
  });
