const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

const categories = require('./routes/categories');
const events = require('./routes/events');
const organisations = require('./routes/organisations');

app.use('/api/categories', categories);
app.use('/api/events', events);
app.use('/api/organisations', organisations);

const PORT = process.env.PORT || 3060;
app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
