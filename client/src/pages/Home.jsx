import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <main className="home">
      <div className="home__box" aria-hidden="true">
        📦
      </div>
      <h1 className="home__title">Hola, soy El Boilerplate</h1>
      <p className="home__subtitle">
        Un proyecto base como cualquier otro… hasta que me dejaron hablar.
      </p>
      <Link className="home__cta" to="/fun-facts">
        🎭 Conocé mis Fun Facts
      </Link>
      <p className="home__hint">
        Spoiler: tengo opiniones fuertes sobre node_modules.
      </p>
    </main>
  );
}
