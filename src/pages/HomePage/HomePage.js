import React, { useState } from "react";

import "./HomePage.css";
import searchIcon from '../../images/svg/search.svg';

//components
import { usePokemons } from "../../hooks/usePokemons";
import { useFetch } from "../../hooks/useFetch";
import PokemonCard from "../../component/PokemonCard/PokemonCard";
import { ALL_POKE_API } from "../../global/constants";

// ponytail: each card fetches its own details, so search results are capped; add paging to search if 45 isn't enough.
const MAX_RESULTS = 45;

const HomePage = () => {

  const { data, fetchNextPage, loading } = usePokemons();
  // the full name list (~1,350 entries, names only) so search isn't limited to the pages loaded so far
  const all = useFetch(ALL_POKE_API);

  const [ filter, setFilter ] = useState("")
  const query = filter.trim().toLowerCase();

  const results = query
    ? (all?.results || data).filter((p) => p.name.includes(query)).slice(0, MAX_RESULTS)
    : data;

  return (
    <div className="homepage">
      <form className="search-container" onSubmit={(e) => e.preventDefault()}>
        <div className='search-inputs'>
          <img src={searchIcon} className="search-ico" alt="" />
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="search-bar"
            placeholder="Search for a Pokemon..."
            aria-label="Search for a Pokemon"
            type="search"
          />
        </div>
        <div className="btn">
          <button className="search-btn" type="submit">
            Search
          </button>
        </div>
      </form>
      <div className="pokemon-list">
        {results.map((p) => <PokemonCard key={p.name} pokemon={p} />)}
      </div>
      {query && results.length === 0 && <p className="no-results">No Pokémon named "{filter}".</p>}
      {!query && (
        <div className="load-more">
          <button className="load-btn" type="button" disabled={loading} onClick={fetchNextPage}>
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
