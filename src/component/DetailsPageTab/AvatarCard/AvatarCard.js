import './AvatarCard.css'

import { useParams } from 'react-router-dom';
import { usePokemon } from '../../../hooks/usePokemon';
import { usePokemonSpecies } from '../../../hooks/usePokemonSpecies';
import { POKEMON_IMAGE_URL, POKEMON_TYPE_TO_COLOR } from '../../../global/constants';

const AvatarCard = () => {

    const {id} = useParams()
    const imageId = id.padStart(3, '0');

    const pokemon = usePokemon(id)
    const pokemonSpecies  = usePokemonSpecies(id)

    if (!pokemon) {
        return null;
    }

    const firstType = pokemon.types[0];
    const typeColor = POKEMON_TYPE_TO_COLOR[firstType.type.name] ? POKEMON_TYPE_TO_COLOR[firstType.type.name]: "white";

    return (
        <div className='left-side'>
            <div className="avatar-container" style={{
                    backgroundColor: typeColor
                    }}>
                <div className="name-tag">
                    <div className="pokemon-number">
                        #{imageId}
                    </div>
                    <div className="poke-name">
                        {pokemon.name}
                    </div>
                </div>
                <div className="middle-card">
                    <div className='name-other'>
                        {pokemonSpecies?.names[0]?.name}
                    </div>
                    <div className='pokemon-pictures'>
                        <div className='circle'></div>
                        <img src={`${POKEMON_IMAGE_URL}${imageId}.png`} alt="pokemon_picture"/>
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


