'use strict'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const managerId = 2
    const dateNow = new Date()
    const roles = [
      {
        manager_id: managerId,
        name: 'Season All Access',
        description: 'Can create, read, update, and delete seasons',
        created_at: dateNow,
        updated_at: dateNow,
      },
      {
        manager_id: managerId,
        name: 'Season Read Only',
        description: 'Can only read season data',
        created_at: dateNow,
        updated_at: dateNow,
      },
    ]

    await queryInterface.bulkInsert('roles', roles)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', { manager_id: 2 }, {})
  },
}
