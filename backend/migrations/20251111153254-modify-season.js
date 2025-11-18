'use strict'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    return await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn('seasons', 'from_date', { transaction })
      await queryInterface.removeColumn('seasons', 'to_date', { transaction })
      await queryInterface.removeColumn('seasons', 'status', { transaction })

      await queryInterface.addColumn(
        'seasons',
        'from_date',
        {
          type: Sequelize.DATE,
          allowNull: false,
        },
        { transaction }
      )

      await queryInterface.addColumn(
        'seasons',
        'to_date',
        {
          type: Sequelize.DATE,
          allowNull: false,
        },
        { transaction }
      )

      await queryInterface.addColumn(
        'seasons',
        'status',
        {
          type: Sequelize.ENUM('active', 'inactive'),
          allowNull: false,
          defaultValue: 'active',
        },
        { transaction }
      )
    })
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn('seasons', 'from_date', { transaction })
      await queryInterface.removeColumn('seasons', 'to_date', { transaction })
      await queryInterface.removeColumn('seasons', 'status', { transaction })

      await queryInterface.addColumn(
        'seasons',
        'from_date',
        {
          type: Sequelize.DATEONLY,
          allowNull: true,
        },
        { transaction }
      )

      await queryInterface.addColumn(
        'seasons',
        'to_date',
        {
          type: Sequelize.DATEONLY,
          allowNull: true,
        },
        { transaction }
      )

      await queryInterface.addColumn(
        'seasons',
        'status',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1,
        },
        { transaction }
      )
    })
  },
}
