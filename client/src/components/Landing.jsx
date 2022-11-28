import React from "react";
import style from "./Landing.module.css"
import { Link } from "react-router-dom";
import giftPikachu from "../images/pikachugif.gif"

const Landing = () => {
    return (
        <>
            <div className={style.flexContainer}>
                <div className={style.firstContainer}>
                    <div className={style.hContainer}>
                        <h1 className={style.title}>Welcome to the wonderful Pokemon world!</h1>
                        <h3 className={style.text}>If would you like to know about new Pokemons, learn a little more about their features... <br />
                            This website is for you! Here you could find information about your favorite pokemons, <br />
                            Also to create new pokemons as you like. ¡Blow your mind! </h3>
                    </div>
                    <Link to="/pokemons">
                        <button className={style.button}>I choose you!</button>

                    </Link>
                </div>

                <div className={style.secondContainer}>
                    <img className={style.gif} src={giftPikachu} alt="pikachu gif"></img>
                </div>
            </div>
        </>
    )
};

export default Landing;