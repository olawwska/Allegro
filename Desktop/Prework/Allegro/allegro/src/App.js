import React from 'react';
import './App.module.scss';
import ListItem from './components/ListItem/ListItem';
import styles from './App.module.scss';
// import Pagination from '@material-ui/core/Button';

const Pokedex = require('pokedex-promise-v2');


class App extends React.Component {

  state = {
    offset: 0,
    pokemonInfos: [],
    perPage: 10,
    currentPage: 0,
    pageCount: null
  }

  pokemonGetter() {
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

  // pokemonCreate = (pokemons) => {
  //   return pokemons.map((onePokemon) => {
  //     return <ListItem
  //       name={onePokemon.name}
  //       image={onePokemon.sprites.front_default}
  //       key={onePokemon.name}
  //       alt={onePokemon.name}
  //     />
  //   })
  // };

  pokemonCreate = (pokemons) => {
    const slice = pokemons.slice(this.state.offset, this.state.offset + this.state.perPage)
    const pagedPokemons = slice.map(pp =>
      <ListItem>
        name={pp.name}
        image={pp.sprites.front_default}
        key={pp.name}
        alt={pp.name}
      </ListItem>)

    // this.setState({
    //   pageCount: Math.ceil(pokemons.length / this.state.perPage),
    //   pagedPokemons
    // })
    //cant perform react setState on an unmounted component To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
  }


  componentDidMount() {
    this.pokemonGetter()
  }

  render() {
    const { pokemonInfos } = this.state

    return <div className={styles.mainWrapper}>
      {this.pokemonCreate(pokemonInfos)}
    </div>
  }
}

export default App;