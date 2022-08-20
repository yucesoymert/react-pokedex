import './PokemonCard.css'
import React from "react";

import { usePokemon } from '../../hooks/usePokemon';

import { POKEMON_IMAGE_URL, POKEMON_TYPE_TO_COLOR } from '../../global/constants';

const PokemonCard = ( { pokemon } ) => {

    const id = pokemon.url.slice(0, -1).replace("https://pokeapi.co/api/v2/pokemon/", "")
    const imageId = id.padStart(3, '0');

    const pokemonDetails = usePokemon(id)

    if (!pokemonDetails) {
        return null;
    }

    const firstType = pokemonDetails.types[0];
    const typeColor = POKEMON_TYPE_TO_COLOR[firstType.type.name] ? POKEMON_TYPE_TO_COLOR[firstType.type.name]: "white";

    return (
        <a className="card" href={`/details/${id}`} style={{
            appearance: "none",
            textDecoration: "none",
            color: "black"
        }}>
            <div className="card-wrapper" >
                <div className="pokemon-image" style={{
                        backgroundColor: typeColor
                         }} >
                    <div className="pokemon-index">
                            #{id}
                    </div>
                    <div className='pokemon-avatar'>
                        <div className='circle-card'></div>
                        <div className="pokemon-picture">
                            <img src={`${POKEMON_IMAGE_URL}${imageId}.png`}/>
                        </div>
                    </div>
                </div>
                <div className="card-info">
                    <div className="pokemon-name">
                        {pokemon.name}
                    </div>
                    <div className="pokemon-types">
                        <div style={{
                                display: "flex",
                                gap: "0.6rem"
                            }}>{pokemonDetails.types.map( (type) => {
                            return (
                                <div className="pokemon-type" style={{
                                    textTransform:"uppercase",
                                    fontWeight:"600",
                                    fontSize: "0.9rem",
                                    color: POKEMON_TYPE_TO_COLOR[type.type.name]
                                    }}>{type.type.name}
                                </div>
                                )
                            })}</div>
                    </div>
                </div>
            </div>
        </a>
    )
}

export default PokemonCard;