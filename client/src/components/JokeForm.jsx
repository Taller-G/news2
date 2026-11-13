import { useState } from 'react';
import './JokeForm.css';

const MAX_TEXT_LENGTH = 500;

export default function JokeForm({ onCreated }) {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [validationError, setValidationError] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  function validate() {
    if (!author.trim()) return 'Contanos tu nombre para firmar el chiste';
    if (!text.trim()) return 'El chiste no puede estar vacío';
    if (text.trim().length > MAX_TEXT_LENGTH)
      return `El chiste no puede superar los ${MAX_TEXT_LENGTH} caracteres`;
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccess(false);
    setSubmitError(null);

    const error = validate();
    if (error) {
      setValidationError(error);
      return;
    }
    setValidationError(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/jokes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim(), author: author.trim() }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(body.error || 'No pudimos publicar tu chiste, intentá de nuevo en un momento');
      }
      setText('');
      setSuccess(true);
      onCreated?.(body);
    } catch (err) {
      setSubmitError(
        err instanceof TypeError
          ? 'No pudimos publicar tu chiste, revisá tu conexión e intentá de nuevo'
          : err.message
      );
    } finally {
      setSubmitting(false);
    }
  }

  const remaining = MAX_TEXT_LENGTH - text.length;

  return (
    <form className="joke-form" onSubmit={handleSubmit} noValidate>
      <h2 className="joke-form__title">🎤 Contale tu chiste al boilerplate</h2>
      <p className="joke-form__subtitle">
        Se publica al instante y lo ven todos los que pasen por acá.
      </p>

      <label className="joke-form__label" htmlFor="joke-author">
        Tu nombre
      </label>
      <input
        id="joke-author"
        className="joke-form__input"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Ej: Grace Hopper"
        maxLength={100}
      />

      <label className="joke-form__label" htmlFor="joke-text">
        Tu chiste
      </label>
      <textarea
        id="joke-text"
        className="joke-form__textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Una vez el boilerplate…"
        rows={4}
        maxLength={MAX_TEXT_LENGTH + 50}
      />
      <span
        className={`joke-form__counter ${remaining < 0 ? 'joke-form__counter--over' : ''}`}
      >
        {text.length}/{MAX_TEXT_LENGTH}
      </span>

      {validationError && <p className="joke-form__error">{validationError}</p>}
      {submitError && <p className="joke-form__error">{submitError}</p>}
      {success && (
        <p className="joke-form__success">
          ¡Chiste publicado! El boilerplate ya lo está presumiendo. 📦✨
        </p>
      )}

      <button className="joke-form__submit" type="submit" disabled={submitting}>
        {submitting ? 'Publicando…' : 'Publicar chiste'}
      </button>
    </form>
  );
}
