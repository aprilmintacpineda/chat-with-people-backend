import {
  GraphQLSchema,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList
} from 'graphql';
import registerUser from './registerUser';
import userType from './types/user';

const users = [
  {
    user_id: 'axsdaew',
    fullname: 'April Mintac Pineda',
    sex: 'Male',
    username: 'aprilmintacpineda'
  },
  {
    user_id: 'zxczxvxcv',
    fullname: 'Katherine Manalo Singson',
    sex: 'Female',
    username: 'kathysingson'
  },
  {
    user_id: 'qweqweqwe',
    fullname: 'Cyrine Julianne Manalo Singson',
    sex: 'Female',
    username: 'cjsingson'
  }
];

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    registerUser
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    searchUsers: {
      type: new GraphQLList(userType),
      args: {
        fullname: { type: GraphQLString },
        username: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        // console.log(parentValue, args);

        return users;
      }
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});