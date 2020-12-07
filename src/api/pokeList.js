import axios from 'axios';
const PokeList = axios.create({
    baseURL:'https://pokeapi.co/api/v2/pokemon',
})

export default PokeList