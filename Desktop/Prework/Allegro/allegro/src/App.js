import React from 'react';
import './App.module.scss';
const Pokedex = require('pokedex-promise-v2');

const P = new Pokedex();
P.getPokemonsList()
  .then(res => {
    return res
  }).then(res => {
    res.results.map(pokemon => {
      return pokemon.name
    }).map(pokemonName => {
      return P.getPokemonByName(pokemonName)
        .then(res => {
          console.log(res);
          return res
        })
    })
  })



// P.getPokemonByName('bulbasaur')
//   .then(res => {
//     console.log(res)
//   })

const App = () => (
  <div></div>

)

export default App;