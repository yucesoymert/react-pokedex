import React from "react";

import { POKEMON_IMAGE_URL } from '../../../global/constants';

const Pokemon = ({ pokemon}) => {

    const id = pokemon.url.slice(0, -1).replace("https://pokeapi.co/api/v2/pokemon/", "")

    return (
        <div>
            <img src={`${POKEMON_IMAGE_URL}${id}.png`}/>
            {pokemon.name}
            <a href={`/details/${id}`}>details</a>
        </div>
    )
}

export default Pokemon;