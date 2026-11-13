# config

Setup and configuration — env vars, flags, how to run the project.

## How to run the app

What: `npm install` → `npm run db:up` (Postgres in Docker on host port 5434) → `npm run db:migrate` → `npm run dev` (Express on :3001, Vite on :5173 with /api proxied to the server) · Why: server reads DATABASE_URL and PORT from env (server/.env.example) and falls back to defaults matching docker-compose, so no .env is needed for local dev · Where: package.json, docker-compose.yml, client/vite.config.js
