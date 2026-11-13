# decision

A choice made and the reasoning behind it — the path taken over the alternatives.

## Fun-facts stack: Vite React + Express + raw pg, plain JavaScript

What: The fun-facts feature (and the project's first real code) uses npm workspaces with client/ (Vite + React 18 + react-router-dom) and server/ (Express 4 + pg Pool, no ORM), all in JavaScript · Why: greenfield repo with no prior conventions; user explicitly chose JavaScript over TypeScript for simplicity, and raw pg suffices for a single table · Where: package.json, client/, server/

## New jokes propagate via 10s polling, not WebSockets

What: The fun-facts page re-fetches GET /api/jokes every 10 seconds (setInterval) plus an immediate re-fetch after a successful POST · Why: the work order chose polling as the simplicity/immediacy balance for a boilerplate — no WebSocket infrastructure wanted · Where: client/src/pages/FunFacts.jsx

## Ubicación map is a hand-drawn inline SVG, no map library

What: The /ubicacion world-map view renders simplified continent polygons as an inline SVG (equirectangular projection, viewBox 1000x500) with fictional counter markers generated client-side; Leaflet/Mapbox were discarded · Why: the feature is purely visual/demo with no real geodata, and the user required zero new dependencies · Where: client/src/pages/Ubicacion.jsx · Learned: for decorative maps a projected inline SVG avoids a heavy mapping dependency entirely

## Jokes migration is idempotent: seed only when table is empty

What: server/db/migrate.js does CREATE TABLE IF NOT EXISTS and inserts the 6 seed jokes only if COUNT(*) is 0 · Why: re-running the migration must never duplicate seeds or touch user-submitted jokes · Where: server/db/migrate.js · Learned: seed guards belong in the migration itself, not in run instructions
