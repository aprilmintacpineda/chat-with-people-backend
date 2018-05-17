export function getRegisterRequestState (state) {
  return { ...state.register };
}

export function getRegisterFields (state) {
  const { register } = state;

  return Object.keys(register).reduce((value, key) => {
    if (key != 'request') {
      if (!value) {
        return `${key}: "${register[key].value}"`;
      }

      return `${value}, ${key}: "${register[key].value}"`;
    }

    return value;
  }, '');
}