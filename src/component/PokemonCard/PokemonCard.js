import './PokemonCard.css'
import React from "react";
import { Link } from 'react-router-dom';

import { useFetch } from '../../hooks/useFetch';

import { imageUrl, idFromUrl, typeColor, POKEMON_TYPE_TO_COLOR } from '../../global/constants';

const PokemonCard = ( { pokemon } ) => {

    const id = idFromUrl(pokemon.url)

    const pokemonDetails = useFetch(pokemon.url)

    if (!pokemonDetails) {
        return <div className="card-wrapper skeleton" aria-hidden="true" />;
    }

    return (
        <Link className="card" to={`/details/${id}`} style={{
            appearance: "none",
            textDecoration: "none",
            color: "black"
        }}>
            <div className="card-wrapper" >
                <div className="pokemon-image" style={{
                        backgroundColor: typeColor(pokemonDetails)
                         }} >
                    <div className="pokemon-index">
                            #{id}
                    </div>
                    <div className='pokemon-avatar'>
                        <div className='circle-card'></div>
                        <div className="pokemon-picture">
                            <img src={imageUrl(id)} alt={pokemon.name} loading="lazy"/>
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
                                <div key={type.type.name} className="pokemon-type" style={{
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
        </Link>
    )
}

export default PokemonCard;
