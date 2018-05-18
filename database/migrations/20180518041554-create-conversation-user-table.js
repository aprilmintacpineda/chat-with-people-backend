export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('conversation_user', {
    conversation_id: {
      type: Sequelize.STRING(20),
      primaryKey: true
    },
    user_id: {
      type: Sequelize.STRING(20),
      primaryKey: true
    },
    joined_at: {
      type: Sequelize.BIGINT(20),
      allowNull: true
    },
    left_at: {
      type: Sequelize.BIGINT(20),
      allowNull: true
    }
  }),
  down: queryInterface => queryInterface.dropTable('conversation_user')
};
