import { GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'createType',
  fields: {
    result: { type: GraphQLString }
  }
});