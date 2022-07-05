import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const {
      trackName,
      previewUrl,
      trackId,
      toggleFavoriteSong,
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
            onChange={ toggleFavoriteSong }
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
  toggleFavoriteSong: PropTypes.func.isRequired,
  isSongFavorite: PropTypes.bool.isRequired,
};

export default MusicCard;
