import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import InputText from '../forms/InputText';
import searchActions from '../../redux/reducers/search/actions';

class Search extends React.Component {
  render () {
    let searchResults;

    if (this.props.searchState.request.error) {
      searchResults = (
        <div className="unexpect-error">
          <p>An unexpected error occured. Please make sure that you are connected to the internet.</p>
          <a onClick={() => this.props.editSearchString({
            payload: {
              value: this.props.searchState.searchString
            }
          })}>
            <Icon name="reload"/> Try again
          </a>
        </div>
      );
    } else if (this.props.searchState.request.pending) {
      searchResults = <Icon name="loading" />;
    } else if (this.props.searchState.searchString) {
      searchResults = !this.props.searchState.resultList.length? <p>No results found.</p> : this.props.searchState.resultList.map((result, i) => (
        <div key={i} className="result">
          <p className="name">{result.fullname} | {result.username}</p>
          <div className="buttons">
            <a onClick={() => console.log(result.user_id)}><Icon name="message" /> Chat</a>
            <a><Icon name="user-profile" /> Profile</a>
            <a><Icon name="follow" /> Follow</a>
          </div>
        </div>
      ));
    } else {
      searchResults = <p>Search results will appear here.</p>;
    }

    return (
      <div key={2} className="search-body">
        <div className="overlay animate-shoot-down">
          <span
            className="close-btn"
            onClick={() => {
              this.props.toggleSearch();

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

Search.propTypes = {
  editSearchString: PropTypes.func.isRequired,
  searchState: PropTypes.object.isRequired,
  toggleSearch: PropTypes.func.isRequired
};

export default connect(store => ({
  searchState: { ...store.search }
}), {
  ...searchActions
})(Search);