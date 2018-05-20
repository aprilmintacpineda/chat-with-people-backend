import {
  GraphQLSchema,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList
} from 'graphql';
import registerUser from './mutations/registerUser';
import verifyEmail from './mutations/verifyEmail';
import loginUser from './queries/loginUser';
import getSession from './queries/getSession';
import searchUsers from './queries/searchUsers';

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    registerUser,
    verifyEmail
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    loginUser,
    getSession,
    searchUsers
  }
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});