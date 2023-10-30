import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import logo from '../styles/altlogo.svg';
import avatar from '../styles/avatar.svg';
import '../styles/Header.css';

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
    const { pathname } = window.location;

    return (
      <>
        <div className="title-bar">
          <img src={ logo } alt="trybetunes" className="logo" />
          {loading ? <Loading />
            : (
              <div className="user">
                <img src={ avatar } alt="avatar" className="avatar" />
                <p data-testid="header-user-name" className="username">{user.name}</p>
              </div>)}
        </div>
        <div data-testid="header-component" className="header">
          <Link
            to="/search"
            data-testid="link-to-search"
            className={ pathname !== '/favorites' && '/profile' ? 'selected' : 'link' }
          >
            Pesquisa
          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className={ pathname === '/favorites' ? 'selected' : 'link' }
          >
            Favoritas
          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
            className={ pathname === '/profile' ? 'selected' : 'link' }
          >
            Perfil
          </Link>
        </div>
      </>
    );
  }
}

export default Header;
