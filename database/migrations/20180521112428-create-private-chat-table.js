export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('private_chat', {
    private_chat_id: {
      type: Sequelize.STRING(20),
      primaryKey: true
    },
    receiver_user_id: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    sender_user_id: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    body: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    created_at: {
      type: Sequelize.BIGINT(20),
      allowNull: false
    },
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
