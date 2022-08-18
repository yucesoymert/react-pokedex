import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//pages
import HomePage from './pages/HomePage/HomePage';
import PokemonDetailsPage from './pages/PokemonDetailsPage/PokemonDetailsPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';

//components
import { Header } from './component/Header/Header';

function App() {
  return (
    <Router className="app-container">
      <Header />
      <Routes className="pokemon-container">
        <Route path="/" element={<HomePage />}/>
        <Route path="/details/:id/*" element={<PokemonDetailsPage />}/>
        {/* <Route path="*" element={<ErrorPage />}/> */}
      </Routes>
    </Router>
  );
}

export default App;
