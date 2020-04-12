import React from 'react';
import ListItem from './components/ListItem/ListItem';
import Pagination from './components/Pagination/Pagination';
import styles from './App.module.scss';
import Select from 'react-select'



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
    perPage: 10,
    currentPage: 0,
    pageCount: null,
    selectedOption: null,
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

    // const { pokemonInfos, perPage, selectedOption, filtredPokemonInfos } = this.state;
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
        <Select
          value={selectedOption}
          onChange={this.handleSelectChange}
          options={options}
          // styles={colourStyles}
          placeholder={'wybierz typ...'}
          theme={theme => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: 'hotpink',
              primary: 'black',
            },
          })}
        >
        </Select>
        <div className={styles.mainWrapper}>
          {pagedPokemons}
        </div>
        <Pagination
          count={pageCount}
          handlePageChangeMethod={this.handlePageChange}
        />
      </>
    )
  }
}

export default App;