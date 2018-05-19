export function clearErrors (state, inclusions = []) {
  let newState = { ...state };

  Object.keys(state)
  .forEach(key => {
    if (state[key].errors) {
      newState[key].errors = [];
    } else if (inclusions.includes(key)) {
      if (state[key].errors) {
        newState[key].errors = [];
      } else {
        newState[key] = [];
      }
    }
  });

  return newState;
}