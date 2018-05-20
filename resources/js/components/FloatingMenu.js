import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from './Icon';
import sessionActions from '../redux/reducers/session/actions';

class FloatingMenu extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      menuVisible: false
    };
  }

  toggleMenu = () => {
    this.setState({
      menuVisible: !this.state.menuVisible
    }, () => this.hideYScroll(this.state));
  }

  hideYScroll = state => {
    if (state.menuVisible) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }

  logout = () => {
    localStorage.clear();
    this.props.clearSession();
  }

  render () {
    let body = null;
    if (this.state.menuVisible) {
      body = (
        <div className="body">
          <div className="overlay animate-shoot-down">
            <div>
              <Link to="/">Profile <Icon name="user-profile" /></Link>
            </div>
            <div>
              <Link to="/">Newsfeed <Icon name="newsfeed" /></Link>
            </div>
            <div>
              <Link to="/">Settings <Icon name="cogs" /></Link>
            </div>
            <span className="separator" />
            <div>
              <Link to="/">Conversations <Icon name="conversations" /></Link>
            </div>
            <div>
              <Link to="/">Search <Icon name="search" /></Link>
            </div>
            <span className="separator" />
            <div>
              <a onClick={this.logout}>Log out <Icon name="logout" /></a>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="floating-menu-wrapper">
        {body}
        <div
          className="header"
          onClick={this.toggleMenu}
        >
          <Icon name="menu" />
        </div>
      </div>
    );
  }
}

FloatingMenu.propTypes = {
  clearSession: PropTypes.func.isRequired
};

export default connect(null, {
  ...sessionActions
})(FloatingMenu);