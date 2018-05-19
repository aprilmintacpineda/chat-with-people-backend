import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BlockLoading from '../BlockLoading';
import sessionActions from '../../redux/reducers/session/actions';

class Session extends React.Component {
  componentDidMount () {
    const token = localStorage.getItem('token');

    if (token && !this.props.sessionState.user && !this.props.sessionState.checked) {
      this.props.getSession({
        payload: {
          pending: this.props.sessionState.request.pending,
          token
        }
      });
    } else {
      this.props.setSession({
        payload: {
          checked: true
        }
      });
    }
  }

  render () {
    if ((this.props.sessionState.request.pending
      && !this.props.sessionState.user)
    || (!this.props.sessionState.user
      && !this.props.sessionState.checked)) {
      return <BlockLoading /> ;
    }

    return this.props.children;
  }
}

Session.propTypes = {
  children: PropTypes.element.isRequired,
  sessionState: PropTypes.object.isRequired,
  setSession: PropTypes.func.isRequired,
  clearSession: PropTypes.func.isRequired,
  getSession: PropTypes.func.isRequired
};

export default connect(store => ({
  sessionState: { ...store.session }
}), {
  ...sessionActions
})(Session);