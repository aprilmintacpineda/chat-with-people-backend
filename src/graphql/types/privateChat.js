import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

export default new GraphQLObjectType({
  name: 'privateChatType',
  fields: {
    private_chat_id: { type: GraphQLString },
    receiver_user_id: { type: GraphQLString },
    sender_user_id: { type: GraphQLString },
    body: { type: GraphQLString },
    created_at: { type: GraphQLInt },
    seen_at: { type: GraphQLInt }
  }
});