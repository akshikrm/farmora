'use strict'

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('batches', 'closed_on', {
      type: Sequelize.DATE,
      allowNull: true,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('batches', 'closed_on')
  },
}
