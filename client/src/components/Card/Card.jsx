import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css"

const Card = ({ item }) => {
    return (
        <Link className={style.cardContainer} to={`/pokemons/${item.id}`}>
            <h3>{item.name[0].toUpperCase() + item.name.slice(1)}</h3>
            <img className={style.imagePoke} src={item.image} alt={item.name} />
            {item.types.map(type => {
                return <div key={type.id}>{type.name[0].toUpperCase() + type.name.slice(1)}</div>
            })}
        </Link>
    )

}

export default Card;