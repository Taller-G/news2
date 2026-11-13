import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import JokeCard from '../components/JokeCard.jsx';
import JokeQuote from '../components/JokeQuote.jsx';
import JokeBubble from '../components/JokeBubble.jsx';
import JokeTicker from '../components/JokeTicker.jsx';
import JokeForm from '../components/JokeForm.jsx';
import SkeletonGrid from '../components/SkeletonGrid.jsx';
import './FunFacts.css';

const POLL_INTERVAL_MS = 10_000;
const FRIENDLY_ERROR = 'No pudimos cargar los chistes, intentá de nuevo en un momento';

export default function FunFacts() {
  const [jokes, setJokes] = useState(null); // null = todavía no cargó
  const [error, setError] = useState(null);

  const fetchJokes = useCallback(async () => {
    try {
      const res = await fetch('/api/jokes');
      if (!res.ok) throw new Error(FRIENDLY_ERROR);
      const data = await res.json();
      setJokes(data);
      setError(null);
    } catch {
      setError(FRIENDLY_ERROR);
    }
  }, []);

  useEffect(() => {
    fetchJokes();
    const interval = setInterval(fetchJokes, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchJokes]);

  const loading = jokes === null && !error;
  const isEmpty = jokes !== null && jokes.length === 0;

  // Reparte los chistes entre los tres formatos por índice, así los nuevos
  // siempre caen en alguna sección sin lógica extra.
  const cards = (jokes ?? []).filter((_, i) => i % 3 === 0);
  const quotes = (jokes ?? []).filter((_, i) => i % 3 === 1);
  const bubbles = (jokes ?? []).filter((_, i) => i % 3 === 2);

  return (
    <main className="fun-facts">
      <nav className="fun-facts__nav">
        <Link to="/">← Volver al inicio</Link>
      </nav>

      <header className="fun-facts__hero">
        <div className="fun-facts__avatar" aria-hidden="true">
          📦
        </div>
        <h1 className="fun-facts__title">Fun Facts del Boilerplate</h1>
        <p className="fun-facts__intro">
          Hola. Soy el boilerplate de este proyecto: nadie me eligió, pero acá
          estoy, sosteniendo todo. Estos son los chistes de mi vida — los míos y
          los que me deja la gente que pasa.
        </p>
      </header>

      {jokes !== null && <JokeTicker jokes={jokes} />}

      {error && jokes === null ? (
        <section className="fun-facts__state">
          <p className="fun-facts__error" role="alert">
            😿 {error}
          </p>
          <button className="fun-facts__retry" onClick={fetchJokes}>
            Reintentar
          </button>
        </section>
      ) : loading ? (
        <section className="fun-facts__section">
          <SkeletonGrid />
        </section>
      ) : isEmpty ? (
        <section className="fun-facts__state">
          <p className="fun-facts__empty">
            🦗 Todavía no hay chistes. ¡Sé el primero en agregar uno!
          </p>
        </section>
      ) : (
        <>
          {error && (
            <p className="fun-facts__error fun-facts__error--inline" role="alert">
              😿 {error}
            </p>
          )}

          {cards.length > 0 && (
            <section className="fun-facts__section">
              <h2 className="fun-facts__heading">🏭 Mi vida en producción</h2>
              <div className="fun-facts__grid">
                {cards.map((joke, i) => (
                  <JokeCard key={joke.id} joke={joke} tilt={i % 3} />
                ))}
              </div>
            </section>
          )}

          {quotes.length > 0 && (
            <section className="fun-facts__section">
              <h2 className="fun-facts__heading">💬 Frases célebres</h2>
              <div className="fun-facts__quotes">
                {quotes.map((joke) => (
                  <JokeQuote key={joke.id} joke={joke} />
                ))}
              </div>
            </section>
          )}

          {bubbles.length > 0 && (
            <section className="fun-facts__section">
              <h2 className="fun-facts__heading">🛋️ El boilerplate en terapia</h2>
              <div className="fun-facts__bubbles">
                {bubbles.map((joke) => (
                  <JokeBubble key={joke.id} joke={joke} />
                ))}
              </div>
            </section>
          )}
        </>
      )}

      <section className="fun-facts__section">
        <JokeForm onCreated={fetchJokes} />
      </section>

      <footer className="fun-facts__footer">
        Los chistes nuevos aparecen solos cada 10 segundos. El boilerplate no
        duerme; solo hace watch mode.
      </footer>
    </main>
  );
}
