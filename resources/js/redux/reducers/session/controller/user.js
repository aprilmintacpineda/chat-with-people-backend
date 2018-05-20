import initialState from '../initialState';

export function setSession (state, action) {
  return {
    ...state,
    ...action.payload
  };
}

export function clearSession () {
  return {
    ...initialState,
    checked: true
  };
}