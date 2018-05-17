import {
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';

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

const userType = new GraphQLObjectType({
  name: 'userType',
  fields: {
    user_id: { type: GraphQLString },
    fullname: { type: GraphQLString },
    sex: { type: GraphQLString },
    username: { type: GraphQLString }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    registerUser: {
      type: userType,
      args: {
        fullname: { type: GraphQLString },
        sex: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        repassword: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        console.log(parentValue, args);
      }
    }
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