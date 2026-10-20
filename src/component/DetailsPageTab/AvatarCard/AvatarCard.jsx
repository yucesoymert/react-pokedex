import './AvatarCard.css'

import { useParams } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';
import { motion } from 'framer-motion';
import { API_URL, EASE_OUT, imageUrl, typeColor, POKEMON_TYPE_TO_COLOR } from '../../../global/constants';

const AvatarCard = () => {

    const {id} = useParams()

    const pokemon = useFetch(`${API_URL}${id}`)
    // species by its own url: alternate forms (id 10001+) have no /pokemon-species/{id}
    const pokemonSpecies = useFetch(pokemon?.species.url)

    if (!pokemon) {
        return (
            <div className='left-side' aria-busy="true">
                <div className="avatar-container skeleton" />
            </div>
        );
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
                        {/* keyed by id so switching Pokémon (evolution links) replays the entrance */}
                        <motion.img key={id} src={imageUrl(id)} alt={pokemon.name}
                            initial={{ opacity: 0, scale: 0.94 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.35, ease: EASE_OUT }} />
                    </div>
                </div>
                <div className="pokemon-types">
                        {pokemon.types.map( (type) => {
                            return (
                                <div key={type.type.name} className='pokemon-type' style={{ "--type": POKEMON_TYPE_TO_COLOR[type.type.name] }}>{type.type.name}</div>
                                )
                            })}
                </div>
            </div>
        </div>
        )
}

export default AvatarCard;
