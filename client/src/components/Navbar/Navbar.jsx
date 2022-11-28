import React from "react";
import style from "./Navbar.module.css"
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getPokemonQuery, getAllPokemons } from "../../redux/actions/actions";

const Navbar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState({ title: "" });

    const changeHandler = (event) => {
        const value = event.target.value;

        setName({
            title: value
        })
    }

    const submitHandler = (event) => {
        dispatch(getPokemonQuery(name.title.toLowerCase()))
    }

    const reloadHandler = (event) => {
        history.push("/pokemons")
        window.location.reload();
        dispatch(getAllPokemons());
        setName({ title: "" })
    }

    return (
        <div>
            <div className={style.navbar}>
                <div className={style.divHome}>
                    <NavLink to="/"><button className={style.goHome}>Home</button></NavLink>

                </div>
                <div>
                    <input className={style.input} type="text" id="name" autoComplete="off" value={name.title} onChange={(event) => changeHandler(event)} placeholder="Find your pokemon..." />
                    <button className={style.searchButton} onClick={(event) => submitHandler(event)}>Find it!</button> {/*Puede ser una pokeball */}
                </div>
                <div>
                    <NavLink to="/form"><button className={style.goHome}>Create</button></NavLink>
                    <button className={style.goHome} onClick={(event) => reloadHandler(event)}>Reload</button>
                </div>
            </div>
        </div>
    )
};

export default Navbar;