import React from 'react';
import PropTypes from 'prop-types';

class Icon extends React.Component {
  render () {
    switch (this.props.name) {
      case 'menu':
        return <span className="fas fa-bars icon" />
      break;
    }
  }
}

Icon.propTypes = {
  name: PropTypes.string.isRequired
};

export default Icon;