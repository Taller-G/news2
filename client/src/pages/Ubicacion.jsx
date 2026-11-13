import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Ubicacion.css';

const TICK_MS = 2200;
const ACTIVE_TARGET = 20;

// Ciudades con coordenadas reales; los contadores que "viven" ahí son
// completamente inventados.
const CITIES = [
  { name: 'Buenos Aires', lat: -34.6, lon: -58.4 },
  { name: 'São Paulo', lat: -23.5, lon: -46.6 },
  { name: 'Lima', lat: -12.0, lon: -77.0 },
  { name: 'Bogotá', lat: 4.7, lon: -74.1 },
  { name: 'Ciudad de México', lat: 19.4, lon: -99.1 },
  { name: 'Nueva York', lat: 40.7, lon: -74.0 },
  { name: 'San Francisco', lat: 37.8, lon: -122.4 },
  { name: 'Toronto', lat: 43.7, lon: -79.4 },
  { name: 'Reikiavik', lat: 64.1, lon: -21.9 },
  { name: 'Madrid', lat: 40.4, lon: -3.7 },
  { name: 'Londres', lat: 51.5, lon: -0.1 },
  { name: 'París', lat: 48.9, lon: 2.4 },
  { name: 'Berlín', lat: 52.5, lon: 13.4 },
  { name: 'Roma', lat: 41.9, lon: 12.5 },
  { name: 'Estocolmo', lat: 59.3, lon: 18.1 },
  { name: 'Lagos', lat: 6.5, lon: 3.4 },
  { name: 'El Cairo', lat: 30.0, lon: 31.2 },
  { name: 'Nairobi', lat: -1.3, lon: 36.8 },
  { name: 'Ciudad del Cabo', lat: -33.9, lon: 18.4 },
  { name: 'Moscú', lat: 55.8, lon: 37.6 },
  { name: 'Estambul', lat: 41.0, lon: 29.0 },
  { name: 'Dubái', lat: 25.2, lon: 55.3 },
  { name: 'Bombay', lat: 19.1, lon: 72.9 },
  { name: 'Nueva Delhi', lat: 28.6, lon: 77.2 },
  { name: 'Bangkok', lat: 13.8, lon: 100.5 },
  { name: 'Singapur', lat: 1.4, lon: 103.8 },
  { name: 'Tokio', lat: 35.7, lon: 139.7 },
  { name: 'Seúl', lat: 37.6, lon: 127.0 },
  { name: 'Sídney', lat: -33.9, lon: 151.2 },
  { name: 'Auckland', lat: -36.8, lon: 174.8 },
];

// Proyección equirectangular sobre el viewBox 1000x500 del SVG.
const project = (lon, lat) => ({
  x: ((lon + 180) / 360) * 1000,
  y: ((90 - lat) / 180) * 500,
});

const randomCount = () => 1 + Math.floor(Math.random() * 48);

function buildInitialMarkers() {
  const shuffled = [...CITIES].sort(() => Math.random() - 0.5);
  return shuffled.map((city, i) => ({
    ...city,
    active: i < ACTIVE_TARGET,
    count: randomCount(),
  }));
}

// Siluetas muy simplificadas de los continentes (misma proyección que arriba).
const CONTINENTS = [
  '33,67 111,56 167,50 250,50 306,78 347,106 319,125 292,144 278,167 272,181 250,194 231,206 208,194 181,167 153,139 139,111 69,89',
  '231,206 253,200 286,231 278,239 247,217',
  '286,231 333,236 361,250 403,269 394,292 367,319 342,347 319,375 311,400 300,389 297,361 306,333 306,300 283,264',
  '472,150 475,131 494,117 486,89 514,78 528,89 556,56 583,56 611,64 611,83 583,106 611,125 578,136 561,147 533,144 508,150',
  '453,208 453,192 472,161 500,150 528,147 556,161 589,164 619,219 642,222 611,264 597,306 589,331 569,344 550,344 533,300 522,264 514,239 478,239 464,225',
  '611,83 667,56 750,39 833,44 917,56 994,67 994,78 944,83 931,106 889,125 856,144 839,167 800,200 792,228 778,233 772,206 750,192 736,200 717,228 700,200 683,183 661,183 639,172 622,167 597,153 578,136 611,125 583,106',
  '817,311 839,297 867,283 894,281 906,292 914,308 925,325 919,342 906,358 889,356 875,347 858,339 844,342 825,347 817,333 814,319',
  '375,83 356,75 339,64 333,50 347,39 389,28 431,33 444,47 417,61 389,75',
];

