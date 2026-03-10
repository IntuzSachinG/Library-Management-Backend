'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
      await queryInterface.changeColumn("users", "mobile", {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
       validate: {
        isNumeric: true,
        is:/^\+?[1-9]\d{1,14}$/
      },

    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.changeColumn("users", "mobile", {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
       validate: {
        isNumeric: true,
        is:/^\+?[1-9]\d{1,14}$/
      },
    });
  }
};
