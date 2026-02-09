'use strict'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('items', 'vendor_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('items', 'vendor_id')
  },
}
