import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      isFavorite: false,
    };
  }

  componentDidMount() {
    const { favoritesRecovered } = this.props;
    console.log(favoritesRecovered);
    this.setState({
      isFavorite: favoritesRecovered,
    });
  }

  handleClick = ({ target }) => {
    // console.log(target.checked);
    this.setState({
      loading: true,
      isFavorite: target.checked,
    }, async () => {
      const { isFavorite } = this.state;
      // console.log(isFavorite);
      const { song } = this.props;
      if (isFavorite === true) {
        await addSong(song);
        this.setState({
          loading: false,
        });
      } else if (isFavorite === false) {
        // console.log('false');
        await removeSong(song);
        this.setState({
          loading: false,
        });
      }
    });
    /* const getSong = await addSong();
    console.log(getSong);
    this.setState({
      loading: false,
    }); */
    // console.log(this.state);
  }

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { isFavorite, loading } = this.state;
    return (

      <div>
        {/* {console.log(this.props)} */}
        { loading ? (<Loading />) : (
          <section>
            <h4>{ trackName }</h4>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
            </audio>
            <label htmlFor="favorite">
              Favorita
              <input
                id="favorite"
                type="checkbox"
                onChange={ this.handleClick }
                checked={ isFavorite }
                data-testid={ `checkbox-music-${trackId}` }
              />
            </label>

          </section>
        ) }

      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  song: PropTypes.objectOf.isRequired,
  favoritesRecovered: PropTypes.bool.isRequired,
};

export default MusicCard;
