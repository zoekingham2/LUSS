const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const { requireAuth, optionalAuth } = require('../middleware/auth');

const router = express.Router();

const ALLOWED_SORT_FIELDS = {
  date: 'date',
  home_team: 'home_team',
  away_team: 'away_team',
  status: 'status',
  competition: 'competition',
};

function parseSort(sortParam, defaultField = 'date', defaultOrder = 'ASC') {
  const sort = Array.isArray(sortParam) ? sortParam[0] : (sortParam || '');
  const desc = sort.startsWith('-');
  const fieldKey = desc ? sort.slice(1) : sort;
  const field = ALLOWED_SORT_FIELDS[fieldKey] || defaultField;
  return { field, order: desc ? 'DESC' : 'ASC' };
}

// GET /api/matches
router.get('/', optionalAuth, (req, res) => {
  const { sort, limit } = req.query;
  const { field, order } = parseSort(sort);
  const limitStr = Array.isArray(limit) ? limit[0] : limit;
  const limitVal = limitStr ? Math.min(parseInt(limitStr, 10) || 200, 500) : 500;
  const rows = db
    .prepare(`SELECT * FROM matches ORDER BY ${field} ${order} LIMIT ?`)
    .all(limitVal);
  res.json(rows);
});

// GET /api/matches/:id
router.get('/:id', optionalAuth, (req, res) => {
  const row = db.prepare('SELECT * FROM matches WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Match not found' });
  res.json(row);
});

// POST /api/matches (admin only)
router.post('/', requireAuth, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  const { home_team, away_team, home_score, away_score, date, status, competition, venue } = req.body;
  if (!home_team || !away_team || !date) {
    return res.status(400).json({ error: 'home_team, away_team and date are required' });
  }
  const id = uuidv4();
  db.prepare(
    `INSERT INTO matches (id, home_team, away_team, home_score, away_score, date, status, competition, venue)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(id, home_team, away_team, home_score ?? null, away_score ?? null, date, status || 'Kommande', competition || 'Premier League', venue || null);
  res.status(201).json(db.prepare('SELECT * FROM matches WHERE id = ?').get(id));
});

// PUT /api/matches/:id (admin only)
router.put('/:id', requireAuth, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  const existing = db.prepare('SELECT id FROM matches WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Match not found' });

  const { home_team, away_team, home_score, away_score, date, status, competition, venue } = req.body;
  db.prepare(
    `UPDATE matches SET home_team=COALESCE(?,home_team), away_team=COALESCE(?,away_team),
     home_score=COALESCE(?,home_score), away_score=COALESCE(?,away_score),
     date=COALESCE(?,date), status=COALESCE(?,status), competition=COALESCE(?,competition), venue=COALESCE(?,venue)
     WHERE id=?`
  ).run(home_team, away_team, home_score ?? null, away_score ?? null, date, status, competition, venue, req.params.id);

  res.json(db.prepare('SELECT * FROM matches WHERE id = ?').get(req.params.id));
});

// DELETE /api/matches/:id (admin only)
router.delete('/:id', requireAuth, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  const result = db.prepare('DELETE FROM matches WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Match not found' });
  res.json({ success: true });
});

module.exports = router;
