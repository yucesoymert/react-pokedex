import { useState, useEffect } from "react";
import axios from "axios";

const SPECIES_URL = "https://pokeapi.co/api/v2/pokemon-species/"

export const usePokemonSpecies = (id) => {

    const [data, setData] = useState(undefined);
    
    const getPokemonSpecies = async (pokemonId) => {
        const response = await axios.get(`${SPECIES_URL}${pokemonId}`)

        setData(response.data)
    }

    useEffect(() => {
        getPokemonSpecies(id)
    }, [])

    return data
}
