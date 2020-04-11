import React from 'react';
import './App.module.scss';
import ListItem from './components/ListItem/ListItem';
import styles from './App.module.scss';
import BasicPagination from './components/Pagination/Pagination';

const Pokedex = require('pokedex-promise-v2');


class App extends React.Component {

  state = {
    offset: 0,
    pokemonInfos: [],
    perPage: 10,
    currentPage: 0,
    pageCount: null
  };

  componentDidMount() {
    this.pokemonGetter()
  }

  pokemonGetter = () => {
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
              const pokemonsInfos = [...this.state.pokemonInfos];
              this.setState({
                pokemonInfos: [
                  ...pokemonsInfos, res]

              });
            })
        })
      }).catch(err => {
        console.log(err)
      });

    this.updatePageCount()
  };

  updatePageCount = () => {
    const { pokemonInfos } = this.state;
    this.setState({
      pageCount: Math.ceil(pokemonInfos.length / this.state.perPage)
    })
  };

  handlePageChange = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
      currentPage: selectedPage,
      offset: offset
    }, () => {
      this.updatePageCount()
    });
  }

  render() {

    const { pokemonInfos, pageCount } = this.state;
    const slice = pokemonInfos.slice(this.state.offset, this.state.offset + this.state.perPage);
    const pagedPokemons = slice.map(pp =>
      <ListItem
        name={pp.name}
        image={pp.sprites.front_default}
        key={pp.name}
        alt={pp.name}
      />
    );

    return (
      <div className={styles.mainWrapper}>
        <BasicPagination
          count={pageCount}
          handlePageChangeMethod={this.handlePageChange}
        />
        {pagedPokemons}
      </div>
    )
  }
}

export default App;