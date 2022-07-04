import React from 'react';
import PropTypes from 'prop-types';
// import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
// import Loading from './Loading';

class MusicCard extends React.Component {
  /* componentDidMount() {
    const { updateFavoriteSongs } = this.props;
    updateFavoriteSongs();
  } */

  /* handleChange = () => {
      const { song } = this.props;
      this.setState({ loading: true }, async () => {
        await addSong(song);
        this.setState({ loading: false });
      });
    } */

  render() {
    const {
      trackName,
      previewUrl,
      trackId,
      addFavoriteSong,
      isSongFavorite,
    } = this.props;

    return (
      <div>
        <span>{ trackName }</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ `checkbox-music-${trackId}` }>
          <input
            type="checkbox"
            id={ `checkbox-music-${trackId}` }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ addFavoriteSong }
            defaultChecked={ isSongFavorite }
          />
          {' '}
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  addFavoriteSong: PropTypes.func.isRequired,
  isSongFavorite: PropTypes.bool.isRequired,
  /* updateFavoriteSongs: PropTypes.func.isRequired, */
  /* song: PropTypes.objectOf(PropTypes.any).isRequired, */
};

export default MusicCard;
