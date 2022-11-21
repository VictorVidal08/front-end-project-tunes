import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import './MusicCard.css';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      isFavorite: false,
    };
  }

  async componentDidMount() {
    const { trackId } = this.props;
    const favoritesRecovered = await getFavoriteSongs();
    const isFavorite = (favoritesRecovered.some((item) => (
      item.trackId === trackId)));
    this.setState({
      isFavorite,
    });
  }

  handleClick = ({ target }) => {
    this.setState({
      loading: true,
      isFavorite: target.checked,
    }, async () => {
      const { isFavorite } = this.state;
      console.log(isFavorite);
      const { song } = this.props;
      if (isFavorite === true) {
        await addSong(song);
        this.setState({
          loading: false,
        });
      } else if (isFavorite === false) {
        await removeSong(song);
        this.setState({
          loading: false,
        });
      }
    });
  }

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { isFavorite, loading } = this.state;
    return (

      <div className="musicCard-mother">
        { loading ? (<Loading />) : (
          <section className="musicCard-class">
            <h4>{ trackName }</h4>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
            </audio>
            <label htmlFor="favorite" className="label">
              Favorite Music?
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
};

export default MusicCard;
