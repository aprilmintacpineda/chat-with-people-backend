import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import sessionActions from '../../redux/reducers/session/actions';

class Menu extends React.Component {
  logout = () => {
    localStorage.clear();
    this.props.clearSession();
  }

  render () {
    return (
      <div key={1} className="menu-body">
        <div className="overlay animate-shoot-up">
          <div>
            <Link to={`/${this.props.sessionState.user.username}`}>Profile <Icon name="user-profile" /></Link>
          </div>
          <div>
            <Link to="/home">Newsfeed <Icon name="newsfeed" /></Link>
          </div>
          <div>
            <Link to="/settings">Settings <Icon name="cogs" /></Link>
          </div>
          <span className="separator" />
          <div>
            <Link to="/conversations">Conversations <Icon name="conversations" /></Link>
          </div>
          <div>
            <a onClick={this.props.toggleSearch}>Search <Icon name="search" /></a>
          </div>
          <span className="separator" />
          <div>
            <a onClick={this.logout}>Log out <Icon name="logout" /></a>
          </div>
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  toggleSearch: PropTypes.func.isRequired,
  sessionState: PropTypes.object.isRequired,
  clearSession: PropTypes.func.isRequired,
  sessionState: PropTypes.object.isRequired
};

export default connect(store => ({
  sessionState: { ...store.session }
}), {
  ...sessionActions
})(Menu);