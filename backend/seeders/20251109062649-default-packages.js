'use strict'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('packages', [
      {
        name: 'Basic',
        price: 0,
        description: 'Basic package with essential features.',
        duration: 6,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Standard',
        price: 400,
        duration: 1,
        description: 'Standard package with additional features.',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'packages',
      [{ name: 'Basic' }, { name: 'Standard' }],
      {}
    )
  },
}
