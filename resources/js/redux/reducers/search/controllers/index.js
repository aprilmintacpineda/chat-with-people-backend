import actionTypes from '../actionTypes';
import { editSearchString, searchError, showSearchResults } from './search';

export default {
  [actionTypes.editSearchString]: editSearchString,
  [actionTypes.searchError]: searchError,
  [actionTypes.showResults]: showSearchResults
};