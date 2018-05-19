import { getGraphQLFriendlyFields } from '../../../Utils';

export const getLoginFields = (state, exceptions) => getGraphQLFriendlyFields(state.login, exceptions);