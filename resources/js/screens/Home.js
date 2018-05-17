import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import testActions from '../redux/reducers/testReducer/actions';
import AuthButtons from './partials/AuthButtons';

class Home extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      showButtons: false,
      showContents: false,
      page: 1,
      lastPage: 3
    };
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        ...this.state,
        showContents: true
      });

      setTimeout(() => this.setState({
        ...this.state,
        showButtons: true
      }), 500);
    }, 500);
  }

  nextPage = () => {
    const page = this.state.page == this.state.lastPage? 1 : ++this.state.page;

    return this.setState({
      ...this.state,
      page
    });
  }

  prevPage = () => {
    const page = this.state.page == 1? this.state.lastPage : --this.state.page;

    return this.setState({
      ...this.state,
      page
    });
  }

  render () {
    console.log('home', this.props.testState, this.state);

    let contents;

    switch (this.state.page) {
      case 1:
        contents = (
          <CSSTransition
            in={this.state.showContents}
            timeout={300}
            unmountOnExit
            classNames="slide-left"
          >
            <div className="title-container">
              <p className="fab fa-rocketchat icon" />
              <p className="title">Chat with People</p>
              <p className="small-desc">Hobby project of April Mintac Pineda</p>
            </div>
          </CSSTransition>
        );
      break;
      case 2:
        contents = (
          <CSSTransition
            in={this.state.showContents}
            timeout={300}
            unmountOnExit
            classNames="slide-left"
          >
            <div className="title-container">
              <p className="fas fa-comments icon" />
              <p className="title">We can use it!</p>
              <p className="small-desc">Chat with anyone, anywhere, realtime.</p>
            </div>
          </CSSTransition>
        );
      break;
      case 3:
        contents = (
          <CSSTransition
            in={this.state.showContents}
            timeout={300}
            unmountOnExit
            classNames="slide-left"
          >
            <div className="title-container">
              <p className="fas fa-user-lock icon" />
              <p className="title">Safe, secured, and free!</p>
              <p className="small-desc">Rest assured that you're data is safe, even when you're offline.</p>
            </div>
          </CSSTransition>
        );
      break;
    }

    return (
      <div className="home-body body-wrapper">
        <CSSTransition
          in={this.state.showButtons}
          timeout={300}
          unmountOnExit
          classNames="fade"
        >
          <div>
            <span className="fas fa-chevron-right next next-prev-btns" onClick={this.nextPage} />
            <span className="fas fa-chevron-left prev next-prev-btns" onClick={this.prevPage} />
          </div>
        </CSSTransition>
        <AuthButtons />
        {contents}
      </div>
    );
  }
}

export default connect(store => ({
  testState: { ...store.testReducer }
}), {
  ...testActions
})(Home);