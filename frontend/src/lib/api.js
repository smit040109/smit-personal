import axios from "axios";

// Backend base URL is injected at build time. Trim any trailing slash so we
// never end up with a malformed `//api` path, and fall back to a relative
// `/api` if the env var is missing (prevents "undefined/api" requests).
const RAW = process.env.REACT_APP_BACKEND_URL || "";
const BACKEND_URL = RAW.replace(/\/+$/, "");
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
  timeout: 20000,
});

const asArray = (data) => (Array.isArray(data) ? data : []);
const asObject = (data, fallback) =>
  data && typeof data === "object" && !Array.isArray(data) ? data : fallback;

const DEFAULT_STATS = { total: 0, new: 0, replied: 0, archived: 0 };

// Contact form submit — throws on failure so the form can show an error.
export const sendContactMessage = (payload) =>
  api.post("/contact", payload).then((r) => r.data);

// Admin reads — always resolve to a safe shape, never throw the caller into
// calling array methods on non-array values.
export const getMessages = () =>
  api
    .get("/contact/messages")
    .then((r) => asArray(r.data))
    .catch(() => []);

export const getStats = () =>
  api
    .get("/contact/stats")
    .then((r) => asObject(r.data, DEFAULT_STATS))
    .catch(() => ({ ...DEFAULT_STATS }));

export const updateMessageStatus = (id, status) =>
  api.patch(`/contact/messages/${id}`, { status }).then((r) => r.data);

export const deleteMessage = (id) =>
  api.delete(`/contact/messages/${id}`).then((r) => r.data);
