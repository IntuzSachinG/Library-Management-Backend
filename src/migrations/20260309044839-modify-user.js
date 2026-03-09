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
    });

    await queryInterface.changeColumn("users", "password", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn("users", "gender", {
      type: Sequelize.ENUM("male", "female", "other"),
      allowNull: false,
    });

    await queryInterface.changeColumn("users", "birthdate", {
      type: Sequelize.DATEONLY,
      allowNull: false,
    });

    await queryInterface.changeColumn("users", "status", {
      type: Sequelize.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "active",
    });

    await queryInterface.changeColumn("users", "role", {
      type: Sequelize.ENUM("student", "admin"),
      allowNull: false,
      defaultValue: "student",
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
    });

    await queryInterface.changeColumn("users", "password", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn("users", "gender", {
      type: Sequelize.ENUM("male", "female", "other"),
      allowNull: false,
    });

    await queryInterface.changeColumn("users", "birthdate", {
      type: Sequelize.DATEONLY,
      allowNull: false,
    });

    await queryInterface.changeColumn("users", "status", {
      type: Sequelize.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "active",
    });

    await queryInterface.changeColumn("users", "role", {
      type: Sequelize.ENUM("student", "admin"),
      allowNull: false,
      defaultValue: "student",
    });


  }
};
