"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      mobile: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isNumeric: true,
          len: [1, 10],
        },
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      gender: {
        type: Sequelize.ENUM("male", "female", "other"),
        allowNull: false,
        defaultValue: "male",
      },
      birthdate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
          isBefore: new Date().toISOString().split("T")[0],
        },
      },

      status: {
        type: Sequelize.ENUM("active", "suspended"),
        allowNull: false,
        defaultValue: "active",
      },

      role: {
        type: Sequelize.ENUM("user", "admin"),
        allowNull: false,
        defaultValue: "user",
      },

      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
      deleted_at: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("users");
  },
};
