import './PokemonDetailsPage.css'
import { useNavigate, NavLink, Outlet } from 'react-router-dom'

//components
import AvatarCard from '../../component/DetailsPageTab/AvatarCard/AvatarCard';

const PokemonDetailsPage = () => {

    let navigate = useNavigate();

    return (
        <div className='detail-page'>
            <div className="back-btn">
                <button type="button" onClick={() => navigate("/")}>Go Back</button>
            </div>
            <div className='detail-card'>
                <AvatarCard />
                <div className='info-container'>
                    <div className='right-side'>
                        <nav className='nav-bar'>
                            <NavLink className="nav-item" to="biography">Biography</NavLink>
                            <NavLink className="nav-item" to="stats">Stats</NavLink>
                            <NavLink className="nav-item" to="evolutions">Evolutions</NavLink>
                        </nav>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonDetailsPage;