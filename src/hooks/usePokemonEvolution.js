import { useState, useEffect } from "react";
import axios from "axios";

export const usePokemonEvolution = (url) => {

    const [data, setData] = useState(undefined);
    
    const getPokemonEvolution = async (evoChainUrl) => {
        const response = await axios.get(`${evoChainUrl}`)

        setData(response.data)
    }

    useEffect(() => {
        getPokemonEvolution(url)
    }, [])

    return data
}
