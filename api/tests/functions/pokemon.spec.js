const {expect} = require('chai');

const Function = require('../../src/routes/othersFunctions/pokeFunctions.js');

describe('listPokemon, newPokemon, listTypes', function() {
    it('Debe de traer los pokemons de la API', async function () {
        expect(await Function.listPokemons()).to.have.length.above(0)
    });

    it('Debe de traer todos los types de la API', async function() {
        expect(await Function.listTypes()).to.have.length.above(0);
    });

    it('Agrega un pokemon y devuelve el pokemon creado', async function() {
        expect(await Function.newPokemon({"name": "newww"})).to.have.hasOwnProperty("newww");
        expect(await Function.listPokemons()).to.have.hasOwnProperty("newww");
    })
})