import actionTypes from '../actionTypes';
import { setSession, clearSession } from './user';
import { requestSubmit, requestSubmitted } from './request';
import { setSocket, clearSocket } from './socket';

export default {
  [actionTypes.setSession]: setSession,
  [actionTypes.clearSession]: clearSession,
  [actionTypes.getSession]: requestSubmit,
  [actionTypes.clearRequest]: requestSubmitted,
  [actionTypes.setSocket]: setSocket,
  [actionTypes.clearSocket]: clearSocket
};