/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));
  describe('GET /pokemons', () => {
    it('should get 200', () =>
      agent.get('/pokemons').expect(200)
    );
  });
});

describe('Testeo de rutas', function () {
  it('GET Pokemons debe de devolver un array de objetos', function () {
      return agent
      .get('/pokemons/')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (res) {
          expect(res.body).to.have.length.above(1);
      })
  });

  it('GET Pokemons con query debe de traer solo un objeto', function (){
    return agent
    .get('/pokemons/?name=pikachu')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(function (res) {
      expect(res.body).to.have.length(1);
    })
  });

  it('GET Pokemons con params debe de traer solo un objeto', function (){
    return agent
    .get('/pokemons/25')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(function (res) {
      expect(res.body).to.have.length(1);
    })
  });

})
