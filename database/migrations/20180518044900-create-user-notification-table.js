export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('user_notification', {
    user_notification_id: {
      type: Sequelize.STRING(20),
      primaryKey: true
    },
    user_id: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    body: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    created_at: {
      type: Sequelize.BIGINT(20),
      allowNull: false
    },
    seen_at: Sequelize.BIGINT(20)
  }),
  down: queryInterface => queryInterface.dropTable('user_notification')
};
