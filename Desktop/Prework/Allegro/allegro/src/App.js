import React from 'react';
// import './App.module.scss';
import ListItem from './components/ListItem/ListItem';
import Pagination from './components/Pagination/Pagination';
// import styles from './App.module.scss';
import styles from './App.module.scss';


const Pokedex = require('pokedex-promise-v2');


class App extends React.Component {

  state = {
    offset: 0,
    pokemonInfos: [],
    perPage: 10,
    currentPage: 0,
    pageCount: null,
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

    const { pokemonInfos, perPage, selectedOption } = this.state;
    const pageCount = Math.ceil(pokemonInfos.length / perPage)
    const slice = pokemonInfos.slice(this.state.offset, this.state.offset + this.state.perPage);
    const pagedPokemons = slice
      .filter(pp => {
        return selectedOption < pp.base_experience
      })
      .map(pp =>
        <ListItem
          name={pp.name}
          image={pp.sprites.front_default}
          key={pp.name}
          alt={pp.name}
          baseExperience={pp.base_experience}
        />
      );

    return (
      <>
        <Pagination
          pageCount={pageCount}
          handlePageChangeMethod={this.handlePageChange}
        />
        <div className={styles.mainWrapper}>
          {pagedPokemons}
        </div>
      </>
    )
  }
}

export default App;