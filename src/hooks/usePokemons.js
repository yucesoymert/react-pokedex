import { useState, useEffect } from "react";

import { API_URL } from '../global/constants';
import { getJson } from './useFetch';

const PAGE_SIZE = 45;

// Paged Pokémon list for the home page.
export const usePokemons = () => {

    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(false);

    const getPage = async (page) => {
        setLoading(true);
        try {
            const data = await getJson(`${API_URL}?limit=${PAGE_SIZE}&offset=${page * PAGE_SIZE}`);
            setPages((previous) => {
                const next = [...previous];
                next[page] = data.results;
                return next;
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getPage(0)
    }, [])

    return {
        data: pages.flat(),
        // pages.length is the next page to load; blocked while a request is in flight so double clicks don't skip ahead
        fetchNextPage: () => !loading && getPage(pages.length),
        loading,
    }
}
