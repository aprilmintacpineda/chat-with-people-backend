export function editFullName (state, action) {
  return {
    ...state,
    fullname: { ...action.payload.fullname }
  };
}

export function editSex (state, action) {
  return {
    ...state,
    sex: action.payload.sex
  };
}

export function editUsername (state, action) {
  return {
    ...state,
    username: { ...action.payload.username }
  };
}

export function editEmail (state, action) {
  return {
    ...state,
    email: { ...action.payload.email }
  };
}

export function editPassword (state, action) {
  return {
    ...state,
    password: { ...action.payload.password }
  };
}

export function editRepassword (state, action) {
  return {
    ...state,
    repassword: { ...action.payload.repassword }
  };
}