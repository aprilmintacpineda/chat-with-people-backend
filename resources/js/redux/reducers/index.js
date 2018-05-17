import { combineReducers } from 'redux';
import register from './register';
import messageBox from './messageBox';
import redirect from './redirect';

export default combineReducers({
  register,
  messageBox,
  redirect
});