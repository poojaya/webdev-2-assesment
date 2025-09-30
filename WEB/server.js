require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// Optional: expose API base to the browser so you don't hard-code it
app.get('/config.js', (req, res) => {
  res.type('application/javascript')
     .send(`window.CONFIG=${JSON.stringify({API_BASE: process.env.API_BASE || 'http://localhost:3060/api'})}`);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`WEB listening on ${PORT}`));
