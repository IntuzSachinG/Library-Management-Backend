"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("books", [
      {
        id: "a52c57ef-6c6e-45d0-ab4c-0e7b1d8073ed",
        title: "C Language",
        author: "Robert Martin",
        image: "cbook.jpg",
        description: "A handbook of c book",
        quantity: 22,
        status: "available",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "6ee80709-162c-429c-a653-e18b0e8c6526",
        title: "Javascript",
        author: "Dale Steyn",
        image: "abc.jpg",
        description: "A best book in galaxy",
        quantity: 2,
        status: "unavailable",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "19c7d9fb-7fb9-48c5-b72a-677df1476501",
        title: "Python",
        author: "Mr.Antigravity",
        image: "rty.jpg",
        description: "A Best Book in mars",
        quantity: 12,
        status: "available",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "617532df-114a-4b1c-843b-c3e34e17c89b",
        title: "Ruby",
        author: "Nick",
        image: "tyt.jpg",
        description: "hello books",
        quantity: 8,
        status: "unavailable",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "1f70f293-5365-4870-bc41-4990526cf105",
        title: "sequelize",
        author: "alex",
        image: "btr.jpg",
        description: "hello sequelize.",
        quantity: 6,
        status: "available",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("books", null, {});
  },
};
