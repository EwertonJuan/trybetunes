import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const user = await getUser();
      this.setState({
        user,
        loading: false,
      });
    });
  }

  render() {
    const { user, loading } = this.state;

    return (
      <div data-testid="header-component">
        {loading ? <Loading /> : <p data-testid="header-user-name">{user.name}</p>}
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </div>
    );
  }
}

export default Header;
