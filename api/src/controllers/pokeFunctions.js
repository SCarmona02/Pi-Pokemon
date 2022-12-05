const { Pokemon, Type } = require("../db");
const axios = require("axios");

let pokemons = [];
let types = [];

const pokeApi = "https://pokeapi.co/api/v2/pokemon";
const typeApi = "https://pokeapi.co/api/v2/type";

module.exports = {

    listPokemons: async function (name) {

        let arrayTypes = await this.listTypesForOthers();

        let array = [];
        let necessary = [];
        let arrayDeAPI = [];

        let responseFromDB = await Pokemon.findAll({ include: Type, });
        let responseFromAPI = await axios.get(pokeApi);
        let responseFromAPI2 = await axios.get(responseFromAPI.data.next);

        arrayDeAPI = [...responseFromAPI.data.results, ...responseFromAPI2.data.results];
        pokemons = [...responseFromDB];
        necessary = [...responseFromDB];

        let allUrlsAPIToPromises = arrayDeAPI.map((pokemon) => axios.get(pokemon.url));

        await axios.all(allUrlsAPIToPromises).then((url) => {
            url.map((detail) => {
                function findStats(stat) {
                    return detail.data.stats.find(element => element.stat.name === stat)
                }

                function findTypes() {
                    let resulttypes = [];
                    detail.data.types.forEach(element => {
                        arrayTypes.find(elementf => element.type.name === elementf.name ? resulttypes.push({ "id": elementf.id, "name": elementf.name }) : false)
                    });
                    return resulttypes;
                }

                pokemons.push({
                    "id": detail.data.id, "name": detail.data.name,
                    "hp": findStats("hp").base_stat, "attack": findStats("attack").base_stat,
                    "defense": findStats("defense").base_stat, "speed": findStats("speed").base_stat,
                    "height": detail.data.height, "weight": detail.data.weight, "types": findTypes(), "image": detail.data.sprites.other.home.front_default
                });

                necessary.push({
                    "id": detail.data.id, "name": detail.data.name, "types": findTypes(), "image": detail.data.sprites.other.home.front_default, "attack": findStats("attack").base_stat
                });
            })
        })

        if (name) {
            array = necessary.filter(pokemon => pokemon.name === name);

            if (array.length > 0) {

                return array

            } else {

                throw new Error(`Searched pokemon not found with name ${name}`);

            }

        }

        return necessary;

    },

    detailPokemon: async function (id) {
        let arrayDetail = [];
        if (id.length > 4) {

        } else {
            id = parseInt(id);
        }

        arrayDetail = pokemons.filter(pokemon => pokemon.id === id);

        if (arrayDetail.length > 0) {

            return arrayDetail;

        } else {

            throw new Error(`Searched pokemon not found with id ${id}`)

        }
    },

    newPokemon: async function (body) {

        const { name, types, hp, attack, defense, speed, height, weight, image } = body;

        body.hp ? body.hp = parseInt(hp) : body.hp = null;
        body.attack ? body.attack = parseInt(attack) : body.attack = null;
        body.defense ? body.defense = parseInt(defense) : body.defense = null;
        body.speed ? body.speed = parseInt(speed) : body.speed = null;
        body.height ? body.height = parseInt(height) : body.height = null;
        body.weight ? body.weight = parseInt(weight) : body.weight = null;

        if (image.length === 0) {
            body.image = "https://freepngimg.com/thumb/pokemon/20118-5-pokemon-thumb.png"
        }

        if (!name) {
            throw new Error('Name is required')
        } else {

            body.name = body.name.toLowerCase()
            const newPokemon = await Pokemon.create(body)
            if (types) {
                types.forEach(async type => {
                    let responseFromDB = await Type.findAll();
                    responseFromDB.find(element => element.name == type ? newPokemon.addTypes(element.id) : false)
                })

            }

            return ('New pokemon registred!');

        }

    },

    editPokemon: async function (id, body) {
        const { name, types, hp, attack, defense, speed, height, weight, image } = body;

        body.hp ? body.hp = parseInt(hp) : body.hp = null;
        body.attack ? body.attack = parseInt(attack) : body.attack = null;
        body.defense ? body.defense = parseInt(defense) : body.defense = null;
        body.speed ? body.speed = parseInt(speed) : body.speed = null;
        body.height ? body.height = parseInt(height) : body.height = null;
        body.weight ? body.weight = parseInt(weight) : body.weight = null;

        if (image.length === 0) {
            body.image = "https://freepngimg.com/thumb/pokemon/20118-5-pokemon-thumb.png"
        }

        if (!name) {
            throw new Error('Name is required')
        } else {

            body.name = body.name.toLowerCase();
            const findPokemon = await Pokemon.findByPk(id);
            await findPokemon.update(body, { where: { id: id } })
            const typeDb = await Type.findAll({
                where: { name: types },
            });

            await findPokemon.setTypes(typeDb);

            return ('Pokemon updated!');

        }

    },

    deletePokemon: async function (id) {
        const pokemonDelete = await Pokemon.findByPk(id);
        if (!pokemonDelete) {
            throw new Error(`Pokemon with id ${id} doesn't exist`)
        } else {
            pokemonDelete.destroy();
            return ("Pokemon deleted!")
        }
    },

    listTypes: async function () {
        if (types.length === 0) {

            await Type.sync({ force: true });
            let responseFromAPI = await axios.get(typeApi);
            let array = responseFromAPI.data.results
            console.log(array);
            let allUrlsAPIToPromises = array.map((type) => axios.get(type.url));

            await axios.all(allUrlsAPIToPromises).then((url) => {
                url.map((detail) => {
                    let data = { "id": detail.data.id, "name": detail.data.name }
                    Type.create(data);
                    types.push(data);
                })
            });

        }

        return types;
    },

    listTypesForOthers: async function () {
        let arrayTypes = [];
        let responseFromAPI = await axios.get(typeApi);
        let array = [...responseFromAPI.data.results]
        let allUrlsAPIToPromises = array.map((type) => axios.get(type.url));

        await axios.all(allUrlsAPIToPromises).then((url) => {
            url.map((detail) => {
                let data = { "id": detail.data.id, "name": detail.data.name }
                arrayTypes.push(data);
            })
        });

        return arrayTypes;
    },

}