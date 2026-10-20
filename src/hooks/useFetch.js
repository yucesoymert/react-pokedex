import { useState, useEffect } from "react";

// ponytail: unbounded in-memory cache; fine for ~1,400 Pokémon, swap for an LRU if it ever grows.
const cache = new Map();
// settled responses, so a revisit renders on the first pass instead of flashing the loading state
const settled = new Map();

export const getJson = (url) => {
    if (!cache.has(url)) {
        cache.set(url, fetch(url).then((res) => {
            if (!res.ok) throw new Error(`${res.status} ${url}`);
            return res.json();
        }).then((data) => {
            settled.set(url, data);
            return data;
        }).catch((err) => {
            cache.delete(url); // let a later render retry
            throw err;
        }));
    }
    return cache.get(url);
};

// Fetches JSON from url (skips while url is empty). Ignores responses for a url that is no longer current.
export const useFetch = (url) => {
    const [state, setState] = useState({ url: undefined, data: undefined });

    useEffect(() => {
        if (!url) return;
        let current = true;
        getJson(url)
            .then((data) => current && setState({ url, data }))
            .catch((err) => console.error(err));
        return () => { current = false; };
    }, [url]);

    return state.url === url ? state.data : settled.get(url);
};
