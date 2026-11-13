import './JokeCard.css';

export default function JokeCard({ joke, tilt }) {
  return (
    <article className={`joke-card joke-card--tilt-${tilt}`}>
      <p className="joke-card__text">{joke.text}</p>
      <footer className="joke-card__meta">
        <span className="joke-card__author">— {joke.author}</span>
        <time className="joke-card__date" dateTime={joke.created_at}>
          {new Date(joke.created_at).toLocaleDateString('es-AR')}
        </time>
      </footer>
    </article>
  );
}
