import React from 'react';
import { connect } from 'react-redux';
import redirectActions from '../../redux/reducers/redirect/actions';

class Redirect extends React.Component {
  componentWillUpdate (nextProps) {
    const { to } = nextProps.redirectState;

    console.log(to);

    if (to) {
      this.props.clear();
      this.props.history.push(to);
    }
  }

  render () {
    return this.props.children;
  }
}

export default connect(store => ({
  redirectState: { ...store.redirect }
}), {
  ...redirectActions
})(Redirect);