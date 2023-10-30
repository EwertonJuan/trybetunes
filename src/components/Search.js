import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from './Header';
import Loading from './Loading';
import '../styles/Search.css';

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
              className="form-control"
            />
          </label>
          <button
            type="reset"
            data-testid="search-artist-button"
            onClick={ this.handleClick }
            disabled={ artist.length < MIN_CHARACTERS }
            className="btn btn-primary"
          >
            Pesquisar
          </button>
        </form>
        { loading && <Loading /> }
        { albums.length === 0
          ? (<div className="search"><p>Nenhum álbum foi encontrado</p></div>) : (
            <div className="search">
              <p>
                Resultado de álbuns de:
                {' '}
                { artist }
              </p>
              <ul className="albums-list">

                {albums.map(({
                  collectionId,
                  collectionName,
                  artistName,
                  artworkUrl100,
                }) => (
                  <li key={ collectionId } className="album">
                    <Link
                      to={ `/album/${collectionId}` }
                      data-testid={ `link-to-album-${collectionId}` }
                      className="card"
                    >
                      <img src={ artworkUrl100 } alt={ `Capa de ${collectionName}` } />
                      <span className="album-name">{collectionName}</span>
                      <span className="artist-name">{artistName}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        <ul />
      </div>
    );
  }
}

export default Search;
