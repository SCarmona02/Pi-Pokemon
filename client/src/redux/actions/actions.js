import axios from 'axios';

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_POKEMON_DETAIL = "GET_POKEMON_DETAIL";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const GET_POKEMON_QUERY = "GET_POKEMON_QUERY";
export const DELETE_POKEMON = "DELETE_POKEMON";
export const EDIT_POKEMON = "EDIT_POKEMON";
export const ERROR = "ERROR";
export const FILTER_BY_NAME = "FILTER_BY_NAME";
export const FILTER_BY_ATTACK = "FILTER_BY_ATTACK"
export const FILTER_CREATED = "FILTER_CREATED";
export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";

export const getAllPokemons = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get("http://localhost:3001/pokemons");
            const pokemons = response.data;
            dispatch({
                type: GET_ALL_POKEMONS,
                payload: pokemons
            })
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: error.message
            })
        }
    }
};

export const getPokemonDetail = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/pokemons/${id}`);
            const pokemon = response.data.pop();
            dispatch({
                type: GET_POKEMON_DETAIL,
                payload: pokemon
            })
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: "Searched pokemon not found"
            })
        }
    }
};

export const getPokemonQuery = (name) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/pokemons/?name=${name}`);
            const pokemon = response.data;
            dispatch({
                type: GET_POKEMON_QUERY,
                payload: pokemon
            })
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: "Searched pokemon not found"
            })
        }
    }
};

export const createPokemon = (data) => {
    return async function () {
        const response = await axios.post("http://localhost:3001/pokemons/", data);
        return response;
    }
};

export const deletePokemon = (id) => {
    return async function () {
        const response = await axios.delete(`http://localhost:3001/pokemons/delete/${id}`);
        return response;
    }
};

export const editPokemon = (id, edit) => {
    return async function () {
        const response = await axios.put(`http://localhost:3001/pokemons/edit/${id}`, edit)
        return response;
    }
}

export const setError = () => {
    return {
        type: ERROR,
        payload: false,
    }
};

export const setPoke = () => {
    return {
        type: GET_ALL_POKEMONS,
        payload: []
    }
}

export const filterByName = (payload) => {
    return {
        type: FILTER_BY_NAME,
        payload
    }
}

export const filterByAttack = (payload) => {
    return {
        type: FILTER_BY_ATTACK,
        payload
    }
}

export const filterCreated = (payload) => {
    return {
        type: FILTER_CREATED,
        payload
    }
}

export const getAllTypes = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get("http://localhost:3001/types");
            const types = response.data;
            dispatch({
                type: GET_ALL_TYPES,
                payload: types
            })
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: error.message
            })
        }
    }
}

export const filterByType = (payload) => {
    return {
        type: FILTER_BY_TYPE,
        payload
    }
}
