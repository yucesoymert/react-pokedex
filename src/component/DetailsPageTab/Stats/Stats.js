import React from "react";
import { useParams } from 'react-router-dom';

import "./Stats.css"

import { usePokemon } from "../../../hooks/usePokemon";

export const Stats = () => {

    const {id} = useParams()

    const pokemon = usePokemon(id)

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
                                        <div className="stats">
                                            <div style={{textTransform: "uppercase"}} className="stat-name">{stats.stat.name}</div>
                                            <div className="stat-value">{stats.base_stat}</div>
                                            <div className="empty-bar">
                                                    <div style={{width: `${(stats.base_stat/150)*100}%`}}  className="filled-bar"></div>
                                            </div>
                                        </div>
                                    )
                                })}
                    </div>
                </div>
                <div className="text">
                Min values are calculated for level 100 Pokemon. Minimum values are based on 0 EVs & 0 IVs.
                </div>
            </div>
        </div>
    )
}

