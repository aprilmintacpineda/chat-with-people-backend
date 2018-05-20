import { getGraphQLFriendlyFields } from '../../../Utils';

export function getRegisterFields (state) {
  return getGraphQLFriendlyFields(state.register);
}