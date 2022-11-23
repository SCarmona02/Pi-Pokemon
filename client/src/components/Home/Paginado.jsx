import React from "react";
import style from "./Paginado.module.css"

const Paginado = ({ pokemonsPerPage, pokemons, paginado, currentPage }) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(pokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul>
                {currentPage > 1 && <li className={style.liNumber}><span className={style.paginado} onClick={() => paginado(--currentPage)}>Prev</span></li>}
                {
                    pageNumbers && pageNumbers.map(number => {
                        return (
                            <li className={style.liNumber} key={number}>
                                <span className={style.paginado} onClick={() => paginado(number)}>{number}</span>
                            </li>
                        )
                    })
                }
                {currentPage < pageNumbers.length && <li className={style.liNumber}><span className={style.paginado} onClick={() => paginado(++currentPage)}>Next</span></li>}
            </ul>
        </nav>
    )
}

export default Paginado;