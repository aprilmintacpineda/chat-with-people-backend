import actionTypes from '../actionTypes';
import { editEmail, editPassword } from './fields';
import { formSubmit, formSubmitted } from './request';

export default {
  [actionTypes.editEmail]: editEmail,
  [actionTypes.editPassword]: editPassword,
  [actionTypes.formSubmit]: formSubmit,
  [actionTypes.formSubmitted]: formSubmitted
};