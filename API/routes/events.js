const express = require('express');
const router = express.Router();
const db = require('../db');

// Home: current/upcoming and not suspended
router.get('/', async (_req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT e.*, c.name AS category_name, o.name AS org_name
      FROM events e
      JOIN categories c ON c.category_id=e.category_id
      JOIN organisations o ON o.org_id=e.org_id
      WHERE e.status='ACTIVE' AND e.start_datetime >= DATE_SUB(NOW(), INTERVAL 1 DAY)
      ORDER BY e.start_datetime ASC
    `);
    res.json(rows);
  } catch (e) { res.status(500).json({error:'Error fetching events'}); }
});

// Search by date (YYYY-MM-DD), city (LIKE), category id
router.get('/search', async (req, res) => {
  try {
    const { date, city, category } = req.query;
    let sql = `
      SELECT e.*, c.name AS category_name, o.name AS org_name
      FROM events e
      JOIN categories c ON c.category_id=e.category_id
      JOIN organisations o ON o.org_id=e.org_id
      WHERE e.status='ACTIVE'
    `;
    const args = [];
    if (date) { sql += ' AND DATE(e.start_datetime)=?'; args.push(date); }
    if (city) { sql += ' AND e.city LIKE ?'; args.push(`%${city}%`); }
    if (category) { sql += ' AND e.category_id=?'; args.push(category); }
    sql += ' ORDER BY e.start_datetime ASC';
    const [rows] = await db.query(sql, args);
    res.json(rows);
  } catch (e) { res.status(500).json({error:'Search failed'}); }
});

// Details
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT e.*, c.name AS category_name, o.name AS org_name
      FROM events e
      JOIN categories c ON c.category_id=e.category_id
      JOIN organisations o ON o.org_id=e.org_id
      WHERE e.event_id=?`, [req.params.id]);
    if (!rows.length) return res.status(404).json({error:'Event not found'});
    res.json(rows[0]);
  } catch (e) { res.status(500).json({error:'Error fetching event'}); }
});

module.exports = router;
