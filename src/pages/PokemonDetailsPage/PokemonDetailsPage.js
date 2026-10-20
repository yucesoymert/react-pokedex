import './PokemonDetailsPage.css'
import { useEffect, useRef } from 'react';
import { useNavigate, useLocation, useOutlet, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion';

//components
import AvatarCard from '../../component/DetailsPageTab/AvatarCard/AvatarCard';
import { EASE_OUT } from '../../global/constants';

const TABS = [
    { to: "", label: "Biography" },
    { to: "stats", label: "Stats" },
    { to: "evolutions", label: "Evolutions" },
];

// content slides away from the tab you're heading to: right tab -> enters from the right
const slide = {
    enter: (dir) => ({ opacity: 0, x: dir * 16 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.2, ease: EASE_OUT } },
    exit: (dir) => ({ opacity: 0, x: dir * -16, transition: { duration: 0.12 } }),
};

const PokemonDetailsPage = () => {

    let navigate = useNavigate();
    const { pathname } = useLocation();
    // useOutlet, not <Outlet/>: the exiting tab keeps rendering its own route instead of the new one
    const outlet = useOutlet();

    // "/details/25/stats" -> 1; "/details/25" and ".../biography" -> 0
    const index = Math.max(TABS.findIndex((t) => t.to === pathname.split('/')[3]), 0);
    const prevIndex = useRef(index);
    const dir = Math.sign(index - prevIndex.current);
    useEffect(() => { prevIndex.current = index; });

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
                            {/* "end" so Biography is only active on its own tab, not on stats/evolutions */}
                            {TABS.map((t) => (
                                <NavLink key={t.label} className="nav-item" to={t.to} end={t.to === ""}>
                                    {({ isActive }) => (
                                        <>
                                            {t.label}
                                            {isActive && <motion.span layoutId="tab-underline" className="tab-underline" transition={{ duration: 0.3, ease: EASE_OUT }} />}
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </nav>
                        <AnimatePresence mode="wait" initial={false} custom={dir}>
                            <motion.div key={pathname} className="tab-panel" custom={dir} variants={slide} initial="enter" animate="center" exit="exit">
                                {outlet}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonDetailsPage;
