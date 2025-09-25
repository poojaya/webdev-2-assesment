const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/categories', require('./routes/categories'));
app.use('/api/events', require('./routes/events'));
app.use('/api/organisations', require('./routes/organisations'));

const PORT = process.env.PORT || 3060;
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
