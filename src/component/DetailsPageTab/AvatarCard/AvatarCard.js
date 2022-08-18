import './AvatarCard.css'

import { useParams } from 'react-router-dom';
import { usePokemon } from '../../../hooks/usePokemon';
import { usePokemonSpecies } from '../../../hooks/usePokemonSpecies';

const IMAGE_URL = "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/"

const typeColors = {
    grass: "rgb(138, 209, 102)",
    poison: "rgb(160, 64, 160)",
    fire: "rgb(245, 158, 95)",
    water: "rgb(129, 207, 224)",
    bug: "rgb(168, 184, 32)",
    normal: "rgb(196, 196, 164)",
    electric: "rgb(248, 208, 48)",
    ground: "rgb(224, 192, 104)",
    fairy: "rgb(238, 153, 172)",
    fighting: "rgb(204, 67, 59)",
    ice: "rgb(107, 192, 209)",
    flying: "rgb(255, 148, 112)",
    psychic: "rgb(248, 88, 136)",
    rock: "rgb(184, 160, 56)",
    ghost: "rgb(236, 178, 247)",
    dragon: "rgb(112, 56, 248)",
    dark: "rgb(112, 88, 72)",
    steel: "rgb(184, 184, 208)"
}

const AvatarCard = () => {

    const {id} = useParams()
    const imageId = id.padStart(3, '0');

    const pokemon = usePokemon(id)
    const pokemonSpecies  = usePokemonSpecies(id)

    if (!pokemon) {
        return null;
    }

    const firstType = pokemon.types[0];
    const typeColor = typeColors[firstType.type.name] ? typeColors[firstType.type.name]: "white";

    const pokemonName = pokemon.name;
    const newPokemonName = pokemonName[0].toUpperCase() + pokemonName.substring(1);

    return (
        <div className='left-side'>
            <div className="avatar-container" style={{
                    backgroundColor: typeColor
                    }}>
                <div className="name-tag">
                    <div className="pokemon-number">
                        #{imageId}
                    </div>
                    <div className="pokemon-nam">
                        {newPokemonName}
                    </div>
                </div>
                <div className="middle-card">
                    <div className='name-other'>
                        {pokemonSpecies.names[0].name}
                    </div>
                    <div className='pokemon-pictures'>
                        <div className='circle'></div>
                        <img src={`${IMAGE_URL}${imageId}.png`}/>
                    </div>
                </div>
                <div className="pokemon-types">
                        {pokemon.types.map( (type) => {
                            return (
                                <div className='pokemon-type'>{type.type.name}</div>
                                )
                            })}
                </div>
            </div>
        </div>
        )
}

export default AvatarCard;


