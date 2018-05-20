import React from 'react';
import PropTypes from 'prop-types';

class Icon extends React.Component {
  render () {
    switch (this.props.name.toLowerCase()) {
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
        return <span className="fas fa-comments icon" />;
      case 'close':
        return <span className="fas fa-times-circle icon" />;
      case 'loading':
        return <span className="fas fa-spinner fa-spin icon" />;
      case 'message':
        return <span className="fas fa-comment-alt icon" />;
      case 'follow':
        return <span className="fas fa-user-plus icon" />;
    }

    return null;
  }
}

Icon.propTypes = {
  name: PropTypes.string.isRequired
};

export default Icon;