import express from 'express';
import 'dotenv/config';
import { jokesRouter } from './routes/jokes.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json({ limit: '10kb' }));

app.use('/api/jokes', jokesRouter);

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use((err, _req, res, _next) => {
  console.error('Error no manejado:', err.message);
  res.status(500).json({ error: 'Algo salió mal, intentá de nuevo en un momento' });
});

app.listen(port, () => {
  console.log(`API de fun facts escuchando en http://localhost:${port}`);
});
