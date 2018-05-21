import React from 'react';
import Icon from '../Icon';
import Menu from './Menu';
import Search from './Search';

class FloatingMenu extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      menuVisible: false,
      searchVisible: false
    };
  }

  toggleMenu = () => {
    this.setState({
      ...this.state,
      searchVisible: false,
      menuVisible: !this.state.menuVisible
    }, this.hideYScroll);
  }

  toggleSearch = () => {
    this.setState({
      ...this.state,
      menuVisible: false,
      searchVisible: !this.state.searchVisible
    });
  }

  hideYScroll = () => {
    if (this.state.menuVisible) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }

  renderBody = () => {
    if (this.state.menuVisible) {
      return <Menu toggleSearch={this.toggleSearch} />;
    } else if (this.state.searchVisible) {
      return <Search toggleSearch={this.toggleSearch} />;
    }
  }

  render () {
    const body = this.renderBody();

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

export default FloatingMenu;