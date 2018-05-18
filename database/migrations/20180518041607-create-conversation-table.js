export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('conversation', {
    conversation_id: {
      type: Sequelize.STRING(20),
      primaryKey: true
    },
    name: Sequelize.STRING(20),
    created_at: Sequelize.BIGINT(20)
  }),
  down: queryInterface => queryInterface.dropTable('conversation')
};
