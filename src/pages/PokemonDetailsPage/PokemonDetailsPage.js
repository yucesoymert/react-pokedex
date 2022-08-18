import './PokemonDetailsPage.css'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'

import { useParams } from 'react-router-dom';
import { usePokemon } from '../../hooks/usePokemon';
import { usePokemonSpecies } from '../../hooks/usePokemonSpecies';

//components
import AvatarCard from '../../component/DetailsPageTab/AvatarCard/AvatarCard';
import { Biography } from '../../component/DetailsPageTab/Biography/Biography';
import { Stats } from '../../component/DetailsPageTab/Stats/Stats';
import { Evolutions } from '../../component/DetailsPageTab/Evolutions/Evolutions';

const PokemonDetailsPage = () => {
    
    const {id} = useParams()
    const pokemon = usePokemon(id)
    const pokemonSpecies  = usePokemonSpecies(id)

    return (
        <div className='detail-page'>
            <div className='detail-card'>
                <AvatarCard />
                <div className='right-side'>
                    <nav className='nav-bar'>
                        <NavLink className="nav-item" to="biography">Biography</NavLink>
                        <NavLink className="nav-item" to="stats">Stats</NavLink>
                        <NavLink className="nav-item" to="evolutions">Evolutions</NavLink>
                    </nav>
                    <div className='info-container'>
                        <Routes>
                            <Route path="biography" element={<Biography />}/>
                            <Route path="stats" element={<Stats />}/>
                            <Route path="evolutions" element={<Evolutions />}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonDetailsPage;