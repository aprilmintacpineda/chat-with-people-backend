export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('conversation_notification', {
    conversation_notification_id: {
      type: Sequelize.STRING(20),
      primaryKey: true
    },
    conversation_id: {
      type: Sequelize.STRING(20),
      primaryKey: true
    },
    body: Sequelize.STRING(255),
    created_at: Sequelize.BIGINT(20)
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('conversation_notification')
};
