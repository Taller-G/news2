# gotcha

A non-obvious pitfall or trap, learned the hard way.

## Host ports 5432 and 5433 are taken on the dev machine

What: This project's Postgres maps host port 5434 (container 5432) in docker-compose · Why: 5432 and 5433 are already bound by unrelated containers (af-local-dev supabase-db and postgres) on the dev machine, so `docker compose up` fails on those ports · Where: docker-compose.yml, server/.env.example, server/src/db.js · Learned: check `docker ps` for port collisions before binding default DB ports

## No transcript was provided in this distillation request.

What: No transcript was provided in this distillation request. · Why: — · Learned: The memory distiller prompt requires an attached TRANSCRIPT to extract items from; without it, no items can be produced. <!-- id: 2026-11-13T14:14:46.798Z-0 -->

## No transcript was provided in this distillation request.

What: No transcript was provided in this distillation request. · Why: — · Learned: The memory distiller received only its instructions but no session content to process — output is empty. <!-- id: 2026-11-13T14:15:59.801Z-0 -->
