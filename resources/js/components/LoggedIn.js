import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import redirectActions from '../redux/reducers/redirect/actions';

class LoggedIn extends React.Component {
  componentDidMount () {
    this.validateUser(this.props);
  }

  componentDidUpdate (nextProps) {
    this.validateUser(nextProps);
  }

  validateUser = props => {
    if (!props.sessionState.user
    && props.sessionState.checked) {
      props.go({
        payload: {
          to: '/auth/login'
        }
      });
    }
  }

  render () {
    return !this.props.sessionState.user? null : this.props.children;
  }
}

LoggedIn.propTypes = {
  children: PropTypes.element,
  go: PropTypes.func.isRequired,
  sessionState: PropTypes.object.isRequired
};

export default connect(store => ({
  sessionState: { ...store.session }
}), {
  ...redirectActions
})(LoggedIn);