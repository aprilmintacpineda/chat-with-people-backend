import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from './Icon';
import InputText from './forms/InputText';
import sessionActions from '../redux/reducers/session/actions';
import searchActions from '../redux/reducers/search/actions';

class FloatingMenu extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      menuVisible: false,
      searchVisible: false
    };
  }

  toggleMenu = () => {
    this.setState({
      ...this.state,
      searchVisible: false,
      menuVisible: !this.state.menuVisible
    }, () => this.hideYScroll(this.state));
  }

  toggleSearch = () => {
    this.setState({
      ...this.state,
      menuVisible: false,
      searchVisible: !this.state.searchVisible
    });
  }

  hideYScroll = state => {
    if (state.menuVisible) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }

  logout = () => {
    localStorage.clear();
    this.props.clearSession();
  }

  renderBody = () => {
    if (this.state.menuVisible) {
      return (
        <div key={1} className="menu-body">
          <div className="overlay animate-shoot-up">
            <div>
              <Link to={`/${this.props.sessionState.user.username}`}>Profile <Icon name="user-profile" /></Link>
            </div>
            <div>
              <Link to="/home">Newsfeed <Icon name="newsfeed" /></Link>
            </div>
            <div>
              <Link to="/settings">Settings <Icon name="cogs" /></Link>
            </div>
            <span className="separator" />
            <div>
              <Link to="/conversations">Conversations <Icon name="conversations" /></Link>
            </div>
            <div>
              <a onClick={this.toggleSearch}>Search <Icon name="search" /></a>
            </div>
            <span className="separator" />
            <div>
              <a onClick={this.logout}>Log out <Icon name="logout" /></a>
            </div>
          </div>
        </div>
      );
    } else if (this.state.searchVisible) {
      let searchResults;

      if (this.props.searchState.request.error) {
        searchResults = (
          <div className="unexpect-error">
            <p>An unexpected error occured. Please make sure that you are connected to the internet.</p>
            <a onClick={() => this.props.editSearchString({
              payload: {
                value: this.props.searchState.searchString
              }
            })}>Try again</a>
          </div>
        );
      } else if (this.props.searchState.request.pending) {
        searchResults = (
          <Icon name="loading" />
        );
      } else if (this.props.searchState.searchString) {
        searchResults = !this.props.searchState.resultList.length? <p>No results found.</p> : this.props.searchState.resultList.map((result, i) => (
          <div key={i} className="result">
            <p className="name">{result.fullname} | {result.username}</p>
            <div className="buttons">
              <a><Icon name="message" /> Chat</a>
              <a><Icon name="user-profile" /> Profile</a>
              <a><Icon name="follow" /> Follow</a>
            </div>
          </div>
        ));
      } else {
        searchResults = (<p>Search results will appear here.</p>);
      }

      return (
        <div key={2} className="search-body">
          <div className="overlay animate-shoot-down">
            <span
              className="close-btn"
              onClick={() => {
                this.toggleSearch();

                this.props.editSearchString({
                  payload: {
                    value: ''
                  }
                });
              }}
            >
              <Icon name="close" />
            </span>
            <div>
              <InputText
                placeholder="Type the name, username, or email of the person you are looking for."
                value={this.props.searchState.searchString}
                onChange={({ value }) => this.props.editSearchString({
                  payload: { value }
                })}
              />
            </div>
            <div className="result-list">{searchResults}</div>
          </div>
        </div>
      );
    }
  }

  render () {
    const body = this.renderBody();

    return (
      <div className="floating-menu-wrapper">
        {body}
        <div
          className="header"
          onClick={this.toggleMenu}
        >
          <Icon name="menu" />
        </div>
      </div>
    );
  }
}

FloatingMenu.propTypes = {
  clearSession: PropTypes.func.isRequired,
  sessionState: PropTypes.object.isRequired,
  editSearchString: PropTypes.func.isRequired,
  searchState: PropTypes.object.isRequired
};

export default connect(store => ({
  sessionState: { ...store.session },
  searchState: { ...store.search }
}), {
  ...sessionActions,
  ...searchActions
})(FloatingMenu);