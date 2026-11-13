import './JokeBubble.css';

export default function JokeBubble({ joke }) {
  return (
    <div className="joke-bubble">
      <div className="joke-bubble__avatar" aria-hidden="true">
        📦
      </div>
      <div className="joke-bubble__body">
        <p className="joke-bubble__text">{joke.text}</p>
        <span className="joke-bubble__meta">
          {joke.author} · {new Date(joke.created_at).toLocaleDateString('es-AR')}
        </span>
      </div>
    </div>
  );
}
