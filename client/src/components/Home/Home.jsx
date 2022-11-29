import React, { useEffect, useState } from "react";
import style from "./Home.module.css"
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons, filterCreated, filterByName, filterByAttack, getAllTypes, filterByType } from "../../redux/actions/actions";
import Card from "../Card/Card";
import Navbar from "../Navbar/Navbar";
import Error from "../Error/Error"
import Paginado from "./Paginado";

const Home = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.error);
    const pokemons = useSelector(state => state.pokemons);
    const types = useSelector(state => state.types);
    const [selectType, setSelectType] = useState({ type: [], exist: [] });
    const [orden, setOrden] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pokemonsPerPage = 12;
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

    const paginado = (pageNumber) => (
        setCurrentPage(pageNumber)
    )

    useEffect(() => {
        if (pokemons.length) {

        } else {
            dispatch(getAllPokemons())
            dispatch(getAllTypes())
        }
    }, [dispatch, pokemons.length])

    const handleFilterCreated = (event) => {
        event.preventDefault();
        dispatch(filterCreated(event.target.value))

        setSelectType({
            ...selectType,
            exist: [event.target.value]
        })
    }

    const handleFilterType = (event) => {
        if (event.target.value === "all") {
            dispatch(getAllPokemons());
        } else {
            event.preventDefault();
            dispatch(filterByType(event.target.value))
        }

        setSelectType({
            ...selectType,
            type: [event.target.value]
        })
    }

    const handleDeleteType = (event) => {
        event.preventDefault();
        setSelectType({
            type: [],
            exist: []
        })
        window.location.reload();
        dispatch(getAllPokemons())
    }

    let selectDisabled = (!!selectType.type.length);
    let selectDisabledEx = (!!selectType.exist.length);

    const handleFilterName = (event) => {
        if (event.target.value === "asc" || event.target.value === "des") {
            event.preventDefault();
            dispatch(filterByName(event.target.value));
            setCurrentPage(1);
            setOrden(`Ordenado ${event.target.value}`)
        }
        if (event.target.value === "upForce" || event.target.value === "downForce") {
            event.preventDefault();
            dispatch(filterByAttack(event.target.value));
            setCurrentPage(1);
            setOrden(`Ordenado por fuerza ${event.target.value}`)
        }

        if (event.target.value === "def") {
            event.preventDefault();
            dispatch(getAllPokemons());
            setCurrentPage(1);
            setOrden("Sin orden");
        }

        if (orden.length < 0) {
            setOrden("")
        }
    }

    if (error) {
        return (
            <>
                <Error setSelectType={setSelectType}></Error>
            </>
        )
    } else if (pokemons.length) {
        return (
            <div className={style.backimage}>
                <Navbar />
                <div>
                    <select className={style.selects} onChange={event => handleFilterName(event)} defaultValue="title">
                        <option value="title" disabled>Order</option>
                        <option value="def">Random</option>
                        <option value="asc">A-Z</option>
                        <option value="des">Z-A</option>
                        <option value="upForce">Strongest</option>
                        <option value="downForce">Weakest</option>
                    </select>
                    <select disabled={selectDisabledEx} className={style.selects} onChange={event => handleFilterCreated(event)} defaultValue="title">
                        <option value="title" disabled>Origin</option>
                        <option value="all">All</option>
                        <option value="created">Created</option>
                        <option value="exist">Exist</option>
                    </select>
                        {selectType.exist?.map((exist, index) => {
                            return (
                                <div className={style.selects}>
                                <div key={index}>
                                    <span key={exist}>{exist[0].toUpperCase() + exist.slice(1)}</span>
                                    <button className={style.buttonDelete} name={exist} onClick={event => handleDeleteType(event)}>X</button>
                                </div>
                    </div>
                            )
                        })}
                    <select disabled={selectDisabled} className={style.selects} onChange={event => handleFilterType(event)} defaultValue="title">
                        <option value="title" disabled>Type</option>
                        <option value="all">All</option>
                        {types.map(type => {
                            return <option value={type.name} key={type.id}>{type.name[0].toUpperCase() + type.name.slice(1)}</option>
                        })}
                    </select>
                        {selectType.type?.map((type, index) => {
                            return (
                                <div className={style.selects}>
                                <div key={index}>
                                    <span key={type}>{type[0].toUpperCase() + type.slice(1)}</span>
                                    <button className={style.buttonDelete} name={type} onClick={event => handleDeleteType(event)}>X</button>
                                </div>
                    </div>
                            )
                        })}

                </div>
                {currentPokemons.map(pokemon => {
                    return <Card key={pokemon.id} item={pokemon} />
                })}
                <Paginado className={style.paginado} pokemonsPerPage={pokemonsPerPage} currentPage={currentPage} pokemons={pokemons.length} paginado={paginado} />
            </div>
        )
    } else {
        return (
            <>
                <Navbar />
                <div className={style.backimageLoading}>
                    <img src="https://media.tenor.com/_3R8EL8_DQYAAAAi/pokeball-pokemon.gif" alt="Loading..."></img>
                </div>
            </>
        )
    }

};

export default Home;