import React from "react";

import { useParams } from 'react-router-dom';
import { usePokemon } from "../../../hooks/usePokemon";
import { usePokemonSpecies } from '../../../hooks/usePokemonSpecies';

export const Evolutions = () => {

    const {id} = useParams()
    const pokemonSpecies  = usePokemonSpecies(id)
    const pokemon = usePokemon(id)

    // const genderPercentage = pokemonSpecies.gender_rate !== -1 ? (pokemonSpecies.gender_rate / 8) * 100 : -1;

    if (!pokemon) {
        return null;
    }

    return (
        <div className="biography-page">
            <div className="pokemon-data">
                <div className="pokemon-text">
                    <h2 className="title">Evolutions</h2>
                </div>
                <div className="data-container">
                    <div className="grid-context">
                        <div className="stat-name">Species</div>
                        <div className="stat-value">{pokemonSpecies.genera[3].genus}</div>
                    </div>
                    <div className="grid-context">
                        <div className="stat-name">Weight</div>
                        <div className="stat-value">{pokemon.weight}</div>
                    </div>
                    <div className="grid-context">
                        <div className="stat-name">Height</div>
                        <div className="stat-value">{pokemon.height}</div>
                    </div>
                    <div className="grid-context">
                        <div className="stat-name">Abilities</div>
                        <ol className="stat-value ability-list">{pokemon.abilities.map( (abilities) => {
                            return (
                                <li>{abilities.ability.name}</li>
                            )
                        })}</ol>
                    </div>
                </div>
            </div>
        </div>
    )
}

