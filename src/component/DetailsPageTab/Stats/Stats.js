import React from "react";
import { useParams } from 'react-router-dom';

import "./Stats.css"

import { useFetch } from "../../../hooks/useFetch";
import { API_URL } from "../../../global/constants";

export const Stats = () => {

    const {id} = useParams()

    const pokemon = useFetch(`${API_URL}${id}`)

    if (!pokemon) {
        return null;
    }

    return (
        <div className="stats-page">
            <div className="pokemon-stats">
                <div className="pokemon-text">
                    <h2 className="title">Base Stats</h2>
                </div>
                <div className="stats-container">
                    <div className="stats-context">{pokemon.stats.map( (stats) => {
                                    return (
                                        <div key={stats.stat.name} className="stats">
                                            <div style={{textTransform: "uppercase"}} className="stat-name">{stats.stat.name}</div>
                                            <div className="stat-value">{stats.base_stat}</div>
                                            <div className="empty-bar">
                                                    <div style={{width: `${Math.min(stats.base_stat / 150, 1) * 100}%`}}  className="filled-bar"></div>
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

