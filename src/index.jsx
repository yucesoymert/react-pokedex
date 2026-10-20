import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';

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
import { EASE_OUT } from './global/constants';

const AnimatedRoutes = () => {
  const location = useLocation();

  // keyed by page ("" or "details"), so switching tabs or Pokémon doesn't replay the page transition
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname.split('/')[1]}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: EASE_OUT } }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
      >
        {/* location prop: the exiting page keeps rendering (and useLocation-ing) the URL it left */}
        <Routes location={location}>
          <Route path="/" element={<App />}></Route>
          <Route path="/details/:id" element={<PokemonDetailsPage />}>
            <Route index element={<Biography />} />
            <Route path="biography" element={<Biography />} />
            <Route path="stats" element={<Stats />} />
            <Route path="evolutions" element={<Evolutions />} />
          </Route>
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <MotionConfig reducedMotion="user">
      <Header />
      <AnimatedRoutes />
    </MotionConfig>
  </BrowserRouter>
);
