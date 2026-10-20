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
      {/* styled as the top of a Pokédex: lens + status lights, the input is its screen */}
      <form className="search-container" role="search" onSubmit={(e) => e.preventDefault()}>
        <div className="dex-lights" aria-hidden="true">
          <span className="dex-lens" />
          <span className="dex-led red" />
          <span className="dex-led yellow" />
          <span className="dex-led green" />
        </div>
        <div className='search-inputs'>
          <img src={searchIcon} className="search-ico" alt="" />
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="search-bar"
            placeholder="Search for a Pokémon..."
            aria-label="Search for a Pokémon"
            type="search"
          />
        </div>
        <button className="search-btn" type="submit">
          Search
        </button>
      </form>
      {query && results.length === 0 ? (
        <div className="no-results" role="status">
          <svg className="split-ball" viewBox="0 -32 120 156" aria-hidden="true">
            <ellipse className="ball-shadow" cx="60" cy="118" rx="44" ry="5" />
            <g className="ball-bottom">
              <path d="M12 62a48 48 0 0 0 96 0Z" />
              <path d="M49 62a11 11 0 0 0 22 0Z" className="ball-button" />
            </g>
            <g className="ball-top">
              <path d="M12 50a48 48 0 0 1 96 0Z" />
              <path d="M49 50a11 11 0 0 1 22 0Z" className="ball-button" />
            </g>
          </svg>
          <h2>No Pokémon named “{filter.trim()}”</h2>
          <p>Check the spelling, or search part of a name, like “char”.</p>
          <button type="button" className="clear-btn" onClick={() => setFilter("")}>Clear search</button>
        </div>
      ) : (
        <div className="pokemon-list">
          {results.map((p) => <PokemonCard key={p.name} pokemon={p} />)}
        </div>
      )}
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
