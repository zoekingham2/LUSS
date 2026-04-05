const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const { requireAuth, optionalAuth } = require('../middleware/auth');

const router = express.Router();

const THREAD_SORT_FIELDS = {
  created_date: 'created_date',
  title: 'title',
  category: 'category',
  reply_count: 'reply_count',
};

function parseSort(sortParam, defaultField = 'created_date', defaultOrder = 'DESC') {
  const sort = Array.isArray(sortParam) ? sortParam[0] : (sortParam || '');
  const desc = sort.startsWith('-');
  const fieldKey = desc ? sort.slice(1) : sort;
  const field = THREAD_SORT_FIELDS[fieldKey] || defaultField;
  return { field, order: desc ? 'DESC' : 'ASC' };
}

// ─── Threads ────────────────────────────────────────────────────────────────

// GET /api/forum/threads
router.get('/threads', optionalAuth, (req, res) => {
  const { sort, limit } = req.query;
  const { field, order } = parseSort(sort);
  const limitStr = Array.isArray(limit) ? limit[0] : limit;
  const limitVal = limitStr ? Math.min(parseInt(limitStr, 10) || 100, 500) : 500;
  const rows = db
    .prepare(`SELECT * FROM forum_threads ORDER BY ${field} ${order} LIMIT ?`)
    .all(limitVal);
  res.json(rows.map(r => ({ ...r, is_pinned: r.is_pinned === 1 })));
});

// GET /api/forum/threads/:id
router.get('/threads/:id', optionalAuth, (req, res) => {
  const row = db.prepare('SELECT * FROM forum_threads WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Thread not found' });
  res.json({ ...row, is_pinned: row.is_pinned === 1 });
});

// POST /api/forum/threads (auth required)
router.post('/threads', requireAuth, (req, res) => {
  const { title, content, category } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'title and content are required' });
  }
  const id = uuidv4();
  const created_date = new Date().toISOString();
  const created_by = req.user.full_name || req.user.email;
  db.prepare(
    `INSERT INTO forum_threads (id, title, content, category, created_by, created_date, is_pinned, reply_count)
     VALUES (?, ?, ?, ?, ?, ?, 0, 0)`
  ).run(id, title.trim(), content.trim(), category || 'Generellt', created_by, created_date);
  const row = db.prepare('SELECT * FROM forum_threads WHERE id = ?').get(id);
  res.status(201).json({ ...row, is_pinned: row.is_pinned === 1 });
});

// PUT /api/forum/threads/:id (auth required — author or admin)
router.put('/threads/:id', requireAuth, (req, res) => {
  const existing = db.prepare('SELECT * FROM forum_threads WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Thread not found' });

  const { title, content, category, is_pinned, reply_count } = req.body;
  db.prepare(
    `UPDATE forum_threads SET
       title=COALESCE(?,title), content=COALESCE(?,content), category=COALESCE(?,category),
       is_pinned=COALESCE(?,is_pinned), reply_count=COALESCE(?,reply_count)
     WHERE id=?`
  ).run(title, content, category, is_pinned != null ? (is_pinned ? 1 : 0) : null, reply_count, req.params.id);

  const row = db.prepare('SELECT * FROM forum_threads WHERE id = ?').get(req.params.id);
  res.json({ ...row, is_pinned: row.is_pinned === 1 });
});

// DELETE /api/forum/threads/:id (auth required)
router.delete('/threads/:id', requireAuth, (req, res) => {
  const result = db.prepare('DELETE FROM forum_threads WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Thread not found' });
  res.json({ success: true });
});

// ─── Replies ─────────────────────────────────────────────────────────────────

// GET /api/forum/replies?thread_id=X&sort=X&limit=N
router.get('/replies', optionalAuth, (req, res) => {
  const { thread_id, sort, limit } = req.query;
  const { field, order } = parseSort(sort);
  const limitStr = Array.isArray(limit) ? limit[0] : limit;
  const limitVal = limitStr ? Math.min(parseInt(limitStr, 10) || 200, 1000) : 1000;
  const tidParam = Array.isArray(thread_id) ? thread_id[0] : thread_id;

  let rows;
  if (tidParam) {
    rows = db
      .prepare(`SELECT * FROM forum_replies WHERE thread_id = ? ORDER BY ${field} ${order} LIMIT ?`)
      .all(tidParam, limitVal);
  } else {
    rows = db
      .prepare(`SELECT * FROM forum_replies ORDER BY ${field} ${order} LIMIT ?`)
      .all(limitVal);
  }
  res.json(rows);
});

// POST /api/forum/replies (auth required)
router.post('/replies', requireAuth, (req, res) => {
  const { thread_id, content } = req.body;
  if (!thread_id || !content) {
    return res.status(400).json({ error: 'thread_id and content are required' });
  }
  const thread = db.prepare('SELECT id, reply_count FROM forum_threads WHERE id = ?').get(thread_id);
  if (!thread) return res.status(404).json({ error: 'Thread not found' });

  const id = uuidv4();
  const created_date = new Date().toISOString();
  const created_by = req.user.full_name || req.user.email;

  db.prepare(
    `INSERT INTO forum_replies (id, thread_id, content, created_by, created_date) VALUES (?, ?, ?, ?, ?)`
  ).run(id, thread_id, content.trim(), created_by, created_date);

  // Increment reply count atomically
  db.prepare('UPDATE forum_threads SET reply_count = reply_count + 1 WHERE id = ?').run(thread_id);

  res.status(201).json(db.prepare('SELECT * FROM forum_replies WHERE id = ?').get(id));
});

// DELETE /api/forum/replies/:id (auth required)
router.delete('/replies/:id', requireAuth, (req, res) => {
  const reply = db.prepare('SELECT * FROM forum_replies WHERE id = ?').get(req.params.id);
  if (!reply) return res.status(404).json({ error: 'Reply not found' });

  db.prepare('DELETE FROM forum_replies WHERE id = ?').run(req.params.id);
  db.prepare('UPDATE forum_threads SET reply_count = MAX(0, reply_count - 1) WHERE id = ?').run(reply.thread_id);

  res.json({ success: true });
});

module.exports = router;
