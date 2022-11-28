import { ERROR, GET_ALL_POKEMONS, GET_POKEMON_DETAIL, GET_POKEMON_QUERY, CREATE_POKEMON, FILTER_BY_NAME, FILTER_CREATED, FILTER_BY_ATTACK, GET_ALL_TYPES, FILTER_BY_TYPE } from "../actions/actions"

const initialState = {
    pokemons: [],
    types: [],
    pokemonDetail: {},
    error: ""
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
            };

        case GET_POKEMON_DETAIL:
            return {
                ...state,
                pokemonDetail: action.payload
            };

        case GET_POKEMON_QUERY:
            return {
                ...state,
                pokemons: action.payload
            };

        case CREATE_POKEMON:
            return {
                ...state
            };

        case ERROR:
            return {
                ...state,
                error: action.payload
            };

        case FILTER_BY_NAME:
            const allPokemonsFN = [...state.pokemons]
            const statusFilter = action.payload === "asc" ? allPokemonsFN.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            }) : allPokemonsFN.sort((a, b) => {
                if (a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                pokemons: statusFilter,
                allPoke: statusFilter
            };

        case FILTER_BY_ATTACK:
            const allPokemonsFA = [...state.pokemons]
            const statusFilterFA = action.payload === "upForce" ? allPokemonsFA.sort((a, b) => {
                if (a.attack > b.attack) {
                    return -1;
                }
                if (b.attack > a.attack) {
                    return 1;
                }
                return 0;
            }) : allPokemonsFA.sort((a, b) => {
                if (a.attack > b.attack) {
                    return 1;
                }
                if (b.attack > a.attack) {
                    return -1;
                }
                return 0;
            })
            return {
                ...state,
                pokemons: statusFilterFA,
                allPoke: statusFilterFA
            };

        case FILTER_CREATED:
            const allPokemonsFC = [...state.pokemons]
            const createdFilter = action.payload === "created" ? allPokemonsFC.filter(pokemon => pokemon.createdInDb) : allPokemonsFC.filter(pokemon => !pokemon.createdInDb)
            return {
                ...state,
                pokemons: action.payload === "all" ? allPokemonsFC : createdFilter,
                error: createdFilter.length > 0 ? false : "You have not created any pokemon"
            };

        case GET_ALL_TYPES:
            return {
                ...state,
                types: action.payload,
            };

        case FILTER_BY_TYPE:
            const allPokemonsFT = [...state.pokemons]
            let pokemonByType = []
            allPokemonsFT.forEach(pokemon => pokemon.types.forEach(types => types.name === action.payload ? pokemonByType.push(pokemon) : false))
            return {
                ...state,
                pokemons: pokemonByType,
                error: pokemonByType.length > 0 ? false : `There are no pokemon with the ${action.payload} type`
            }

        default:
            return {
                ...state,
                error: action.payload
            };

    }
};

export default rootReducer;