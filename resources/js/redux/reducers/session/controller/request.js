export function requestSubmit (state) {
  return {
    ...state,
    request: {
      pending: true
    }
  };
}

export function requestSubmitted (state) {
  return {
    ...state,
    request: {
      pending: false
    }
  };
}