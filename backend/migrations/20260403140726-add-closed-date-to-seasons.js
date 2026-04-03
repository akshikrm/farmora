'use strict'

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('seasons', 'closed_on', {
      type: Sequelize.DATE,
      allowNull: true,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('seasons', 'closed_on')
  },
}
