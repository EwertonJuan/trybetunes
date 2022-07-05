import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: {},
    };
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const user = await getUser();
      this.setState({ loading: false, user });
    });
  }

  render() {
    const { loading, user } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? <Loading /> : (
          <div>
            <img
              src={ user.image }
              alt={ `Foto de ${user.name}` }
              data-testid="profile-image"
            />
            <p>{ user.name }</p>
            <p>{ user.email }</p>
            <p>{ user.description }</p>
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
