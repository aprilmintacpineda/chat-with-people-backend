import { getGraphQLFriendlyFields, getRequestState } from '../../../Utils';

export const getLoginFields = (state, exceptions) => getGraphQLFriendlyFields(state.login, exceptions);