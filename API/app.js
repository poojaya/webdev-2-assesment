require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ origin: 'http://localhost:8080' })); // web app origin
app.use(express.json());

app.use('/api/events', require('./routes/events')); // your events router
// (add other routers: /api/categories, /api/organisations if needed)

app.get('/api/health', (_,res)=>res.json({ok:true}));
const PORT = process.env.PORT || 3060;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));
