import React, { useEffect } from "react";
import style from "./Detail.module.css"
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons, getPokemonDetail, deletePokemon } from "../../redux/actions/actions";
import { NavLink, useHistory } from "react-router-dom";
import Error from "../Error/Error";

const Detail = (props) => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.error);
    const pokemon = useSelector(state => state.pokemonDetail);
    const history = useHistory();

    const handlerDelete = () => {
        dispatch(deletePokemon(props.match.params.id));
        alert("Pokemon deleted!");
        history.push("/pokemons");
        dispatch(getAllPokemons());
    }

    useEffect(() => {
        dispatch(getPokemonDetail(props.match.params.id))
    }, [dispatch])

    if (error) {
        return (
            <>
                <Error></Error>
            </>
        )
    } else if (pokemon.hasOwnProperty("id") && (pokemon.id === parseInt(props.match.params.id) || pokemon.id === props.match.params.id)) {

        return (
            <div className={style.backimage}>
                <NavLink to="/pokemons"><button className={style.button}>Back</button></NavLink><br />
                <div className={style.cardContainer}>
                <div>
                <img className={style.imagePoke} src={pokemon.image} alt={pokemon.name} /><br />
                </div>
                <span>Name: {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</span><br />
                <span>HP: {pokemon.hp}</span><br />
                <span>Attack: {pokemon.attack}</span><br />
                <span>Defense: {pokemon.defense}</span><br />
                <span>Speed: {pokemon.speed}</span><br />
                <span>Height: {pokemon.height}</span><br />
                <span>Weight: {pokemon.weight}</span><br />
                <span>Types: {pokemon.types.map(type => {
                    return <div key={type.id}>{type.name[0].toUpperCase() + type.name.slice(1)}</div>
                })}
                </span>
                </div>
                {pokemon.createdInDb && (
                    <div>
                        <NavLink to={`/pokemons/edit/${props.match.params.id}`}><button className={style.button}>Edit Pokemon</button></NavLink>
                        <button className={style.button} onClick={event => handlerDelete(event)}>Delete Pokemon</button>
                    </div>
                )} 
            </div>
        )
    } else {
        return (
            <>
                <h1>Loading...</h1>
            </>
        )
    }

}

export default Detail;