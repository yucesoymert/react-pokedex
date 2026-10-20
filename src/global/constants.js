const API_URL = 'https://pokeapi.co/api/v2/pokemon/'

const ALL_POKE_API = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'

// The old HybridShivam image repo is gone (404); PokeAPI's own artwork covers every id, forms included.
const imageUrl = (id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

// ".../pokemon/25/" or ".../pokemon-species/25/" -> "25"
const idFromUrl = (url) => url.split('/').filter(Boolean).pop()

// PokeAPI text lists come in many languages, not in a fixed order.
const english = (entries = []) => entries.find((e) => e.language.name === 'en')

const POKEMON_TYPE_TO_COLOR = {
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

const typeColor = (pokemon) => POKEMON_TYPE_TO_COLOR[pokemon.types[0].type.name] || "white"

// same curve as --ease-out in index.css
const EASE_OUT = [0.22, 1, 0.36, 1]

export {
    EASE_OUT,
    API_URL,
    ALL_POKE_API,
    imageUrl,
    idFromUrl,
    english,
    typeColor,
    POKEMON_TYPE_TO_COLOR,
};
