const Database = require('better-sqlite3');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'data', 'luss.db');

const db = new Database(DB_PATH);

// Enable WAL mode for better concurrent read performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id          TEXT PRIMARY KEY,
    email       TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name   TEXT NOT NULL,
    role        TEXT NOT NULL DEFAULT 'member',
    created_date TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS articles (
    id           TEXT PRIMARY KEY,
    title        TEXT NOT NULL,
    content      TEXT NOT NULL DEFAULT '',
    category     TEXT NOT NULL DEFAULT 'Nyheter',
    author       TEXT NOT NULL DEFAULT 'LUSS',
    image_url    TEXT,
    excerpt      TEXT,
    is_featured  INTEGER NOT NULL DEFAULT 0,
    created_date TEXT NOT NULL,
    comment_count INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS matches (
    id         TEXT PRIMARY KEY,
    home_team  TEXT NOT NULL,
    away_team  TEXT NOT NULL,
    home_score INTEGER,
    away_score INTEGER,
    date       TEXT NOT NULL,
    status     TEXT NOT NULL DEFAULT 'Kommande',
    competition TEXT NOT NULL DEFAULT 'Premier League',
    venue      TEXT
  );

  CREATE TABLE IF NOT EXISTS forum_threads (
    id             TEXT PRIMARY KEY,
    title          TEXT NOT NULL,
    content        TEXT NOT NULL,
    category       TEXT NOT NULL DEFAULT 'Generellt',
    created_by     TEXT NOT NULL,
    created_by_id  TEXT,
    created_date   TEXT NOT NULL,
    is_pinned      INTEGER NOT NULL DEFAULT 0,
    reply_count    INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS forum_replies (
    id             TEXT PRIMARY KEY,
    thread_id      TEXT NOT NULL REFERENCES forum_threads(id) ON DELETE CASCADE,
    content        TEXT NOT NULL,
    created_by     TEXT NOT NULL,
    created_by_id  TEXT,
    created_date   TEXT NOT NULL
  );
`);

// Migrate: add created_by_id columns if they don't exist yet (for existing databases)
try { db.exec('ALTER TABLE forum_threads ADD COLUMN created_by_id TEXT'); } catch { /* column already exists */ }
try { db.exec('ALTER TABLE forum_replies ADD COLUMN created_by_id TEXT'); } catch { /* column already exists */ }

// Seed initial data if tables are empty
const articleCount = db.prepare('SELECT COUNT(*) as c FROM articles').get().c;
if (articleCount === 0) {
  const now = new Date().toISOString();
  const insert = db.prepare(`
    INSERT INTO articles (id, title, content, category, author, image_url, excerpt, is_featured, created_date, comment_count)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insert.run(
    uuidv4(),
    'Välkommen till LUSS!',
    '## Välkommen!\n\nDetta är den officiella webbplatsen för Leeds United Supporters Sweden. Här hittar du nyheter, matchschema och diskussioner om vårt älskade lag.\n\nMarsch på, Leeds!',
    'Nyheter',
    'LUSS Redaktion',
    null,
    'Den officiella webbplatsen för svenska Leeds United-supporters.',
    1,
    now,
    0
  );
  insert.run(
    uuidv4(),
    'LUSS grundades för att samla svenska Leeds-fans',
    '## Om LUSS\n\nLeeds United Supporters Sweden (LUSS) är en supporterförening för svenska fans av Leeds United FC. Vi arrangerar visningar, resor och andra evenemang.',
    'Nyheter',
    'LUSS Redaktion',
    null,
    'Läs mer om hur LUSS kom till.',
    0,
    new Date(Date.now() - 86400000).toISOString(),
    0
  );
}

const matchCount = db.prepare('SELECT COUNT(*) as c FROM matches').get().c;
if (matchCount === 0) {
  const insertMatch = db.prepare(`
    INSERT INTO matches (id, home_team, away_team, home_score, away_score, date, status, competition, venue)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const base = new Date();
  const future1 = new Date(base.getTime() + 7 * 86400000).toISOString();
  const future2 = new Date(base.getTime() + 14 * 86400000).toISOString();
  const past1 = new Date(base.getTime() - 7 * 86400000).toISOString();

  insertMatch.run(uuidv4(), 'Leeds United', 'Arsenal', null, null, future1, 'Kommande', 'Premier League', 'Elland Road');
  insertMatch.run(uuidv4(), 'Chelsea', 'Leeds United', null, null, future2, 'Kommande', 'Premier League', 'Stamford Bridge');
  insertMatch.run(uuidv4(), 'Leeds United', 'Liverpool', 2, 1, past1, 'Spelad', 'Premier League', 'Elland Road');
}

module.exports = db;
