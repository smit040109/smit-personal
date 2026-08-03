import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

export const sendContactMessage = (payload) => api.post("/contact", payload).then((r) => r.data);
export const getMessages = () => api.get("/contact/messages").then((r) => r.data);
export const getStats = () => api.get("/contact/stats").then((r) => r.data);
export const updateMessageStatus = (id, status) =>
  api.patch(`/contact/messages/${id}`, { status }).then((r) => r.data);
export const deleteMessage = (id) => api.delete(`/contact/messages/${id}`).then((r) => r.data);
