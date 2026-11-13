# news2 — El Boilerplate con Fun Facts

Boilerplate full-stack (React + Express + PostgreSQL) con una landing donde el
boilerplate es el protagonista y cuenta chistes sobre su vida. Los usuarios
pueden agregar los suyos, firmados con su nombre, y se comparten entre todos
con persistencia en PostgreSQL.

## Stack

- **client/** — React 18 + Vite + react-router-dom (JavaScript, CSS plano)
- **server/** — Node + Express, `pg` directo (sin ORM)
- **PostgreSQL 16** en Docker Compose (puerto host **5434**)

## Cómo correrlo

```bash
npm install          # instala client y server (npm workspaces)
npm run db:up        # levanta PostgreSQL en Docker (puerto 5434)
npm run db:migrate   # crea la tabla jokes y la puebla con 6 chistes seed
npm run dev          # server en :3001 + client en :5173 (proxy /api)
```

Abrí http://localhost:5173 — la home enlaza a `/fun-facts`.

El server lee `DATABASE_URL` y `PORT` del entorno (ver `server/.env.example`);
sin `.env` usa los defaults que matchean el docker-compose.

## API

- `GET /api/jokes` → lista todos los chistes (orden cronológico).
- `POST /api/jokes` → `{ text, author }`. Valida: texto no vacío y ≤ 500
  caracteres, autor no vacío y ≤ 100. Responde `201` con el chiste creado,
  `400` si la validación falla, `503` si la base no responde.

## Comportamiento de la página fun-facts

- Chistes en 4 formatos: tarjetas, blockquotes, burbujas de chat con avatar y
  ticker/marquee; se reparten por índice (`i % 3`) entre las secciones.
- Polling cada 10 s para traer chistes nuevos sin recargar.
- Estados: skeleton al cargar, vacío amigable sin chistes, banner de error si
  la API/DB no responden.
