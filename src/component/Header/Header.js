import pokeball from 'C:/Users/merty/bootcamp/react-pokedex/src/svg/pokeball.svg';
import './Header.css'

import { useNavigate } from 'react-router-dom';


export const Header = () => {
    let navigate = useNavigate();
    return (
        <div className="header">
            <div className="header__btn" onClick={() => {
                    navigate("/");
                }}>
                <img src={pokeball} className="pokeball__logo" alt="logo" />
            </div>
        </div>
    )
}

