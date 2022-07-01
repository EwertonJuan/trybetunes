import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = { loading: false };
  }

    handleChange = () => {
      const { song } = this.props;
      this.setState({ loading: true }, async () => {
        await addSong(song);
        this.setState({ loading: false });
      });
    }

    render() {
      const { trackName, previewUrl, trackId } = this.props;
      const { loading } = this.state;

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
              onChange={ this.handleChange }
              // checked={ console.log(true) }
            />
            {' '}
            Favorita
          </label>
          {loading && <Loading />}
        </div>
      );
    }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  song: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MusicCard;
