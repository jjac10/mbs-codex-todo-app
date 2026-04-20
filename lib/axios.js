import axios from 'axios';

/**
 * Instancia centralizada de Axios para consumir PokeAPI.
 */
const pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default pokeApi;
