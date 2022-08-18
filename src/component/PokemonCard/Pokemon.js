import React from "react";

const IMAGE_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"

const Pokemon = ({ pokemon}) => {

    const id = pokemon.url.slice(0, -1).replace("https://pokeapi.co/api/v2/pokemon/", "")

    return (
        <div>
            <img src={`${IMAGE_URL}${id}.png`}/>
            {pokemon.name}
            <a href={`/details/${id}`}>details</a>
        </div>
    )
}

export default Pokemon;