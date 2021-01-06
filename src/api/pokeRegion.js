import axios from 'axios';
const PokeGeneration = axios.create({
    baseURL:"https://pokeapi.co/api/v2/pokedex",
})

export default PokeGeneration