export default (state, action) => ({
  ...state,
  to: action.payload.to
});