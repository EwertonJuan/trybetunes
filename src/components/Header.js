import React from 'react';
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
      </div>
    );
  }
}

export default Header;
