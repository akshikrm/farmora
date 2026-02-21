'use strict'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, DataTypes) {
    return await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn('subscriptions', 'status', {
        transaction,
      })
      await queryInterface.renameColumn(
        'subscriptions',
        'start_date',
        'valid_from',
        { transaction }
      )
      await queryInterface.renameColumn(
        'subscriptions',
        'end_date',
        'valid_to',
        { transaction }
      )
    })
  },

  async down(queryInterface, DataTypes) {
    return await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addColumn(
        'subscriptions',
        'status',
        {
          type: DataTypes.ENUM('active', 'expired', 'cancelled'),
          defaultValue: 'active',
        },
        { transaction }
      )
      await queryInterface.renameColumn(
        'subscriptions',
        'valid_from',
        'start_date',
        { transaction }
      )
      await queryInterface.renameColumn(
        'subscriptions',
        'valid_to',
        'end_date',
        { transaction }
      )
    })
  },
}
