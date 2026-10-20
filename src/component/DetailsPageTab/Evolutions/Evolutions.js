import React, { Fragment } from "react";
import { Link, useParams } from 'react-router-dom';

import './Evolutions.css'

//svg
import forward from '../../../images/svg/forward.svg';

//hooks
import { useFetch } from "../../../hooks/useFetch";

import { API_URL, imageUrl, idFromUrl, typeColor } from '../../../global/constants';

// Flattens PokeAPI's evolution tree into stages, keeping every branch:
// Oddish -> Gloom -> [Vileplume, Bellossom] becomes [[oddish], [gloom], [vileplume, bellossom]].
export const evolutionStages = (chain) => {
    const stages = [];
    const walk = (node, depth) => {
        (stages[depth] = stages[depth] || []).push({ name: node.species.name, id: idFromUrl(node.species.url) });
        node.evolves_to.forEach((next) => walk(next, depth + 1));
    };
    if (chain) walk(chain, 0);
    return stages;
};

export const Evolutions = () => {

    const {id} = useParams()
    const pokemon = useFetch(`${API_URL}${id}`)
    const species = useFetch(pokemon?.species.url)
    const evolution = useFetch(species?.evolution_chain?.url)

    if (!pokemon || !evolution) {
        return null;
    }

    const stages = evolutionStages(evolution.chain);
    const color = typeColor(pokemon);

    return (
        <div className="evolutions-page">
            <div className="pokemon-data">
                <div className="pokemon-text">
                    <h2 className="title">Evolution Chain</h2>
                </div>
                {stages.length === 1 && <p className="evo-none">This Pokémon does not evolve.</p>}
                <div className="evo-container">
                    {stages.map((stage, i) => (
                        <Fragment key={i}>
                            {i > 0 && (
                                <div className="forward-icon">
                                    <img src={forward} alt="evolves into" />
                                </div>
                            )}
                            <div className={stage.length > 1 ? "evo-stage evo-branch" : "evo-stage"} style={{ "--cols": Math.min(stage.length, 3) }}>
                                {stage.map((p) => (
                                    <Link key={p.id} className="evo-context" to={`/details/${p.id}/evolutions`}>
                                        <div className="evo-avatar" style={{ backgroundColor: color }}>
                                            <img src={imageUrl(p.id)} alt={p.name} loading="lazy" />
                                        </div>
                                        <div className="evo-name">{p.name}</div>
                                    </Link>
                                ))}
                            </div>
                        </Fragment>
                    ))}
                </div>
            </div>
        </div>
    )
}
