import React from 'react';
import Header from './Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artist: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { artist } = this.state;
    const MIN_CHARACTERS = 2;

    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="search-artist-input">
          <input
            data-testid="search-artist-input"
            id="search-artist-input"
            placeholder="Nome do Artista"
            name="artist"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ artist.length < MIN_CHARACTERS }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
