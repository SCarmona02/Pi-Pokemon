import React from "react";
import style from "./Paginado.module.css"

const Paginado = ({ pokemonsPerPage, pokemons, paginado }) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(pokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul>
                {
                    pageNumbers && pageNumbers.map(number => {
                        return (
                            <li className={style.liNumber} key={number}>
                                <span className={style.paginado} onClick={() => paginado(number)}>{number}</span>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}

export default Paginado;