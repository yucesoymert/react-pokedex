import React from "react";
import "./Biography.css"

import male from '../../../images/png/male.png';
import female from '../../../images/png/female.png';

import { useParams } from 'react-router-dom';
import { usePokemon } from "../../../hooks/usePokemon";
import { usePokemonSpecies } from '../../../hooks/usePokemonSpecies';

export const Biography = () => {

    const {id} = useParams()
    const pokemon = usePokemon(id)
    const pokemonSpecies  = usePokemonSpecies(id)

    const genderPercentage = pokemonSpecies?.gender_rate !== -1 ? (pokemonSpecies?.gender_rate / 8) * 100 : -1;

    if (!pokemon) {
        return null;
    }

    return (
        <div className="biography-page">
            <div className="pokemon-data">
                <div className="pokemon-text">
                <h2 className="title">Pokémon Data</h2>
                    <div className="definition">{pokemonSpecies?.flavor_text_entries[2]?.flavor_text}</div>
                </div>
                <div className="data-container">
                    <div className="grid-context">
                        <div className="stat-name">Species</div>
                        <div className="stat-value">{pokemonSpecies?.genera[3]?.genus}</div>
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
                    <div className="grid-context">
                        <div className="stat-name">Gender</div>
                        <div className="stat-value">
                            <div className="gender-types">
                                {genderPercentage === -1 ? (
                                <span>Genderless</span>
                                ) : (
                                <>
                                <div className="gender-type">
                                    <img
                                        className="gender-icon"
                                        src={male}
                                        alt="male"
                                    />
                                    <div>{100 - genderPercentage}%</div>
                                </div>
                                <div className="gender-type">
                                    <img
                                        className="gender-icon"
                                        src={female}
                                        alt="female"
                                    />
                                    <div>{genderPercentage}%</div>
                                </div>
                                </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="training-container">
                <h2 className="title">Training</h2>
                <div className="data-container">
                    <div className="grid-context">
                        <div className="stat-name">Base Exp</div>
                        <div className="stat-value">{pokemon?.base_experience}</div>
                    </div>
                    <div className="grid-context">
                        <div className="stat-name">Base Happiness</div>
                        <div className="stat-value">{pokemonSpecies?.base_happiness}</div>
                    </div>
                    <div className="grid-context">
                        <div className="stat-name">Catch Rate</div>
                        <div className="stat-value">{(((pokemonSpecies?.capture_rate) / 255) * 100).toFixed(1)}%</div>
                    </div>
                    <div className="grid-context">
                        <div className="stat-name">Growth Rate</div>
                        <div className="stat-value">{pokemonSpecies?.growth_rate.name}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

