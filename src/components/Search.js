import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from './Header';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artist: '',
      loading: false,
      albums: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = () => {
    const { artist } = this.state;
    this.setState({ loading: true }, async () => {
      const albums = await searchAlbumsAPI(artist);
      this.setState({
        albums,
        loading: false,
      });
    });
  }

  render() {
    const { artist, loading, albums } = this.state;
    const MIN_CHARACTERS = 2;

    return (
      <div data-testid="page-search">
        <Header />
        <form>

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
            type="reset"
            data-testid="search-artist-button"
            onClick={ this.handleClick }
            disabled={ artist.length < MIN_CHARACTERS }
          >
            Pesquisar
          </button>
        </form>
        { loading && <Loading /> }
        { albums.length === 0 ? <p>Nenhum álbum foi encontrado</p> : (
          <>
            <p>
              Resultado de álbuns de:
              {' '}
              { artist }
            </p>
            {albums.map(({
              collectionId,
              collectionName,
              artistName,
              artworkUrl100,
            }) => (
              <li key={ collectionId }>
                <Link
                  to={ `/album/${collectionId}` }
                  data-testid={ `link-to-album-${collectionId}` }
                >
                  <img src={ artworkUrl100 } alt={ `Capa de ${collectionName}` } />
                  <span>{collectionName}</span>
                  <span>{artistName}</span>
                </Link>
              </li>
            ))}
          </>
        )}
        <ul />
      </div>
    );
  }
}

export default Search;
