//API Function get pokemon list present in mongoDB server by their generation number.
import axios from 'axios';
const PokeGenerationApi = axios.create({
    baseURL: 'https://infinite-tundra-39902.herokuapp.com/byGeneration',
})

export default PokeGenerationApi