export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('user', {
    user_id: {
      type: Sequelize.STRING(20),
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING(20),
      unique: true
    },
    email: {
      type: Sequelize.STRING(255),
      unique: true
    },
    password: Sequelize.STRING(255),
    fullname: Sequelize.STRING(70),
    sex: Sequelize.STRING(6),
    confirm_token: Sequelize.STRING(20),
    created_at: Sequelize.BIGINT(20),
    confirmed_at: {
      type: Sequelize.BIGINT(20),
      allowNull: true
    },
    deleted_at: {
      type: Sequelize.BIGINT(20),
      allowNull: true
    }
  }),
  down: queryInterface => queryInterface.dropTable('user')
};
