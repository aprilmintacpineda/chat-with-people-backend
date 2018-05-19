import { combineReducers } from 'redux';
import register from './register';
import login from './login';
import messageBox from './messageBox';
import redirect from './redirect';
import session from './session';

export default combineReducers({
  register,
  messageBox,
  redirect,
  login,
  session
});