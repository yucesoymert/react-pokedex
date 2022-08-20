const API_URL = 'https://pokeapi.co/api/v2/pokemon/'

const ALL_POKE_API = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'

const POKEMON_SPECIES_URL = "https://pokeapi.co/api/v2/pokemon-species/"

const POKEMON_EVO_URL = "https://pokeapi.co/api/v2/evolution-chain/"

const POKEMON_IMAGE_URL = "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/"


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

const POKEMON_THEME_COLORS ={
    red: "#F60B4A",
    gray: "#F6F6F6",
    blue: "#242540"
}

export {
    API_URL,
    ALL_POKE_API,
    POKEMON_SPECIES_URL,
    POKEMON_EVO_URL,
    POKEMON_IMAGE_URL,
    POKEMON_TYPE_TO_COLOR,
  };