const ISLANDS = [
  { cx: 883, cy: 147, rx: 6, ry: 16 }, // Japón
  { cx: 806, cy: 256, rx: 20, ry: 5 }, // Indonesia
  { cx: 833, cy: 264, rx: 12, ry: 4 },
  { cx: 978, cy: 364, rx: 5, ry: 14 }, // Nueva Zelanda
  { cx: 631, cy: 303, rx: 6, ry: 14 }, // Madagascar
];

export default function Ubicacion() {
  const [markers, setMarkers] = useState(buildInitialMarkers);

  // Cada tick un contador "se muda": se apaga uno, se enciende otro, y
  // alguno suma actividad. Puro teatro, pero convincente.
  useEffect(() => {
    const interval = setInterval(() => {
      setMarkers((prev) => {
        const next = prev.map((m) => ({ ...m }));
        const actives = next.filter((m) => m.active);
        const inactives = next.filter((m) => !m.active);
        if (actives.length && inactives.length) {
          const off = actives[Math.floor(Math.random() * actives.length)];
          const on = inactives[Math.floor(Math.random() * inactives.length)];
          off.active = false;
          on.active = true;
          on.count = randomCount();
        }
        const lucky = next[Math.floor(Math.random() * next.length)];
        if (lucky.active) lucky.count += 1;
        return next;
      });
    }, TICK_MS);
    return () => clearInterval(interval);
  }, []);

  const activeMarkers = markers.filter((m) => m.active);
  const total = activeMarkers.reduce((sum, m) => sum + m.count, 0);

  return (
    <main className="ubicacion">
      <nav className="ubicacion__nav">
        <Link to="/">← Volver al inicio</Link>
        <Link to="/fun-facts">🎭 Fun Facts</Link>
      </nav>

      <header className="ubicacion__hero">
        <h1 className="ubicacion__title">📍 Contadores activos en el mundo</h1>
        <p className="ubicacion__intro">
          Vigilancia satelital de contadores en tiempo real. Cada punto es un
          contador contando ahora mismo, en algún lugar del planeta, sin que
          nadie se lo haya pedido.
        </p>
      </header>

      <p className="ubicacion__live" role="status">
        <span className="ubicacion__live-dot" aria-hidden="true" /> EN VIVO ·{' '}
        {activeMarkers.length} ubicaciones · {total} contadores contando
      </p>

      <section className="ubicacion__map-wrap">
        <svg
          className="ubicacion__map"
          viewBox="0 0 1000 500"
          role="img"
          aria-label="Mapa mundial con contadores activos marcados como puntos pulsantes"
        >
          <g className="ubicacion__land">
            {CONTINENTS.map((points) => (
              <polygon key={points} points={points} />
            ))}
            {ISLANDS.map((isla) => (
              <ellipse key={`${isla.cx}-${isla.cy}`} {...isla} />
            ))}
          </g>

          {markers.map((m, i) => {
            const { x, y } = project(m.lon, m.lat);
            return (
              <g
                key={m.name}
                className={`ubicacion__marker${m.active ? ' is-active' : ''}`}
                transform={`translate(${x} ${y})`}
                style={{ '--pulse-delay': `${(i % 7) * 0.35}s` }}
              >
                <circle className="ubicacion__halo" r="10" />
                <circle className="ubicacion__dot" r="4" />
                <text className="ubicacion__label" y="-14" textAnchor="middle">
                  {m.name} · ×{m.count}
                </text>
              </g>
            );
          })}
        </svg>
      </section>

      <footer className="ubicacion__footer">
        * Ubicaciones 100% inventadas. El boilerplate no sabe dónde vive nadie;
        apenas sabe dónde quedó su package.json.
      </footer>
    </main>
  );
}
