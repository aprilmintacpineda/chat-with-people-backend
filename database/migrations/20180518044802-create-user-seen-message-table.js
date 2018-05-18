export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('user_seen_message', {
    message_id: {
      type: Sequelize.STRING(20),
      primaryKey: true
    },
    user_id: {
      type: Sequelize.STRING(20),
      primaryKey: true
    },
    seen_at: Sequelize.BIGINT(20)
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('user_seen_message')
};
