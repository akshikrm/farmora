/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('farms', [
      {
        master_id: 2,
        name: 'Green Valley Farm',
        place: 'California',
        capacity: '500 acres',
        own: true,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        master_id: 3,
        name: 'Sunnybrook Farm',
        place: 'Texas',
        capacity: '300 acres',
        own: true,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'farms',
      [{ name: 'Green Valley Farm' }, { name: 'Sunnybrook Farm' }],
      {}
    )
  },
}
