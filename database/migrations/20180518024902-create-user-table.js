export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('user', {
    user_id: {
      type: Sequelize.STRING(20),
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING(20),
      unique: true,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(255),
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    fullname: {
      type: Sequelize.STRING(70),
      allowNull: false
    },
    sex: {
      type: Sequelize.STRING(6),
      allowNull: false
    },
    confirm_token: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    created_at: {
      type: Sequelize.BIGINT(20),
      allowNull: false
    },
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
