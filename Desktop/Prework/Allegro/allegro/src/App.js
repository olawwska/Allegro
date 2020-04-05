import React from 'react';
import './App.module.scss';
const Pokedex = require('pokedex-promise-v2');


class App extends React.Component {
  state = {
    pokemonNames: []
  }

  componentDidMount() {
    const P = new Pokedex();

    P.getPokemonsList()
      .then(res => {
        return res.results.map(pokemon => {
          this.setState({
            pokemonNames: pokemon.name
          })
          return pokemon.name
        })
      })
      .catch(err => {
        console.log('There was an ERROR', err);
      });
  }

  render() {
    return <div>
      <h1>Hello World</h1>
    </div>
  }
}

export default App;