import { getGraphQLFriendlyFields } from '../../../Utils';

export const getRegisterFields = state => getGraphQLFriendlyFields(state.register);