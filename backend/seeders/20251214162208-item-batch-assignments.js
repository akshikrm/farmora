/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const assignments = [
      {
        item_id: 1,
        batch_id: 1,
        quantity: 100,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_id: 2,
        batch_id: 1,
        quantity: 50,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_id: 3,
        batch_id: 2,
        quantity: 20,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        item_id: 4,
        batch_id: 4,
        quantity: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]

    await queryInterface.bulkInsert('item_batch_assignments', assignments)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('item_batch_assignments', {
      item_id: [1, 2, 3, 4]
    }, {})
  },
}
