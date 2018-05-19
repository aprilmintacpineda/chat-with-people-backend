import { baseReducer } from 'redux-abstract';
import initialState from './initialState';
import controllers from './controller';

export default (state = initialState, action) =>
  baseReducer(state, action, controllers);