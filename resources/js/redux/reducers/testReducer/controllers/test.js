export function test (state, action) {
  console.log('reducer!', action);
  return { ...state };
}