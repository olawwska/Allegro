import React from 'react';
import ListItem from './components/ListItem/ListItem';
import Pagination from './components/Pagination/Pagination';
import styles from './App.module.scss';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader'



const Pokedex = require('pokedex-promise-v2');

const options = [
  { value: 'normal', label: 'normal' },
  { value: 'fighting', label: 'fighting' },
  { value: 'flying', label: 'flying' },
  { value: 'poison', label: 'poison' },
  { value: 'ground', label: 'ground' },
  { value: 'rock', label: 'rock' },
  { value: 'bug', label: 'bug' },
  { value: 'ghost', label: 'ghost' },
  { value: 'steel', label: 'steel' },
  { value: 'fire', label: 'fire' },
  { value: 'water', label: 'water' },
  { value: 'grass', label: 'grass' },
  { value: 'electric', label: 'electric' },
  { value: 'psychic', label: 'psychic' },
  { value: 'ice', label: 'ice' },
  { value: 'dragon', label: 'dragon' },
  { value: 'dark', label: 'dark' },
  { value: 'fairy', label: 'fairy' },
  { value: 'unknown', label: 'unknown' },
  { value: 'shadow', label: 'shadow' }
]

class App extends React.Component {

  state = {
    offset: 0,
    pokemonInfos: [],
    filtredPokemonInfos: [],
    perPage: 8,
    currentPage: 0,
    pageCount: null,
    selectedOption: null,
    loading: true
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
                  ...pokemonsInfos, res],
                filtredPokemonInfos: [
                  ...pokemonsInfos, res],
                loading: false
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

  handleSelectChange = (selectValue) => {
    const { pokemonInfos } = this.state;
    this.setState({
      selectedOption: selectValue,
      filtredPokemonInfos: pokemonInfos
        .filter(pokemon => {
          return pokemon.types[0].type.name === selectValue.value
        }
        )
    })
  }

  render() {

    if (this.state.loading) return (
      <>
        <Header />
        <Loader />
      </>)


    const { perPage, selectedOption, filtredPokemonInfos } = this.state;
    const pageCount = Math.ceil(filtredPokemonInfos.length / perPage)
    const slice = filtredPokemonInfos.slice(this.state.offset, this.state.offset + this.state.perPage);
    const pagedPokemons = slice
      .map(pp =>
        <ListItem
          name={pp.name}
          image={pp.sprites.front_default}
          key={pp.name}
          alt={pp.name}
          type={pp.types[0].type.name}
        />
      );

    return (
      <>
        <Header
          clickMethod={this.handleSelectChange}
          value={selectedOption}
          options={options}
        />
        <div className={styles.mainWrapper}>
          {pagedPokemons}
        </div>
        <div className={styles.footer}>
          <Pagination
            activeClassName={styles.container}
            count={pageCount}
            handlePageChangeMethod={this.handlePageChange}
          />
        </div>
      </>
    )
  }
}

export default App;