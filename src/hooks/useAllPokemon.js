import { useState, useEffect } from "react";
import axios from "axios";

import { ALL_POKE_API } from '../global/constants';

//will fetch the pokemon list
export const useAllPokemon = () => {

    const [data, setData] = useState(undefined);
    
    const getAllPokemon = async () => {
        const response = await axios.get(ALL_POKE_API)

        setData(response.data.results)
    }
    
    useEffect(() => {
        getAllPokemon()
    }, [])
    
    return data

}