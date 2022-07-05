import React from 'react';
import { Redirect } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import Header from './Header';
import Loading from './Loading';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      name: '',
      email: '',
      description: '',
      image: '',
      done: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const { name, email, description, image } = await getUser();
      this.setState({ loading: false, name, email, description, image });
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  isButtonDisabled = () => {
    const { name, email, description, image } = this.state;
    return (!name || !email || !description || !image);
  }

  saveProfile = (event) => {
    event.preventDefault();
    this.setState({ loading: true }, async () => {
      const { name, email, description, image } = this.state;
      await updateUser({ name, email, description, image });
      this.setState({ loading: false, done: true });
    });
  }

  render() {
    const { loading, name, email, description, image, done } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading ? <Loading /> : (
          <form onSubmit={ this.saveProfile }>
            <label htmlFor="edit-input-name">
              Editar nome
              {' '}
              <input
                type="text"
                data-testid="edit-input-name"
                id="edit-input-name"
                name="name"
                value={ name }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="edit-input-email">
              Editar email
              {' '}
              <input
                type="email"
                data-testid="edit-input-email"
                id="edit-input-email"
                name="email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="edit-input-description">
              Editar descrição
              {' '}
              <input
                type="text"
                data-testid="edit-input-description"
                id="edit-input-description"
                name="description"
                value={ description }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="edit-input-image">
              Editar imagem
              {' '}
              <input
                type="text"
                data-testid="edit-input-image"
                id="edit-input-image"
                name="image"
                value={ image }
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="submit"
              data-testid="edit-button-save"
              disabled={ this.isButtonDisabled() }
            >
              Salvar
            </button>
          </form>
        )}
        { done && <Redirect to="/profile" /> }
      </div>
    );
  }
}

export default ProfileEdit;
