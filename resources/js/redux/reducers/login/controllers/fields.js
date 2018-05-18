export function editEmail (state, action) {
  return {
    ...state,
    email: { ...action.payload.email }
  }
}

export function editPassword (state, action) {
  return {
    ...state,
    password: { ...action.payload.password }
  }
}