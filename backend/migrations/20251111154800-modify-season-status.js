'use strict'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, DataTypes) {
    return await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn('seasons', 'status', { transaction })

      await queryInterface.addColumn(
        'seasons',
        'status',
        {
          type: DataTypes.ENUM('active', 'inactive'),
          allowNull: false,
          defaultValue: 'active',
        },
        { transaction }
      )
    })
  },

  async down(queryInterface, DataTypes) {
    return await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn('seasons', 'status', { transaction })
      await queryInterface.addColumn(
        'seasons',
        'status',
        {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1,
        },
        { transaction }
      )
    })
  },
}
