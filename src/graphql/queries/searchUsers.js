import { GraphQLString, GraphQLObjectType, GraphQLList } from 'graphql';
import userType from '../types/user';
import { sequelize } from '../../models';

export default {
  type: new GraphQLList(userType),
  args: {
    searchString: { type: GraphQLString }
  },
  resolve (obj, args) {
    return new Promise((resolve, reject) => {
      sequelize.query('select * from user where email like :searchString or username like :searchString or fullname like :searchString', {
        replacements: {
          searchString: `%${args.searchString}%`
        },
        type: sequelize.QueryTypes.SELECT
      })
      .then(users => resolve(users));
    });
  }
};