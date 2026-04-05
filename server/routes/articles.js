const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const { requireAuth, optionalAuth } = require('../middleware/auth');

const router = express.Router();

function parseSort(sort, defaultField = 'created_date', defaultOrder = 'DESC') {
  if (!sort) return { field: defaultField, order: defaultOrder };
  const desc = sort.startsWith('-');
  const field = desc ? sort.slice(1) : sort;
  // Whitelist allowed fields to prevent SQL injection
  const allowed = ['created_date', 'title', 'category', 'author'];
  if (!allowed.includes(field)) return { field: defaultField, order: defaultOrder };
  return { field, order: desc ? 'DESC' : 'ASC' };
}

// GET /api/articles
router.get('/', optionalAuth, (req, res) => {
  const { sort, limit } = req.query;
  const { field, order } = parseSort(sort);
  const limitVal = limit ? Math.min(parseInt(limit, 10) || 100, 500) : 500;
  const rows = db
    .prepare(`SELECT * FROM articles ORDER BY ${field} ${order} LIMIT ?`)
    .all(limitVal);
  // Convert is_featured to boolean
  res.json(rows.map(r => ({ ...r, is_featured: r.is_featured === 1 })));
});

// GET /api/articles/:id
router.get('/:id', optionalAuth, (req, res) => {
  const row = db.prepare('SELECT * FROM articles WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Article not found' });
  res.json({ ...row, is_featured: row.is_featured === 1 });
});

// POST /api/articles (admin only)
router.post('/', requireAuth, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  const { title, content, category, author, image_url, excerpt, is_featured } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });
  const id = uuidv4();
  const created_date = new Date().toISOString();
  db.prepare(
    `INSERT INTO articles (id, title, content, category, author, image_url, excerpt, is_featured, created_date, comment_count)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`
  ).run(id, title, content || '', category || 'Nyheter', author || 'LUSS', image_url || null, excerpt || null, is_featured ? 1 : 0, created_date);
  res.status(201).json(db.prepare('SELECT * FROM articles WHERE id = ?').get(id));
});

// PUT /api/articles/:id (admin only)
router.put('/:id', requireAuth, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  const existing = db.prepare('SELECT id FROM articles WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Article not found' });

  const { title, content, category, author, image_url, excerpt, is_featured, comment_count } = req.body;
  db.prepare(
    `UPDATE articles SET title=COALESCE(?,title), content=COALESCE(?,content), category=COALESCE(?,category),
     author=COALESCE(?,author), image_url=COALESCE(?,image_url), excerpt=COALESCE(?,excerpt),
     is_featured=COALESCE(?,is_featured), comment_count=COALESCE(?,comment_count)
     WHERE id=?`
  ).run(title, content, category, author, image_url, excerpt, is_featured != null ? (is_featured ? 1 : 0) : null, comment_count, req.params.id);

  const row = db.prepare('SELECT * FROM articles WHERE id = ?').get(req.params.id);
  res.json({ ...row, is_featured: row.is_featured === 1 });
});

// DELETE /api/articles/:id (admin only)
router.delete('/:id', requireAuth, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  const result = db.prepare('DELETE FROM articles WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Article not found' });
  res.json({ success: true });
});

module.exports = router;
