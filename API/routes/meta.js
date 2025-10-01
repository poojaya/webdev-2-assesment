// /API/routes/meta.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/categories', async (_req, res) => {
  const rows = await db.query('SELECT category_id, name FROM categories ORDER BY name');
  res.json(rows);
});

router.get('/orgs', async (_req, res) => {
  const rows = await db.query('SELECT org_id, name FROM organisations ORDER BY name');
  res.json(rows);
});

module.exports = router;
