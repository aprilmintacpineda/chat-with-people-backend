import initialState from '../initialState';

export function editSearchString (state, action) {
  if (!action.payload.value.length) return { ...initialState };

  return {
    searchString: action.payload.value,
    resultList: [],
    request: {
      pending: true,
      error: false
    }
  };
}

export function showSearchResults (state, action) {
  return {
    ...state,
    resultList: [ ...action.payload ],
    request: {
      pending: false,
      error: false
    }
  };
}

export function searchError (state,) {
  return {
    ...state,
    resultList: [],
    request: {
      pending: false,
      error: true
    }
  };
}