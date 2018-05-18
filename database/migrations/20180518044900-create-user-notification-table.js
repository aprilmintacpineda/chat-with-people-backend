export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('user_notification', {
    user_notification_id: {
      type: Sequelize.STRING(20),
      primaryKey: true
    },
    user_id: Sequelize.STRING(20),
    body: Sequelize.STRING(255),
    created_at: Sequelize.BIGINT(20),
    seen_at: Sequelize.BIGINT(20)
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('user_notification')
};
