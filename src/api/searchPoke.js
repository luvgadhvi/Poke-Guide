//API Function get pokemon list present in mongoDB server by search string.
import axios from 'axios';
const SearchApi = axios.create({
    baseURL: 'https://infinite-tundra-39902.herokuapp.com/searchPokemon',
})

export default SearchApi