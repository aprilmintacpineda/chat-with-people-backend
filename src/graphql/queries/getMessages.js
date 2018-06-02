import { GraphQLString, GraphQLList, GraphQLInt } from 'graphql';
import jsonwebtoken from 'jsonwebtoken';
import secret from '../../secret';
import privateChatType from '../types/privateChat';
import { sequelize } from '../../models';

export default {
  type: new GraphQLList(privateChatType),
  args: {
    user_id: { type: GraphQLString },
    page: { type: GraphQLInt }
  },
  resolve (obj, args, ctx) {
    const userData = jsonwebtoken.verify(ctx.headers.authorization.split(' ')[1], secret);

    return new Promise((resolve, reject) => {
      if (!userData) return reject();

      const limit = 10;
      const offset = args.page * limit - limit;

      Promise.all([
        sequelize.query(`
          select * from (
            select * from private_chat
            where (
              (
                (sender_user_id = :user_id and receiver_user_id = :other_user_id) or
                (sender_user_id = :other_user_id and receiver_user_id = :user_id)
              ) and
              created_at >= (UNIX_TIMESTAMP() - 3600 * 24 * 5) * 1000
            )
            order by created_at desc
            limit ${offset}, ${limit}
          ) as private_chat order by created_at asc
        `, {
          replacements: {
            user_id: userData.user_id,
            other_user_id: args.user_id
          },
          type: sequelize.QueryTypes.SELECT
        }),
        sequelize.query('select * from user where user_id = :other_user_id', {
          replacements: {
            other_user_id: args.user_id
          },
          type: sequelize.QueryTypes.SELECT
        })
      ])
      .then(([chatMessages]) => resolve(chatMessages || []));
    });
  }
};