# LUSS — Leeds United Supporters Sweden

Fully self-hosted fan site for Swedish Leeds United supporters. No external services required — everything runs on your own hardware.

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite + Tailwind CSS |
| Backend | Node.js + Express |
| Database | SQLite (via `better-sqlite3`) |
| Auth | JWT tokens + bcrypt |

---

## Quick start (development)

### 1. Clone & install

```bash
git clone <your-repo-url>
cd LUSS
npm install
cd server && npm install && cd ..
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env and set a strong JWT_SECRET
```

### 3. Start both servers

```bash
npm run dev
```

This starts the backend API (port 3001) and the Vite dev server (port 5173) together.

> To start them separately, use `npm run server` and `npm run dev:client` in two terminals.

---

## Production deployment

### Build & serve

```bash
# Build the frontend
npm run build

# Run the server (it also serves the built frontend from /dist)
JWT_SECRET=your-secret node server/index.js
```

The server serves the built React app on port 3001 (static files + API on the same port).

### Docker Compose

```bash
cp .env.example .env
# Edit .env with your JWT_SECRET and FRONTEND_URL

docker-compose up -d
```

---

## Creating the first admin user

1. Register normally via the `/login` page.
2. Connect to the SQLite database and promote the user to admin:

```bash
# Using the sqlite3 CLI:
sqlite3 server/data/luss.db "UPDATE users SET role='admin' WHERE email='your@email.com';"
```

Admin users can create/edit/delete articles and matches via the API.

---

## API reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | — | Register new user |
| POST | `/api/auth/login` | — | Login, returns JWT |
| GET | `/api/auth/me` | ✓ | Get current user |
| GET | `/api/articles` | — | List articles |
| GET | `/api/articles/:id` | — | Get article |
| POST | `/api/articles` | admin | Create article |
| PUT | `/api/articles/:id` | admin | Update article |
| DELETE | `/api/articles/:id` | admin | Delete article |
| GET | `/api/matches` | — | List matches |
| POST | `/api/matches` | admin | Create match |
| PUT | `/api/matches/:id` | admin | Update match |
| DELETE | `/api/matches/:id` | admin | Delete match |
| GET | `/api/forum/threads` | — | List forum threads |
| POST | `/api/forum/threads` | ✓ | Create thread |
| PUT | `/api/forum/threads/:id` | ✓ | Update thread |
| GET | `/api/forum/replies?thread_id=X` | — | List replies |
| POST | `/api/forum/replies` | ✓ | Post reply |

Query parameters for list endpoints: `?sort=-created_date&limit=50`

