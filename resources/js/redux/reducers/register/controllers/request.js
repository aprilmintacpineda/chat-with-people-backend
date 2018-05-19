import initialState from '../initialState';
import { clearErrors } from '../../../../Utils';

export function formSubmit (state) {
  return {
    ...clearErrors(state),
    request: {
      pending: true
    }
  };
}

export function formSubmitted (state, action) {
  if (action.payload && action.payload.success) return { ...initialState };

  return action.payload && action.payload.fields ? {
    ...state,
    ...action.payload.fields,
    request: {
      pending: false
    }
  } : {
    ...state,
    request: {
      pending: false
    }
  };
}