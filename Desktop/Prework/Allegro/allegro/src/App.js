import React from 'react';
import './App.module.scss';
const Pokedex = require('pokedex-promise-v2');


class App extends React.Component {

  componentDidMount() {
    const P = new Pokedex();

    const test = () =>
      P.getPokemonsList()
        .then(res => {
          return res.results.map(pokemon => {
            return pokemon.name
          })
        })

    console.log(test());
  }

  render() {
    return <div>
      <h1>Hello World</h1>
    </div>
  }
}

export default App;