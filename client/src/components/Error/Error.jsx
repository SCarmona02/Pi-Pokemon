import React from "react";
import style from "./Error.module.css"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllPokemons, setError } from "../../redux/actions/actions";


const Error = () => {
    const error = useSelector(state => state.error);
    const dispatch = useDispatch();
    const history = useHistory()

    const submitHandler = (event) => {
        history.push("/pokemons")
        event.preventDefault();
        dispatch(getAllPokemons());
        dispatch(setError(false));
    };

    return (
        <div className={style.backimage}>
            <div>
            <h1>Something went wrong</h1>
            <span>{error}</span>
            <div>
            <button className={style.button} onClick={(event) => submitHandler(event)}>Back</button>
            </div>
            </div>
        </div>

    )
};

export default Error;