import { getGraphQLFriendlyFields, getRequestState } from '../../../Utils';

export const getRegisterFields = state => getGraphQLFriendlyFields(state.register);