import React from 'react';
import './App.module.scss';
import ListItem from './components/ListItem/ListItem';
import styles from './App.module.scss';

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

  pokemonCreate = (pokemons) => {
    return pokemons.map((onePokemon) => {
      return <ListItem
        name={onePokemon.name}
        image={onePokemon.sprites.front_default}
        key={onePokemon.name}
      />
    })
  };


  render() {

    const { pokemonInfos } = this.state

    return <div className={styles.mainWrapper}>
      <ListItem />
      {this.pokemonCreate(pokemonInfos)}
    </div>
  }
}

export default App;