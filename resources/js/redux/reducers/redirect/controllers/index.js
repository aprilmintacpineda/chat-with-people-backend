import actionTypes from '../actionTypes';
import go from './go';
import clear from './clear';

export default {
  [actionTypes.go]: go,
  [actionTypes.clear]: clear
};