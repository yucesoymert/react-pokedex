import './AvatarCard.css'

import { useParams } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';
import { API_URL, imageUrl, typeColor } from '../../../global/constants';

const AvatarCard = () => {

    const {id} = useParams()

    const pokemon = useFetch(`${API_URL}${id}`)
    // species by its own url: alternate forms (id 10001+) have no /pokemon-species/{id}
    const pokemonSpecies = useFetch(pokemon?.species.url)

    if (!pokemon) {
        return null;
    }

    return (
        <div className='left-side'>
            <div className="avatar-container" style={{
                    backgroundColor: typeColor(pokemon)
                    }}>
                <div className="name-tag">
                    <div className="pokemon-number">
                        #{id.padStart(3, '0')}
                    </div>
                    <div className="poke-name">
                        {pokemon.name}
                    </div>
                </div>
                <div className="middle-card">
                    <div className='name-other'>
                        {pokemonSpecies?.names.find((n) => n.language.name === 'ja-Hrkt')?.name}
                    </div>
                    <div className='pokemon-pictures'>
                        <div className='circle'></div>
                        <img src={imageUrl(id)} alt={pokemon.name}/>
                    </div>
                </div>
                <div className="pokemon-types">
                        {pokemon.types.map( (type) => {
                            return (
                                <div key={type.type.name} className='pokemon-type'>{type.type.name}</div>
                                )
                            })}
                </div>
            </div>
        </div>
        )
}

export default AvatarCard;
