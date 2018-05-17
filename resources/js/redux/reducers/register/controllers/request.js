import initialState from '../initialState';

export function formSubmit (state, action) {
  return {
    ...state,
    request: {
      pending: true
    }
  };
}

export function formSubmitted (state, action) {
  if (action.payload.shouldClearState) {
    return {
      ...initialState
    };
  }

  return {
    ...state,
    request: {
      pending: false
    }
  };
}