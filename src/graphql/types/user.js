import { GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'userType',
  fields: {
    user_id: { type: GraphQLString },
    fullname: { type: GraphQLString },
    sex: { type: GraphQLString },
    username: { type: GraphQLString }
  }
});