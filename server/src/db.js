import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

export const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgres://funfacts:funfacts@localhost:5434/funfacts',
  // Fallar rápido si Postgres no responde, para poder devolver 503 sin colgar el request
  connectionTimeoutMillis: 3000,
});
