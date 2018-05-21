export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('private_chat', {
    private_chat_id: Sequelize.STRING(20),
    receiver_user_id: Sequelize.STRING(20),
    sender_user_id: Sequelize.STRING(20),
    body: Sequelize.TEXT,
    created_at: Sequelize.BIGINT(20),
    seen_at: {
      type: Sequelize.BIGINT(20),
      allowNull: true
    },
    receiver_deleted_at: {
      type: Sequelize.BIGINT(20),
      allowNull: true
    },
    sender_deleted_at: {
      type: Sequelize.BIGINT(20),
      allowNull: true
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('private_chat')
};
