import React from 'react';
import './App.module.scss';
const Pokedex = require('pokedex-promise-v2');


class App extends React.Component {

  state = {
    pokemonInfos: []
  }

  componentDidMount() {
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
              // console.log(res)
              const pokemonsInfos = [...this.state.pokemonInfos]
              this.setState({
                pokemonInfos: [
                  ...pokemonsInfos, res]

              });
            })
        })
      }).catch(err => {
        console.log(err)
      })
  }

  //z tego zrobić funkcję i wsadzić ją do rendera usuwając stan 
  //ewentualnie https://stackoverflow.com/questions/47735600/react-setstate-in-a-map-function


  render() {
    return <div></div>
  }
}

export default App;