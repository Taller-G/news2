import './JokeTicker.css';

export default function JokeTicker({ jokes }) {
  if (jokes.length === 0) return null;
  const items = jokes.map((joke) => `📦 ${joke.text}`);
  return (
    <div className="joke-ticker" aria-hidden="true">
      <div className="joke-ticker__track">
        {/* Se duplica el contenido para que el loop del marquee sea continuo */}
        {[...items, ...items].map((text, i) => (
          <span className="joke-ticker__item" key={i}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
