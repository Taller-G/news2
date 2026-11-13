import './SkeletonGrid.css';

export default function SkeletonGrid({ count = 6 }) {
  return (
    <div className="skeleton-grid" role="status" aria-label="Cargando chistes…">
      {Array.from({ length: count }).map((_, i) => (
        <div className="skeleton-grid__card" key={i}>
          <div className="skeleton-grid__line" />
          <div className="skeleton-grid__line" />
          <div className="skeleton-grid__line skeleton-grid__line--short" />
        </div>
      ))}
    </div>
  );
}
