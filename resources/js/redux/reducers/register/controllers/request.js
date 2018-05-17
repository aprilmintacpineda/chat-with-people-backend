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
  if (action.payload && action.payload.success) {
    return {
      ...initialState
    };
  }

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