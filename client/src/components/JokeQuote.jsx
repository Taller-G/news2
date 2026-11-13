import './JokeQuote.css';

export default function JokeQuote({ joke }) {
  return (
    <blockquote className="joke-quote">
      <p className="joke-quote__text">{joke.text}</p>
      <cite className="joke-quote__cite">
        {joke.author} · {new Date(joke.created_at).toLocaleDateString('es-AR')}
      </cite>
    </blockquote>
  );
}
