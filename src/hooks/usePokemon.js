import { useState, useEffect } from "react";
import axios from "axios";

import { API_URL } from '../global/constants';

export const usePokemon = (id) => {

    const [data, setData] = useState(undefined);
    
    const getPokemon = async (pokemonId) => {
        const response = await axios.get(`${API_URL}${pokemonId}`)

        setData(response.data)
    }

    useEffect(() => {
        getPokemon(id)
    }, [id])

    return data
}

