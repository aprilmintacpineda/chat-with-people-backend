import React from 'react';
import { connect } from 'react-redux';
import testActions from '../redux/reducers/testReducer/actions';

class Home extends React.Component {
  render () {
    console.log('home state', this.props.testState);

    return (
      <div>
        <h1>Welcome home!</h1>
        <a onClick={() => this.props.testAction()}>Dispatch a test action</a>
      </div>
    );
  }
}

export default connect(store => ({
  testState: { ...store.testReducer }
}), {
  ...testActions
})(Home);