import React from "react";
import "./Biography.css"

import male from '../../../images/png/male.png';
import female from '../../../images/png/female.png';

import { useParams } from 'react-router-dom';
import { useFetch } from "../../../hooks/useFetch";
import { API_URL, english } from '../../../global/constants';

// shimmer placeholder sized like the text it stands in for
const Skel = ({ w }) => <span className="skeleton skeleton-text" style={{ width: w }} />;

export const Biography = () => {

    const {id} = useParams()
    const pokemon = useFetch(`${API_URL}${id}`)
    const pokemonSpecies = useFetch(pokemon?.species.url)

    // labels render right away; while loading, each value is a placeholder in the same spot
    const ready = pokemon && pokemonSpecies;

    // gender_rate is the female share in eighths, -1 = genderless
    const genderPercentage = ready && (pokemonSpecies.gender_rate !== -1 ? (pokemonSpecies.gender_rate / 8) * 100 : -1);
    // flavor texts keep the game's line breaks and form feeds
    const flavorText = ready && english(pokemonSpecies.flavor_text_entries)?.flavor_text.replace(/\s+/g, " ");

    return (
        <div className="biography-page" aria-busy={!ready}>
            <div className="pokemon-data">
                <div className="pokemon-text">
                <h2 className="title">Pokémon Data</h2>
                    <div className="definition">{ready ? flavorText : <><Skel w="100%" /><Skel w="65%" /></>}</div>
                </div>
                <div className="data-container">
                    <div className="grid-context">
                        <div className="stat-name">Species</div>
                        <div className="stat-value">{ready ? english(pokemonSpecies.genera)?.genus : <Skel w="130px" />}</div>
                    </div>
                    <div className="grid-context">
                        <div className="stat-name">Weight</div>
                        <div className="stat-value" style={{ textTransform: "none" }}>{ready ? `${pokemon.weight / 10} kg` : <Skel w="60px" />}</div>
                    </div>
                    <div className="grid-context">
                        <div className="stat-name">Height</div>
                        <div className="stat-value" style={{ textTransform: "none" }}>{ready ? `${pokemon.height / 10} m` : <Skel w="50px" />}</div>
                    </div>
                    <div className="grid-context">
                        <div className="stat-name">Abilities</div>
                        {ready ? (
                        <ol className="stat-value ability-list">{pokemon.abilities.map( (abilities) => {
                            return (
                                <li key={abilities.ability.name}>{abilities.ability.name}</li>
                            )
                        })}</ol>
                        ) : <div className="stat-value"><Skel w="240px" /></div>}
                    </div>
                    <div className="grid-context">
                        <div className="stat-name">Gender</div>
                        <div className="stat-value">
                            {!ready ? <Skel w="140px" /> : (
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
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="training-container">
                <h2 className="title">Training</h2>
                <div className="data-container">
                    <div className="grid-context">
                        <div className="stat-name">Base Exp</div>
                        <div className="stat-value">{ready ? pokemon.base_experience ?? "—" : <Skel w="40px" />}</div>
                    </div>
                    <div className="grid-context">
                        <div className="stat-name">Base Happiness</div>
                        <div className="stat-value">{ready ? pokemonSpecies.base_happiness ?? "—" : <Skel w="40px" />}</div>
                    </div>
                    <div className="grid-context">
                        <div className="stat-name">Catch Rate</div>
                        <div className="stat-value">{ready ? `${((pokemonSpecies.capture_rate / 255) * 100).toFixed(1)}%` : <Skel w="50px" />}</div>
                    </div>
                    <div className="grid-context">
                        <div className="stat-name">Growth Rate</div>
                        <div className="stat-value">{ready ? pokemonSpecies.growth_rate.name : <Skel w="90px" />}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
