import { useState, useEffect } from "react";
import axios from "axios";

import { POKEMON_SPECIES_URL } from '../global/constants';

export const usePokemonSpecies = (id) => {

    const [data, setData] = useState(undefined);
    
    const getPokemonSpecies = async (pokemonId) => {
        const response = await axios.get(`${POKEMON_SPECIES_URL}${pokemonId}`)

        setData(response.data)
    }

    useEffect(() => {
        getPokemonSpecies(id)
    }, [])

    return data
}
