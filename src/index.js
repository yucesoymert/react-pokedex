import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//style
import './index.css';
import './component/Header/Header.css'

import App from './App';

//components
import { Header } from './component/Header/Header';
import PokemonDetailsPage from './pages/PokemonDetailsPage/PokemonDetailsPage';
import { Biography } from './component/DetailsPageTab/Biography/Biography';
import { Stats } from './component/DetailsPageTab/Stats/Stats';
import { Evolutions } from './component/DetailsPageTab/Evolutions/Evolutions';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Header />
    <Routes className="pokemon-container">
      <Route path="/" element={<App />}></Route>
      <Route path="/details/:id/*" element={<PokemonDetailsPage />}>
        <Route path="biography" element={<Biography />} />
        <Route path="stats" element={<Stats />} />
        <Route path="evolutions" element={<Evolutions />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
