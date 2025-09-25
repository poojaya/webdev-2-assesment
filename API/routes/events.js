const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM events WHERE status <> "SUSPENDED"');
    res.json(rows);
  } catch (err) {
    res.status(500).send('Error fetching events');
  }
});

router.get('/search', async (req, res) => {
  try {
    const { date, city, category } = req.query;
    let sql = 'SELECT * FROM events WHERE status <> "SUSPENDED"';
    let args = [];
    if (date) { sql += ' AND DATE(start_datetime)=?'; args.push(date); }
    if (city) { sql += ' AND city LIKE ?'; args.push(`%${city}%`); }
    if (category) { sql += ' AND category_id=?'; args.push(category); }
    const [rows] = await db.query(sql, args);
    res.json(rows);
  } catch (err) {
    res.status(500).send('Search failed');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM events WHERE event_id=?', [req.params.id]);
    if (!rows.length) return res.status(404).send('Event not found');
    res.json(rows[0]);
  } catch (err) {
    res.status(500).send('Error fetching event');
  }
});

module.exports = router;
