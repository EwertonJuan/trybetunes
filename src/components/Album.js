import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from './Header';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      artist: '',
      artwork: '',
      album: '',
      loading: false,
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true }, async () => {
      const musics = await getMusics(id);
      this.setState({
        musics,
        artist: musics[0].artistName,
        artwork: musics[0].artworkUrl100,
        album: musics[0].collectionName,
        loading: false,
      });
    });
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
              { musics.slice(1).map(({ trackName, previewUrl, trackId }) => (
                <MusicCard
                  key={ trackId }
                  trackName={ trackName }
                  previewUrl={ previewUrl }
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
