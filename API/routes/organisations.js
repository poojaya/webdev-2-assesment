const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (_req, res) => {
  try {
    const [rows] = await db.query('SELECT org_id, name FROM organisations ORDER BY name');
    res.json(rows);
  } catch (e) { res.status(500).json({error:'Error fetching organisations'}); }
});

module.exports = router;
