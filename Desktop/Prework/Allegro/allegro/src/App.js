import React from 'react';
import './App.module.scss';
const Pokedex = require('pokedex-promise-v2');


class App extends React.Component {
  state = {
    pokemonNames: [],
    pokemonInfos: []
  }

  componentDidMount() {
    const P = new Pokedex();

    P.getPokemonsList()
      .then(res => {
        return res
      }).then(res => {
        res.results.map(pokemon => {
          this.setState = {
            pokemonNames: pokemon.name,
          }
          return pokemon.name
        }).map(pokemonName => {
          return P.getPokemonByName(pokemonName)
            .then(res => {
              console.log(res);
              this.setState = {
                pokemonInfos: res
              }
              return res
            })
        })
      }).catch(err => {
        console.log(err)
      })
  }

  render() {
    return <div></div>
  }
}

export default App;