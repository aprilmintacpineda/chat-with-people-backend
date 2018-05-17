import { GraphQLString, GraphQLObjectType } from 'graphql';
import validator from 'smart-input-validator';
import userType from './types/user';
import validateInputs from './validations/validateRegisterForm';

export default {
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
    let validatedInputs = validateInputs(args);

    if (validatedInputs.fullname.errors.length
     || validatedInputs.username.errors.length
     || validatedInputs.email.errors.length
     || validatedInputs.sex.errors.length
     || validatedInputs.password.errors.length
     || validatedInputs.repassword.errors.length) {
      throw new Error(JSON.stringify(validatedInputs));
    }

    // validated if email exists
    // validate if username exists
    // return successful
  }
};