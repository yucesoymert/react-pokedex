import React, { useState, useEffect } from "react";
import axios from "axios";

import { API_URL } from '../global/constants';

//will fetch the pokemon list
export const usePokemons = () => {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    
    const getPokemons = async (page) => {
        const response = await axios.get(API_URL, {params:{
            limit: 20,
            offset: page*20
        }})

        setData((previous) => {
            const newData = [...previous]
            newData[page] = response.data.results
            return newData; 
        })

        setCurrentPage(page)
    }
    
    useEffect(() => {
        getPokemons(0)
    }, [])
    
    const fetchNextPage = () => {
        getPokemons(currentPage+1)
    }

    return {
        data: [].concat(...data),
        fetchNextPage: fetchNextPage,
        currentPage: currentPage
    }

}