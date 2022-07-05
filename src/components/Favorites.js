import React from 'react';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Header from './Header';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const favoriteSongs = await getFavoriteSongs();
      this.setState({ loading: false, favoriteSongs });
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

  isSongFavorite = (id) => {
    const { favoriteSongs } = this.state;
    return favoriteSongs.some(({ trackId }) => trackId === id);
  }

  render() {
    const { loading, favoriteSongs } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        { loading ? <Loading /> : (
          favoriteSongs.map((song) => (
            <MusicCard
              key={ song.trackId }
              trackName={ song.trackName }
              previewUrl={ song.previewUrl }
              trackId={ song.trackId }
              toggleFavoriteSong={ () => this.removeFavoriteSong(song) }
              isSongFavorite={ this.isSongFavorite(song.trackId) }
            />
          ))
        )}
      </div>
    );
  }
}

export default Favorites;
