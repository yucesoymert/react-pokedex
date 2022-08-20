import pokeball from '../../images/svg/pokeball.svg';
import './Header.css'

import { useNavigate } from 'react-router-dom';

export const Header = () => {
    let navigate = useNavigate();
    return (
        <div className="header">
            <div className="header-btn" onClick={() => {
                    navigate("/");
                }}>
                <img src={pokeball} className="pokeball-logo" alt="logo" />
            </div>
        </div>
    )
}

