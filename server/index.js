require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth');
const articlesRoutes = require('./routes/articles');
const matchesRoutes = require('./routes/matches');
const forumRoutes = require('./routes/forum');

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Rate limiters ─────────────────────────────────────────────────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});

// ─── Middleware ────────────────────────────────────────────────────────────
app.use(express.json());

if (!process.env.FRONTEND_URL && process.env.NODE_ENV === 'production') {
  console.error('FATAL: FRONTEND_URL environment variable is required in production');
  process.exit(1);
}

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// ─── API Routes ────────────────────────────────────────────────────────────
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/articles', apiLimiter, articlesRoutes);
app.use('/api/matches', apiLimiter, matchesRoutes);
app.use('/api/forum', apiLimiter, forumRoutes);

// ─── Serve built frontend (production) ────────────────────────────────────
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(404).json({ error: 'Not found' });
    }
  });
});

// ─── Start ─────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`LUSS server running on http://localhost:${PORT}`);
});
