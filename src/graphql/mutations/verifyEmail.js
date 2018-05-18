import { GraphQLString, GraphQLObjectType } from 'graphql';
import createType from '../types/create';
import { sequelize } from '../../models';

export default {
  type: createType,
  args: {
    confirm_token: { type: GraphQLString }
  },
  resolve (obj, args) {
    return new Promise((resolve, reject) => {
      if (!args.confirm_token) return reject();

      sequelize.query('select count(*) as doesExist from user where confirm_token = :confirm_token and confirmed_at is null', {
        replacements: {
          confirm_token: args.confirm_token
        },
        type: sequelize.QueryTypes.SELECT
      })
      .then(([ QResult ]) => {
        if (!QResult.doesExist) throw new Error;

        return sequelize.query('update user set confirmed_at = :confirmed_at', {
          replacements: {
            confirmed_at: Date.now()
          },
          type: sequelize.QueryTypes.UPDATE
        });
      })
      .then(QResult => {
        if (!QResult[1]) throw new Error;

        return resolve({
          result: 'success'
        });
      })
      .catch(() => reject());
    });
  }
};