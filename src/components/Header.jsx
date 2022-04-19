/* import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      user: '',
      loading: false,
    };
  }

  componentDidMount() {
    // console.log(this);
    this.catchUser();
  }

  catchUser = async () => {
    console.log('catchuser')
    this.setState({
      loading: true,
    });
    const { userName } = await getUser();
  }

  render() {
    return (
      <header data-testid="header-component">
        <h1>Trybetunes</h1>
          {loading && <Loading />}
        </header>
    );
  }
}

export default Header; */
