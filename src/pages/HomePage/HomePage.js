import React, { useState } from "react";

import "./HomePage.css";
import searchIcon from '../../images/svg/search.svg';

//components
import { usePokemons } from "../../hooks/usePokemons";
import PokemonCard from "../../component/PokemonCard/PokemonCard";
import { useAllPokemon } from "../../hooks/useAllPokemon";

const HomePage = () => {

  const { data, fetchNextPage } = usePokemons();

  const [ filter, setFilter ] = useState("")

  const handleSearchChange = (e) => {
      setFilter(e.target.value)
  }

  return (
    <div className="homepage">
      <div className="search-container">
        <div className='search-inputs'>
          <img src={searchIcon} className="search-ico" alt="ico" />
          <input
            onChange={handleSearchChange}
            className="search-bar"
            placeholder="Search for a Pokemon..."
            variant="standart"
            type="text"
          >
          </input>
        </div>
        <div className="btn">
          <button className="search-btn" onClick={() => handleSearchChange()}>
            Search
          </button>
        </div> 
      </div>
      <div className="pokemon-list">
        {data.map((p) => (
          p.name.includes(filter) &&
          <PokemonCard pokemon={p} />
        ))}
      </div>
      <div className="load-more">
        <button className="load-btn" type="button" onClick={() => fetchNextPage()}>Load More</button>
      </div>
    </div>
  );
};

export default HomePage;
