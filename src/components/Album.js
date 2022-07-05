import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from './Header';
import Loading from './Loading';
import MusicCard from './MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

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

  addFavoriteSong = (song) => {
    this.setState({ loading: true }, async () => {
      await addSong(song);
      const newFavorite = await getFavoriteSongs();
      this.setState(({ favoriteSongs }) => ({
        loading: false,
        favoriteSongs: [...favoriteSongs, newFavorite[newFavorite.length - 1]],
      }));
    });
  }

  removeFavoriteSong = (song) => {
    this.setState({ loading: true }, async () => {
      await removeSong(song);
      const favorites = await getFavoriteSongs();
      this.setState({ loading: false, favoriteSongs: favorites });
    });
  }

  toggleFavoriteSong = ({ target }, song) => {
    if (target.checked) {
      this.addFavoriteSong(song);
    } else {
      this.removeFavoriteSong(song);
    }
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
                  toggleFavoriteSong={ (event) => this.toggleFavoriteSong(event, music) }
                  isSongFavorite={ this.isSongFavorite(music.trackId) }
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
