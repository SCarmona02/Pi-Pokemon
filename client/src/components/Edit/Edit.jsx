import React, { useState, useEffect } from "react";
import style from "./Edit.module.css"
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { editPokemon, getAllPokemons, getAllTypes } from "../../redux/actions/actions";

const validate = (input) => {
    let errors = {};
    if (input.name.length < 3) {
        errors.name = "*The pokemon's name is required (3 letters min)"
    }

    if (input.name.length > 2 && ((/[0-9]/).test(input.name) || (/[/_*.:;()+-]/).test(input.name))) {
        errors.name = "*The pokemon's name can't has numbers or special characters"
    }

    if (input.hp.length > 0 && ((input.hp < 1) || (input.hp > 1000) || ((/[.-]/).test(input.hp)))) {
        errors.hp = "HP value must be between 1 - 1000"
    }

    if (input.attack.length > 0 && (input.attack < 1 || input.attack > 1000 || (/[.-]/).test(input.attack))) {
        errors.attack = "Attack value must be between 1 - 1000"
    }

    if (input.defense.length > 0 && (input.defense < 1 || input.defense > 1000 || (/[.-]/).test(input.defense))) {
        errors.defense = "Defense value must be between 1 - 1000"
    }

    if (input.speed.length > 0 && (input.speed < 1 || input.speed > 1000 || (/[.-]/).test(input.speed))) {
        errors.speed = "Speed value must be between 1 - 1000"
    }

    if (input.height.length > 0 && (input.height < 1 || input.height > 1000 || (/[.-]/).test(input.height))) {
        errors.height = "Height value must be between 1 - 1000"
    }

    if (input.weight.length > 0 && (input.weight < 1 || input.weight > 1000 || (/[.-]/).test(input.weight))) {
        errors.weight = "Weight value must be between 1 - 1000"
    }

    if (input.image.length > 0 && !(/\S+\.\S+/).test(input.image)) {
        errors.image = "Image must be URL"
    }

    return errors;
}

const Edit = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector((state) => state.types);
    const { id } = useParams();
    const pokemon = useSelector((state) => state.pokemonDetail);
    let typesPokem = [];
    pokemon.types.map(type => typesPokem.push(type.name))

    const [input, setInput] = useState({
        "name": pokemon.name,
        "types": typesPokem,
        "hp": pokemon.hp ? pokemon.hp : "",
        "attack": pokemon.attack ? pokemon.attack : "",
        "defense": pokemon.defense ? pokemon.defense : "",
        "speed": pokemon.speed ? pokemon.speed : "",
        "height": pokemon.height ? pokemon.height : "",
        "weight": pokemon.weight ? pokemon.weight : "",
        "image": pokemon.image

    })

    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(getAllTypes())
    }, []);

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(editPokemon(pokemon.id, input));
        alert("Updated!");
        setInput({
            "name": "",
            "types": [],
            "hp": "",
            "attack": "",
            "defense": "",
            "speed": "",
            "height": "",
            "weight": "",
            "image": ""
        });
        history.push("/pokemons")
        dispatch(getAllPokemons())
    }

    const changeHandler = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })

        setErrors(validate({
            ...input,
            [event.target.name]: event.target.value
        }))
    }

    const handleSelect = (event) => {
        if (!input.types.includes(event.target.value)) {
            setInput({
                ...input,
                types: [...input.types, event.target.value]
            })
        }
    }

    const handleDeleteType = (event) => {
        event.preventDefault();
        let newTypes = input.types.filter(type => type !== event.target.name)
        setInput({
            ...input,
            types: newTypes
        })
    }

    let buttonDisabled = !(input.name.length) || (errors.name || errors.attack || errors.defense || errors.speed || errors.height || errors.weight || errors.hp || errors.image)

    return (
        <div className={style.backimage}>
            <div className={style.forNav}>
                <NavLink to="/pokemons"><button className={style.button}>Back</button></NavLink>
            </div>
            <form onSubmit={(event) => submitHandler(event)} className={style.form}>
                <h2>Blow your mind!</h2>
                <div>
                    <label htmlFor="name">Name: <span className={style.aste}>*</span></label>
                    <input className={style.inputs} type='text' value={input.name} name='name' autoComplete="off" onChange={(event) => changeHandler(event)} placeholder="Name"></input>
                    {errors.name && (<p className={style.errors}>{errors.name}</p>)}
                </div>

                <div>
                    <label htmlFor="hp">HP: </label>
                    <input className={style.inputs} type='number' value={input.hp} name='hp' autoComplete="off" onChange={(event) => changeHandler(event)} placeholder="1 - 1000"></input>
                    {errors.hp && (<p className={style.errors}>{errors.hp}</p>)}
                </div>

                <div>
                    <label htmlFor="attack">Attack: </label>
                    <input className={style.inputs} type='number' value={input.attack} name='attack' autoComplete="off" onChange={(event) => changeHandler(event)} placeholder="1 - 1000"></input>
                    {errors.attack && (<p className={style.errors}>{errors.attack}</p>)}
                </div>

                <div>
                    <label htmlFor="defense">Defense: </label>
                    <input className={style.inputs} type='number' value={input.defense} name='defense' autoComplete="off" onChange={(event) => changeHandler(event)} placeholder="1 - 1000"></input>
                    {errors.defense && (<p className={style.errors}>{errors.defense}</p>)}
                </div>

                <div>
                    <label htmlFor="speed">Speed: </label>
                    <input className={style.inputs} type='number' value={input.speed} name='speed' autoComplete="off" onChange={(event) => changeHandler(event)} placeholder="1 - 1000"></input>
                    {errors.speed && (<p className={style.errors}>{errors.speed}</p>)}
                </div>

                <div>
                    <label htmlFor="height">Height: </label>
                    <input className={style.inputs} type='number' value={input.height} name='height' autoComplete="off" onChange={(event) => changeHandler(event)} placeholder="1 - 1000 (cm)"></input>
                    {errors.height && (<p className={style.errors}>{errors.height}</p>)}
                </div>

                <div>
                    <label htmlFor="weight">Weight: </label>
                    <input className={style.inputs} type='number' value={input.weight} name='weight' autoComplete="off" onChange={(event) => changeHandler(event)} placeholder="1 - 1000 (kg)"></input>
                    {errors.weight && (<p className={style.errors}>{errors.weight}</p>)}
                </div>

                <div>
                    <label htmlFor="types">Types: </label>
                    <select className={style.inputs} onChange={event => handleSelect(event)} name="types" defaultValue="title">
                        <option value="title" disabled name="Types">Types</option>
                        {types.map(type => {
                            return <option value={type.name} key={type.id}>{type.name[0].toUpperCase() + type.name.slice(1)}</option>
                        })}
                    </select>
                </div>

                <div>
                    {input.types?.map((type, index) => {
                        return (
                            <div key={index}>
                                <span key={type}>{type[0].toUpperCase() + type.slice(1)}</span>
                                <button className={style.buttonDelete} name={type} onClick={event => handleDeleteType(event)}>X</button>
                                <br />
                            </div>
                        )
                    })}
                </div>

                <div>
                    <label htmlFor="image">Image: </label>
                    <input className={style.inputs} type='url' value={input.image} name='image' autoComplete="off" onChange={(event) => changeHandler(event)} placeholder="URL"></input>
                    {errors.image && (<p className={style.errors}>{errors.image}</p>)}
                </div>

                <button className={style.button} type="submit" disabled={buttonDisabled}>Get it!</button>
            </form>
        </div>
    )

}

export default Edit;