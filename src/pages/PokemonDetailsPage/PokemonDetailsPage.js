import './PokemonDetailsPage.css'
import { useState } from "react";
import { useNavigate, NavLink, Outlet } from 'react-router-dom'

//components
import AvatarCard from '../../component/DetailsPageTab/AvatarCard/AvatarCard';
import { Biography } from '../../component/DetailsPageTab/Biography/Biography';

const PokemonDetailsPage = () => {

    let navigate = useNavigate();

    const [section, setSection] = useState("biography")

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
                            <NavLink className="nav-item " onClick={() => setSection("stats")} to="biography" >Biography</NavLink>
                            <NavLink className="nav-item" onClick={() => setSection("stats")} to="stats">Stats</NavLink>
                            <NavLink className="nav-item" onClick={() => setSection("evolutions")} to="evolutions">Evolutions</NavLink>
                        </nav>
                        <div>
                            {(section === "biography") ? <Biography /> : ""  }  
                        </div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonDetailsPage;