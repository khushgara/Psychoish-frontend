/**
 * api.js — Single source of truth for the backend API base URL.
 *
 * How it works (zero config changes required):
 *  - If the app is running on localhost or 127.0.0.1  →  uses local dev server
 *  - Anywhere else (Railway, Vercel, custom domain…)  →  uses the production backend
 *
 * To add a new environment just change PROD_API_URL below.
 */

const PROD_API_URL = "https://psychoish-backend-production-5efd.up.railway.app";
const DEV_API_URL  = "http://localhost:8080";

const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname === "";

export const API_BASE_URL = isLocalhost ? DEV_API_URL : PROD_API_URL;

export default API_BASE_URL;
