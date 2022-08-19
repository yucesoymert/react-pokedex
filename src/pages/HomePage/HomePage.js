import "./HomePage.css";

import React from "react";

//components
import { usePokemons } from "../../hooks/usePokemons";
import PokemonCard from "../../component/PokemonCard/PokemonCard";
import SearchBar from "../../component/SearchBar/SearchBar";

const HomePage = () => {

  const { data, fetchNextPage } = usePokemons();
  
  return (
    <div className="homepage">
      <SearchBar />
      <div className="pokemon-list">
        {data.map((p, index) => (
          <PokemonCard key={index} pokemon={p} />
        ))}
      </div>
      <div className="load-more">
        <button className="load-btn" type="button" onClick={() => fetchNextPage()}>Load More</button>
      </div>
    </div>
  );
};

export default HomePage;
