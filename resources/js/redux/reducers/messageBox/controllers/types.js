export function dialogue (state, action) {
  return {
    message: action.payload,
    type: 'dialogue'
  };
}

export function confirm (state, action) {
  return {
    message: action.payload,
    type: 'confirm'
  };
}