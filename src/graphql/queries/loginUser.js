import { GraphQLString, GraphQLObjectType } from 'graphql';
import PasswordHash from 'password-hash';
import jsonwebtoken from 'jsonwebtoken';
import loginType from '../types/login';
import validateInputs from '../validations/validateLoginForm';
import { sequelize } from '../../models';
import secret from '../../secret';

export default {
  type: loginType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  resolve (obj, args) {
    return new Promise((resolve, reject) => {
      const validatedInputs = validateInputs(args);

      if (validatedInputs.email.errors.length
      || validatedInputs.password.errors.length) {
        return reject(JSON.stringify(validatedInputs));
      }

      sequelize.query('select * from user where email = :email and confirmed_at is not null', {
        replacements: {
          email: validatedInputs.email.value
        },
        type: sequelize.QueryTypes.SELECT
      })
      .then(([ user ]) => {
        if (!user || !PasswordHash.verify(validatedInputs.password.value, user.password)) {
          return reject(JSON.stringify({ submitError: [ 'Email or password is incorrect.' ] }));
        }

        delete user.password;
        delete user.confirm_token;
        delete user.confirmed_at;
        delete user.created_at;
        delete user.deleted_at;

        let token = jsonwebtoken.sign(user, secret, {
          expiresIn: '7 days'
        });

        return resolve({
          ...user,
          token
        });
      });
    });
  }
};