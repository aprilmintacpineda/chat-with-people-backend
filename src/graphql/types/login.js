import { GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'loginType',
  fields: {
    user_id: { type: GraphQLString },
    fullname: { type: GraphQLString },
    sex: { type: GraphQLString },
    username: { type: GraphQLString },
    token: { type: GraphQLString }
  }
});