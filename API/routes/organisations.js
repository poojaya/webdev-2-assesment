const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT org_id, name FROM organisations');
    res.json(rows);
  } catch (err) {
    res.status(500).send('Error fetching organisations');
  }
});

module.exports = router;
