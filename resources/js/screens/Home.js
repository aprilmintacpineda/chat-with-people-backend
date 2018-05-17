import React from 'react';
import { connect } from 'react-redux';
import AuthButtons from './partials/AuthButtons';

export default class Home extends React.Component {
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
          <div key={1} className="title-container animate-slide-left">
            <p className="fab fa-rocketchat icon" />
            <p className="title">Chat with People</p>
            <p className="small-desc">Hobby project of April Mintac Pineda</p>
          </div>
        );
      break;
      case 2:
        contents = (
          <div key={2} className="title-container animate-slide-left">
            <p className="fas fa-comments icon" />
            <p className="title">We can use it!</p>
            <p className="small-desc">Chat with anyone, anywhere, realtime.</p>
          </div>
        );
      break;
      case 3:
        contents = (
          <div key={3} className="title-container animate-slide-left">
            <p className="fas fa-user-lock icon" />
            <p className="title">Safe, secured, and free!</p>
            <p className="small-desc">Rest assured that you're data is safe, even when you're offline.</p>
          </div>
        );
      break;
    }

    return (
      <div className="home-body body-wrapper">
        <span className="fas fa-chevron-right next next-prev-btns animate-shoot-down" onClick={this.nextPage} />
        <span className="fas fa-chevron-left prev next-prev-btns animate-shoot-down" onClick={this.prevPage} />
        <AuthButtons />
        {contents}
      </div>
    );
  }
}