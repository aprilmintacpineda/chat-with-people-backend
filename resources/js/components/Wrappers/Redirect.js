import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import redirectActions from '../../redux/reducers/redirect/actions';

class Redirect extends React.Component {
  componentDidUpdate (nextProps) {
    const { to } = nextProps.redirectState;

    if (to) {
      this.props.clear();
      this.props.history.push(to);
    }
  }

  render () {
    return this.props.children;
  }
}

Redirect.propTypes = {
  clear: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
};

export default connect(store => ({
  redirectState: { ...store.redirect }
}), {
  ...redirectActions
})(Redirect);