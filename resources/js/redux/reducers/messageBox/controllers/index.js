import actionTypes from '../actionTypes';
import { dialogue, confirm } from './types';
import flushMessage from './flush';

export default {
  [actionTypes.confirm]: confirm,
  [actionTypes.dialogue]: dialogue,
  [actionTypes.flushMessage]: flushMessage
};