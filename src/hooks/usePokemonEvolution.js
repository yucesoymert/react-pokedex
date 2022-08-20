import { useState, useEffect } from "react";
import axios from "axios";

export const usePokemonEvolution = (url) => {

    const [chainUrl, setChainUrl] = useState();
    
    const getPokemonEvolution = async (evoChainUrl) => {
        const response = await axios.get(`${evoChainUrl}`)

        setChainUrl(response.chainUrl)
    }

    useEffect(() => {
        getPokemonEvolution(url)
        
        return chainUrl
    }, [])
}
