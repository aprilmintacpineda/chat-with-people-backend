import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import redirectActions from '../redux/reducers/redirect/actions';

class NotLoggedIn extends React.Component {
  componentDidMount () {
    this.validateUser(this.props);
  }

  componentDidUpdate () {
    this.validateUser(this.props);
  }

  validateUser = props => {
    if (props.sessionState.user) {
      props.go({
        payload: {
          to: '/' + props.sessionState.user.username
        }
      });
    }
  }

  render () {
    return this.props.sessionState.user? null : this.props.children;
  }
}

NotLoggedIn.propTypes = {
  children: PropTypes.element,
  go: PropTypes.func.isRequired,
  sessionState: PropTypes.object.isRequired
};

export default connect(store => ({
  sessionState: { ...store.session }
}), {
  ...redirectActions
})(NotLoggedIn);