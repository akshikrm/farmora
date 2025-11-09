'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    return await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn('users', 'user_type', { transaction });

      await queryInterface.addColumn(
        'users',
        'user_type',
        {
          type: Sequelize.ENUM('admin', 'manager', 'staff'),
          defaultValue: 'staff',
          allowNull: false,
        },
        { transaction }
      );

      await queryInterface.removeColumn('users', 'reset_flag', { transaction });
    });
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn('users', 'user_type', { transaction });

      await queryInterface.addColumn(
        'users',
        'user_type',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        { transaction }
      );

      await queryInterface.addColumn(
        'users',
        'reset_flag',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        },
        { transaction }
      );
    });
  }
};
