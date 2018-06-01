export function setSocket (state, action) {
  return {
    ...state,
    socket: action.payload
  };
}

export function clearSocket (state, action) {
  return {
    ...state,
    socket: null
  };
}