import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isFavorite: false,
      loading: false,
    };
  }

  handleClick = async ({ target }) => {
    console.log(target);
    this.setState({
      loading: true,
      isFavorite: target.checked,
    });
    const getSong = await addSong();
    console.log(getSong);
    this.setState({
      loading: false,
    });
    console.log(this.state);
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
            <label htmlFor="favoritMusics">
              Favorita
              <input
                id="isFavorite"
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
};

export default MusicCard;
