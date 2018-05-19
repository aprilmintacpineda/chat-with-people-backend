import { GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'userType',
  fields: {
    fullname: { type: GraphQLString },
    sex: { type: GraphQLString },
    username: { type: GraphQLString },
    token: { type: GraphQLString }
  }
});