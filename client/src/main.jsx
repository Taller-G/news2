import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import FunFacts from './pages/FunFacts.jsx';
import Ubicacion from './pages/Ubicacion.jsx';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fun-facts" element={<FunFacts />} />
        <Route path="/ubicacion" element={<Ubicacion />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
