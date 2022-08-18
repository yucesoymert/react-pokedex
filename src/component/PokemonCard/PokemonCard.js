import './PokemonCard.css'
import React from "react";
import { usePokemon } from '../../hooks/usePokemon';

const IMAGE_URL = "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/"

const typeColors = {
    grass: "rgb(138, 209, 102)",
    poison: "rgb(160, 64, 160)",
    fire: "rgb(245, 158, 95)",
    water: "rgb(129, 207, 224)",
    bug: "rgb(168, 184, 32)",
    normal: "rgb(196, 196, 164)",
    electric: "rgb(248, 208, 48)",
    ground: "rgb(224, 192, 104)",
    fairy: "rgb(238, 153, 172)",
    fighting: "rgb(204, 67, 59)",
    ice: "rgb(107, 192, 209)",
    flying: "rgb(255, 148, 112)",
    psychic: "rgb(248, 88, 136)",
    rock: "rgb(184, 160, 56)",
    ghost: "rgb(236, 178, 247)",
    dragon: "rgb(112, 56, 248)",
    dark: "rgb(112, 88, 72)",
    steel: "rgb(184, 184, 208)"
}

const PokemonCard = ( {pokemon} ) => {

    const id = pokemon.url.slice(0, -1).replace("https://pokeapi.co/api/v2/pokemon/", "")
    const imageId = id.padStart(3, '0');

    const pokemonDetails = usePokemon(id)

    if (!pokemonDetails) {
        return null;
    }

    const firstType = pokemonDetails.types[0];

    const typeColor = typeColors[firstType.type.name] ? typeColors[firstType.type.name]: "white";

    const pokemonName = pokemon.name;
    const newPokemonName = pokemonName[0].toUpperCase() + pokemonName.substring(1);

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
                            <img src={`${IMAGE_URL}${imageId}.png`}/>
                        </div>
                    </div>
                </div>
                <div className="card-info">
                    <div className="pokemon-name">
                        {newPokemonName}
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
                                    color: typeColors[type.type.name]
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