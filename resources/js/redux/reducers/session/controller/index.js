import actionTypes from '../actionTypes';
import { setSession, clearSession } from './user';
import { requestSubmit, requestSubmitted } from './request';

export default {
  [actionTypes.setSession]: setSession,
  [actionTypes.clearSession]: clearSession,
  [actionTypes.getSession]: requestSubmit,
  [actionTypes.clearRequest]: requestSubmitted
};