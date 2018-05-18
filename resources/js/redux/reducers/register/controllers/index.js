import actionTypes from '../actionTypes';
import {
  editFullName,
  editSex,
  editUsername,
  editEmail,
  editPassword,
  editRepassword
} from './fields';
import { formSubmit, formSubmitted } from './request';

export default {
  [actionTypes.editFullName]: editFullName,
  [actionTypes.editSex]: editSex,
  [actionTypes.editUsername]: editUsername,
  [actionTypes.editEmail]: editEmail,
  [actionTypes.editPassword]: editPassword,
  [actionTypes.editRepassword]: editRepassword,
  [actionTypes.formSubmit]: formSubmit,
  [actionTypes.formSubmitted]: formSubmitted,
  [actionTypes.verifyEmail]: formSubmit
};