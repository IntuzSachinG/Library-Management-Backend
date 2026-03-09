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
    await queryInterface.bulkInsert("issues", [
      {
        id: "78ec6dfb-571c-459c-a508-9d91acaff150",
        bookId: "19c7d9fb-7fb9-48c5-b72a-677df1476501",
        userId: "55212d7c-d615-46ae-b083-7cbeda77129e",
        issueDate: new Date("2026-03-01"),
        returnDate: null,
        status: "issued",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "2f925873-0f72-4ce1-ad2c-b2399e164e80",
        bookId: "1f70f293-5365-4870-bc41-4990526cf105",
        userId: "55212d7c-d615-46ae-b083-7cbeda77129e",
        issueDate: new Date("2026-03-03"),
        returnDate: null,
        status: "returned",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "d2ebdfcf-feb3-4f18-9bd8-2b80f0ceb830",
        bookId: "617532df-114a-4b1c-843b-c3e34e17c89b",
        userId: "cc15253a-c3a4-4670-a9ae-8c57a98a1714",
        issueDate: new Date("2026-03-05"),
        returnDate: null,
        status: "issued",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "55c627de-2740-4777-837a-9a3acd2d2a3c",
        bookId: "6ee80709-162c-429c-a653-e18b0e8c6526",
        userId: "d06e53ed-97e2-43d8-afff-fb50d2af2914",
        issueDate: new Date("2026-03-06"),
        returnDate: null,
        status: "returned",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "5f84e05e-9670-4aba-8ff0-d262a275a9ff",
        bookId: "a52c57ef-6c6e-45d0-ab4c-0e7b1d8073ed",
        userId: "db164b41-7769-4caf-8b33-fa27d0a462d9",
        issueDate: new Date("2026-03-07"),
        returnDate: null,
        status: "issued",
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

    await queryInterface.bulkDelete("issues", null, {});
  },
};
