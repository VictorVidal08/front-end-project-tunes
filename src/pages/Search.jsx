import React from 'react';
import Header from '../components/Header';

// lógica de código inspirada no componente Login.
class Search extends React.Component {
  constructor() {
    super();
    // console.log(this);
    this.state = {
      buttonDisabled: true,
      searchText: '',
    };
  }

  handleSearchChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { searchText } = this.state;
      const minSearch = 2;
      if (searchText.length >= minSearch) {
        this.setState({ buttonDisabled: false });
      } else {
        this.setState({ buttonDisabled: true });
      }
    });
    console.log(value);
  }

  render() {
    const { buttonDisabled, searchText } = this.state;
    return (
      <div data-testid="page-search">
        Search
        <Header />
        <form>
          <input
            type="text"
            name="searchText"
            onChange={ this.handleSearchChange }
            data-testid="search-artist-input"
            value={ searchText }
          />

          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ buttonDisabled }
            onClick={ this.handleButtonSearch }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
