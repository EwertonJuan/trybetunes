import React from 'react';
import { Redirect } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import logo from '../styles/logo.svg';
import '../styles/Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      loading: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = () => {
    const { username } = this.state;
    this.setState({ loading: true }, async () => {
      await createUser({ name: username });
      this.setState({ loading: false });
    });
  }

  render() {
    const { username, loading } = this.state;
    const MIN_CHARACTERS = 3;

    return (
      <div data-testid="page-login">
        { loading ? <Loading /> : (
          <div className="main">
            <img src={ logo } alt="trybetunes" />
            <div className="container">
              <label htmlFor="login-name-input">
                <input
                  type="text"
                  data-testid="login-name-input"
                  id="login-name-input"
                  placeholder="Insira seu nome"
                  name="username"
                  onChange={ this.handleChange }
                />
              </label>
              <button
                className="btn btn-primary"
                type="submit"
                onClick={ this.handleClick }
                data-testid="login-submit-button"
                disabled={ username.length < MIN_CHARACTERS }
              >
                Entrar
              </button>
            </div>
            { localStorage.getItem('user') && <Redirect to="/search" /> }
          </div>
        )}
      </div>
    );
  }
}

export default Login;
