// WEB/server.js
const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));                 // serve /public

// send index.html when hitting /
app.get('/', (_req, res) => res.sendFile(__dirname + '/public/index.html'));

app.listen(PORT, () => console.log(`WEB listening on ${PORT}`));
