import React from 'react';
import PropTypes from 'prop-types';

class Icon extends React.Component {
  render () {
    switch (this.props.name) {
      case 'menu':
        return <span className="fas fa-bars icon" />;
      case 'user-profile':
        return <span className="fas fa-user-circle icon" />;
      case 'newsfeed':
        return <span className="far fa-newspaper icon" />;
      case 'cogs':
        return <span className="fas fa-cogs icon" />;
      case 'search':
        return <span className="fas fa-search icon" />;
      case 'logout':
        return <span className="fas fa-sign-out-alt icon" />;
      case 'conversations':
        return <span className="fas fa-comments" />;
    }

    return null;
  }
}

Icon.propTypes = {
  name: PropTypes.string.isRequired
};

export default Icon;