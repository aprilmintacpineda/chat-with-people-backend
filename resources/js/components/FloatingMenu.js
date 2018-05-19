import React from 'react';
import Icon from './Icon';
import { Link } from 'react-router-dom';

export default class FloatingMenu extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      menuVisible: false
    };
  }

  toggleMenu = () => {
    this.setState({
      menuVisible: !this.state.menuVisible
    }, () => {
      if (this.state.menuVisible) {
        document.body.style.overflowY = 'hidden';
      } else {
        document.body.style.overflowY = 'auto';
      }
    });
  }

  render () {
    let body = null;
    if (this.state.menuVisible) {
      body = (
        <div className="body">
          <div className="overlay animate-shoot-down">
            <div>
              <Link to="/">Profile</Link>
            </div>
            <div>
              <Link to="/">Newsfeed</Link>
            </div>
            <div>
              <Link to="/">Settings</Link>
            </div>
            <span className="separator" />
            <div>
              <Link to="/">Log out</Link>
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