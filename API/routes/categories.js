const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT category_id AS id, name FROM categories ORDER BY name');
    res.json(rows);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
