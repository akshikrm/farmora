'use strict'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, DataTypes) {
    return await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.sequelize.query(
        "UPDATE packages SET description = '' WHERE description IS NULL",
        { transaction }
      )

      await queryInterface.changeColumn(
        'packages',
        'description',
        {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        { transaction }
      )

      await queryInterface.removeColumn('packages', 'status', { transaction })

      await queryInterface.addColumn(
        'packages',
        'status',
        {
          type: DataTypes.ENUM('active', 'inactive'),
          defaultValue: 'active',
        },
        { transaction }
      )
    })
  },

  async down(queryInterface, DataTypes) {
    return await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn('packages', 'status', { transaction })

      await queryInterface.addColumn(
        'packages',
        'status',
        {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        { transaction }
      )

      await queryInterface.changeColumn(
        'packages',
        'description',
        {
          type: DataTypes.TEXT,
        },
        { transaction }
      )
    })
  },
}
