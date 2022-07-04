import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from './Header';
import Loading from './Loading';
import MusicCard from './MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      artist: '',
      artwork: '',
      album: '',
      loading: false,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true }, async () => {
      const musics = await getMusics(id);
      const favorites = await getFavoriteSongs();
      this.setState(({ favoriteSongs }) => ({
        musics,
        artist: musics[0].artistName,
        artwork: musics[0].artworkUrl100,
        album: musics[0].collectionName,
        loading: false,
        favoriteSongs: [...favoriteSongs, ...favorites],
      }));
    });
  }

  componentDidUpdate() {
    /* this.setState({ loading: true }, async () => {
      const favorites = await getFavoriteSongs();
      this.setState(({ favoriteSongs }) => ({ favoriteSongs: [...favoriteSongs, ...favorites] }));
    }); */
  }

  addFavoriteSong = (song) => {
    this.setState({ loading: true }, async () => {
      await addSong(song);
      this.setState({ loading: false });
    });
  }

  updateFavoriteSongs = () => {
    this.setState({ loading: true }, async () => {
      const favorites = await getFavoriteSongs();
      this.setState(({ favoriteSongs }) => ({
        loading: false, favoriteSongs: [...favoriteSongs, ...favorites] }));
    });
  }

  isSongFavorite = (id) => {
    const { favoriteSongs } = this.state;
    return favoriteSongs.some(({ trackId }) => trackId === id);
  }

  render() {
    const { musics, artist, album, artwork, loading } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Loading /> : (
          <>
            <div>
              <img
                src={ artwork }
                alt={ `Capa de ${album}` }
              />
              <h3 data-testid="album-name">{ album }</h3>
              <p data-testid="artist-name">{ artist }</p>
            </div>
            <ul>
              { musics.slice(1).map((music) => (
                <MusicCard
                  key={ music.trackId }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  trackId={ music.trackId }
                  addFavoriteSong={ () => this.addFavoriteSong(music) }
                  isSongFavorite={ this.isSongFavorite(music.trackId) }
                  /* uptadeFavoriteSongs={ this.updateFavoriteSongs } */
                />
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
