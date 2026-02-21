'use strict'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, DataTypes) {
    return await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn('users', 'user_type', { transaction })

      await queryInterface.addColumn(
        'users',
        'user_type',
        {
          type: DataTypes.ENUM('admin', 'manager', 'staff'),
          defaultValue: 'staff',
          allowNull: false,
        },
        { transaction }
      )

      await queryInterface.removeColumn('users', 'reset_flag', { transaction })
    })
  },

  async down(queryInterface, DataTypes) {
    return await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn('users', 'user_type', { transaction })

      await queryInterface.addColumn(
        'users',
        'user_type',
        {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        { transaction }
      )

      await queryInterface.addColumn(
        'users',
        'reset_flag',
        {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        },
        { transaction }
      )
    })
  },
}
