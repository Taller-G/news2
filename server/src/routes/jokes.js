import { Router } from 'express';
import { pool } from '../db.js';

export const jokesRouter = Router();

const DB_ERROR_MESSAGE =
  'No pudimos cargar los chistes, intentá de nuevo en un momento';

const MAX_TEXT_LENGTH = 500;
const MAX_AUTHOR_LENGTH = 100;

function validateJoke(body) {
  const text = typeof body?.text === 'string' ? body.text.trim() : '';
  const author = typeof body?.author === 'string' ? body.author.trim() : '';

  if (!text) return { error: 'El chiste no puede estar vacío' };
  if (text.length > MAX_TEXT_LENGTH)
    return { error: `El chiste no puede superar los ${MAX_TEXT_LENGTH} caracteres` };
  if (!author) return { error: 'Contanos tu nombre para firmar el chiste' };
  if (author.length > MAX_AUTHOR_LENGTH)
    return { error: `El nombre no puede superar los ${MAX_AUTHOR_LENGTH} caracteres` };

  return { text, author };
}

jokesRouter.get('/', async (_req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, text, author, created_at FROM jokes ORDER BY created_at ASC, id ASC'
    );
    res.json(rows);
  } catch (err) {
    console.error('GET /api/jokes falló:', err.message);
    res.status(503).json({ error: DB_ERROR_MESSAGE });
  }
});

jokesRouter.post('/', async (req, res) => {
  const result = validateJoke(req.body);
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  try {
    const { rows } = await pool.query(
      'INSERT INTO jokes (text, author) VALUES ($1, $2) RETURNING id, text, author, created_at',
      [result.text, result.author]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('POST /api/jokes falló:', err.message);
    res.status(503).json({ error: DB_ERROR_MESSAGE });
  }
});
