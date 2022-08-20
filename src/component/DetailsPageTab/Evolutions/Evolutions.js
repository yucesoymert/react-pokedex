import React from "react";
import { useParams } from 'react-router-dom';

import './Evolutions.css'

//svg
import forward from '../../../images/svg/forward.svg';

//hooks
import { usePokemon } from "../../../hooks/usePokemon";
import { usePokemonEvolution } from "../../../hooks/usePokemonEvolution";
import { usePokemonSpecies } from "../../../hooks/usePokemonSpecies";

import { POKEMON_IMAGE_URL, POKEMON_TYPE_TO_COLOR } from '../../../global/constants';

export const Evolutions = () => {

    const {id} = useParams()
    const pokemon = usePokemon(id)
    const pokemonSpecies = usePokemonSpecies(id)
    const evolution = usePokemonEvolution(pokemonSpecies?.evolution_chain?.url)

    if (!pokemon) {
        return null;
    }

    //evolutions images id start
    function leftFillNum(num, targetLength) {
        return num?.toString().padStart(targetLength, 0);
    }
    
    const newOne = evolution?.chain?.species?.url?.slice(0, -1)?.replace("https://pokeapi.co/api/v2/pokemon-species/", "")
    const newTwo = evolution?.chain?.evolves_to[0]?.species?.url?.slice(0, -1)?.replace("https://pokeapi.co/api/v2/pokemon-species/", "")
    const newThree = evolution?.chain?.evolves_to[0]?.evolves_to[0]?.species?.url?.slice(0, -1)?.replace("https://pokeapi.co/api/v2/pokemon-species/", "")
    
    const imageOne = leftFillNum( newOne , 3)
    const imageTwo = leftFillNum( newTwo , 3)
    const imageThree = leftFillNum( newThree , 3)
    //evolutions images id end

    const firstType = pokemon.types[0];
    const typeColor = POKEMON_TYPE_TO_COLOR[firstType.type.name] ? POKEMON_TYPE_TO_COLOR[firstType.type.name]: "white";

    const typeDisplay =  !evolution?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name ? "none" : "flex";
    

    return (
        <div className="evolutions-page">
            <div className="pokemon-data">
                <div className="pokemon-text">
                    <h2 className="title">Evolution Chain</h2>
                </div>
                <div className="evo-container">
                    <div className="evo-context">
                        <div className="evo-avatar" style={{
                        backgroundColor: typeColor
                         }} >
                            <img src={`${POKEMON_IMAGE_URL}${imageOne}.png`} alt="pokemon-"/>
                        </div>
                        <div className="evo-name">{evolution?.chain?.species?.name}</div>
                    </div>
                    <div className="evo-context">
                        <div className="forward-icon">
                            <img src={forward} alt="pokemon-"/>
                        </div>
                    </div>
                    <div className="evo-context">
                        <div className="evo-avatar" style={{
                        backgroundColor: typeColor
                         }}>
                            <img src={`${POKEMON_IMAGE_URL}${imageTwo}.png`} alt="pokemon-"/>
                        </div>
                        <div className="evo-name">{evolution?.chain?.evolves_to[0]?.species?.name}</div>
                    </div>
                    <div className="evo-context">
                        <div className="forward-icon" >
                            <img src={forward} alt="pokemon-"
                                style={{
                                display : typeDisplay,
                                 }}/>
                        </div>
                    </div>
                    <div className="evo-context ">
                        <div className="evo-avatar" style={{
                        backgroundColor: typeColor,
                        display: typeDisplay,
                         }}>
                            <img src={`${POKEMON_IMAGE_URL}${imageThree}.png`}/>
                         </div>
                        <div className="evo-name">{evolution?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

