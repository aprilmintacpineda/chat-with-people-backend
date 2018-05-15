import {
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: new GraphQLObjectType({
        name: 'User',
        fields: {
          id: { type: GraphQLString },
          name: { type: GraphQLString },
          gender: { type: GraphQLString },
          email: { type: GraphQLString }
        }
      }),
      args: {
        id: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        console.log(args);

        return {
          id: 'abc',
          name: 'April Mintac Pineda',
          gender: 'Male',
          email: 'april@pineda.com'
        };
      }
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery
});