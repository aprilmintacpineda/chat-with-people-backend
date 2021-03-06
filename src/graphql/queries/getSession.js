import { GraphQLString, GraphQLObjectType } from 'graphql';
import jsonwebtoken from 'jsonwebtoken';
import loginType from '../types/login';
import { sequelize } from '../../models';
import secret from '../../secret';

export default {
  type: loginType,
  args: {
    token: { type: GraphQLString }
  },
  resolve (obj, args) {
    return new Promise((resolve, reject) => {
      const userData = jsonwebtoken.verify(args.token, secret);

      if (!userData) return reject();

      if (Date.now() >= userData.exp * 1000) return reject();

      sequelize.query('select * from user where email = :email and confirmed_at is not null', {
        replacements: {
          email: userData.email
        },
        type: sequelize.QueryTypes.SELECT
      })
      .then(([user]) => {
        if (!user) return reject();

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