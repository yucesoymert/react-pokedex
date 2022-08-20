import { useNavigate } from 'react-router-dom';

import './Header.css'
import pokeball from '../../images/svg/pokeball.svg';

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

