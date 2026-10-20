import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { animate, useReducedMotion } from "framer-motion";

import "./Stats.css"

import { useFetch } from "../../../hooks/useFetch";
import { API_URL, EASE_OUT } from "../../../global/constants";

// bar fill: 700ms, 60ms apart per row (see Stats.css); the number runs in step with its bar
const FILL_MS = 700, STEP_MS = 60, START_MS = 150;

// every Pokémon has these six, in this order; used for the loading rows
const STAT_NAMES = ["hp", "attack", "defense", "special-attack", "special-defense", "speed"].map((name) => ({ stat: { name } }));

const CountUp = ({ value, delay }) => {
    const reduced = useReducedMotion();
    const [shown, setShown] = useState(reduced ? value : 0);

    useEffect(() => {
        if (reduced) return setShown(value);
        const controls = animate(0, value, {
            duration: FILL_MS / 1000,
            delay: delay / 1000,
            ease: EASE_OUT,
            onUpdate: (v) => setShown(Math.round(v)),
        });
        return () => controls.stop();
    }, [value, delay, reduced]);

    return shown;
};

export const Stats = () => {

    const {id} = useParams()

    const pokemon = useFetch(`${API_URL}${id}`)

    return (
        <div className="stats-page">
            <div className="pokemon-stats">
                <div className="pokemon-text">
                    <h2 className="title">Base Stats</h2>
                </div>
                <div className="stats-container">
                    {/* while loading: the same rows with empty bars, so the fill starts right where the eye already is */}
                    <div className="stats-context" aria-busy={!pokemon}>{(pokemon?.stats ?? STAT_NAMES).map( (stats, i) => {
                                    const delay = START_MS + i * STEP_MS;
                                    return (
                                        <div key={stats.stat.name} className="stats">
                                            <div style={{textTransform: "uppercase"}} className="stat-name">{stats.stat.name}</div>
                                            <div className="stat-value" aria-label={stats.base_stat}>
                                                {pokemon ? <CountUp value={stats.base_stat} delay={delay} /> : <span className="skeleton skeleton-text" style={{ width: 32 }} />}
                                            </div>
                                            <div className="empty-bar">
                                                    {pokemon && <div style={{width: `${Math.min(stats.base_stat / 150, 1) * 100}%`, animationDelay: `${delay}ms`}}  className="filled-bar"></div>}
                                            </div>
                                        </div>
                                    )
                                })}
                    </div>
                </div>
            </div>
        </div>
    )
}
