import { getGraphQLFriendlyFields } from '../../../Utils';

export function getLoginFields (state, exceptions) {
  return getGraphQLFriendlyFields(state.login, exceptions);
}