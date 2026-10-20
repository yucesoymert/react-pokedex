import React, { Fragment } from "react";
import { Link, useParams } from 'react-router-dom';

import './Evolutions.css'

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

const Arrow = () => (
    <svg className="evo-arrow" viewBox="0 0 40 12" role="img" aria-label="evolves into">
        <path d="M1 6h37M33 1l5 5-5 5" />
    </svg>
);

// each stage in its own primary type color (Eevee's branches differ); the viewed Pokémon's color until that loads
const EvoLink = ({ id, name, fallbackColor }) => {
    const pokemon = useFetch(`${API_URL}${id}`);
    return (
        <Link className="evo-context" to={`/details/${id}/evolutions`} style={{ "--type": pokemon ? typeColor(pokemon) : fallbackColor }}>
            <div className="evo-avatar">
                <img src={imageUrl(id)} alt={name} loading="lazy" />
            </div>
            <div className="evo-name">{name}</div>
        </Link>
    );
};

export const Evolutions = () => {

    const {id} = useParams()
    const pokemon = useFetch(`${API_URL}${id}`)
    const species = useFetch(pokemon?.species.url)
    const evolution = useFetch(species?.evolution_chain?.url)

    if (!pokemon || !evolution) {
        return (
            <div className="evolutions-page" aria-busy="true">
                <div className="pokemon-data">
                    <div className="pokemon-text">
                        <h2 className="title">Evolution Chain</h2>
                    </div>
                    <div className="evo-container">
                        {[0, 1, 2].map((i) => (
                            <Fragment key={i}>
                                {i > 0 && <Arrow />}
                                <div className="evo-context">
                                    <div className="skeleton evo-avatar" />
                                    <span className="skeleton skeleton-text evo-name-skel" />
                                </div>
                            </Fragment>
                        ))}
                    </div>
                </div>
            </div>
        );
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
                                <Arrow />
                            )}
                            <div className={stage.length > 1 ? "evo-stage evo-branch" : "evo-stage"} style={{ "--cols": Math.min(stage.length, 3) }}>
                                {stage.map((p) => <EvoLink key={p.id} {...p} fallbackColor={color} />)}
                            </div>
                        </Fragment>
                    ))}
                </div>
            </div>
        </div>
    )
}
