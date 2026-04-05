// Self-hosted API client — replaces @base44/sdk
// Exposes the same `.entities.X.list/create/update/filter` and `.auth.me/logout` interface

const TOKEN_KEY = 'luss_token';

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(`/api${path}`, { ...options, headers });
  if (!res.ok) {
    let errorData;
    try { errorData = await res.json(); } catch { errorData = {}; }
    const err = new Error(errorData.error || `Request failed: ${res.status}`);
    err.status = res.status;
    err.data = errorData;
    throw err;
  }
  return res.json();
}

// Map entity name to API route prefix
const ENTITY_ROUTES = {
  Article: '/articles',
  Match: '/matches',
  ForumThread: '/forum/threads',
  ForumReply: '/forum/replies',
};

function buildQueryString(params) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) qs.set(k, String(v));
  });
  const str = qs.toString();
  return str ? `?${str}` : '';
}

function makeEntityClient(entityName) {
  const route = ENTITY_ROUTES[entityName];
  if (!route) throw new Error(`Unknown entity: ${entityName}`);

  return {
    // list(sort?, limit?) — e.g. Article.list("-created_date", 10)
    list(sort, limit) {
      return apiFetch(`${route}${buildQueryString({ sort, limit })}`);
    },

    // filter(conditions, sort?, limit?) — e.g. ForumReply.filter({ thread_id: "x" }, "-created_date", 200)
    filter(conditions = {}, sort, limit) {
      return apiFetch(`${route}${buildQueryString({ ...conditions, sort, limit })}`);
    },

    // create(data)
    create(data) {
      return apiFetch(route, { method: 'POST', body: JSON.stringify(data) });
    },

    // update(id, data)
    update(id, data) {
      return apiFetch(`${route}/${id}`, { method: 'PUT', body: JSON.stringify(data) });
    },

    // remove(id)
    remove(id) {
      return apiFetch(`${route}/${id}`, { method: 'DELETE' });
    },

    // get(id) — fetch a single item
    get(id) {
      return apiFetch(`${route}/${id}`);
    },
  };
}

const auth = {
  async me() {
    return apiFetch('/auth/me');
  },

  logout(redirectUrl) {
    removeToken();
    const dest = redirectUrl || '/login';
    window.location.href = '/login';
  },

  redirectToLogin(from) {
    window.location.href = '/login';
  },

  async login(email, password) {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.token) setToken(data.token);
    return data;
  },

  async register(email, password, full_name) {
    const data = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, full_name }),
    });
    if (data.token) setToken(data.token);
    return data;
  },

  getToken,
  setToken,
  removeToken,
};

export const client = {
  auth,
  entities: new Proxy({}, {
    get(_, entityName) {
      return makeEntityClient(entityName);
    },
  }),
};
