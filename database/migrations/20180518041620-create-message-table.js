export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('message', {
    message_id: {
      type: Sequelize.STRING(20),
      primaryKey: true
    },
    conversation_id: Sequelize.STRING(20),
    body: Sequelize.TEXT,
    created_at: Sequelize.BIGINT(20)
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('message')
};
