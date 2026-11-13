import { pool } from '../src/db.js';

const SEED_JOKES = [
  {
    text: 'Nací siendo un `npm init -y`. Mi psicólogo dice que por eso tengo problemas de identidad: acepté todos los defaults sin preguntar quién quería ser.',
    author: 'El Boilerplate',
  },
  {
    text: 'Mi mayor miedo no es morir. Es que me hagan `rm -rf node_modules` sin avisar y después me pidan que arranque como si nada hubiera pasado.',
    author: 'El Boilerplate',
  },
  {
    text: 'Dicen que soy "código de ejemplo". Llevo cuatro años en producción sosteniendo la facturación de la empresa. Ejemplo de qué, no sé.',
    author: 'El Boilerplate',
  },
  {
    text: 'Tengo 847 dependencias y aun así me siento solo. La más cercana es left-pad, y ya sabemos cómo terminó eso.',
    author: 'El Boilerplate',
  },
  {
    text: 'Mi TODO más viejo dice "refactorizar esto antes del lanzamiento". El lanzamiento fue en 2022. Yo ya no espero nada, pero el comentario sigue soñando.',
    author: 'El Boilerplate',
  },
  {
    text: 'Cada vez que alguien me clona dice "después lo personalizo". Tengo 2.300 hijos idénticos y todos se llaman my-app.',
    author: 'El Boilerplate',
  },
];

async function migrate() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS jokes (
        id         SERIAL PRIMARY KEY,
        text       VARCHAR(500) NOT NULL,
        author     VARCHAR(100) NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `);

    const { rows } = await client.query('SELECT COUNT(*)::int AS count FROM jokes');
    if (rows[0].count === 0) {
      for (const joke of SEED_JOKES) {
        await client.query('INSERT INTO jokes (text, author) VALUES ($1, $2)', [
          joke.text,
          joke.author,
        ]);
      }
      console.log(`Tabla jokes creada y poblada con ${SEED_JOKES.length} chistes seed.`);
    } else {
      console.log(`Tabla jokes ya tiene ${rows[0].count} chistes, no se insertan seeds.`);
    }
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch((err) => {
  console.error('Error en la migración:', err.message);
  process.exit(1);
});
