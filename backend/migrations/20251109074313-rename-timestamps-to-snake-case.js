'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    return await queryInterface.sequelize.transaction(async (transaction) => {
      // Get all table names
      const tables = [
        'users',
        'subscriptions',
        'packages',
        'payments',
        'batchs',
        'transactionlogs',
        'vendors',
        'seasons',
        'items',
        'farms',
        'expenses'
      ];

      for (const table of tables) {
        try {
          // Check if table exists
          const columns = await queryInterface.describeTable(table, { transaction });
          
          // Rename createdAt to created_at
          if (columns.createdAt && !columns.created_at) {
            await queryInterface.renameColumn(table, 'createdAt', 'created_at', { transaction });
            console.log(`Renamed createdAt to created_at in ${table}`);
          }
          
          // Rename updatedAt to updated_at
          if (columns.updatedAt && !columns.updated_at) {
            await queryInterface.renameColumn(table, 'updatedAt', 'updated_at', { transaction });
            console.log(`Renamed updatedAt to updated_at in ${table}`);
          }
          
          // Rename deletedAt to deleted_at (for paranoid tables)
          if (columns.deletedAt && !columns.deleted_at) {
            await queryInterface.renameColumn(table, 'deletedAt', 'deleted_at', { transaction });
            console.log(`Renamed deletedAt to deleted_at in ${table}`);
          }
        } catch (error) {
          // Table might not exist yet, skip silently
          if (!error.message.includes('Unknown table')) {
            console.log(`Table ${table} - ${error.message}`);
          }
        }
      }
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.sequelize.transaction(async (transaction) => {
      const tables = [
        'users',
        'subscriptions',
        'packages',
        'payments',
        'batchs',
        'transactionlogs',
        'vendors',
        'seasons',
        'items',
        'farms',
        'expenses'
      ];

      for (const table of tables) {
        try {
          const columns = await queryInterface.describeTable(table, { transaction });
          
          // Rename back to camelCase
          if (columns.created_at && !columns.createdAt) {
            await queryInterface.renameColumn(table, 'created_at', 'createdAt', { transaction });
          }
          
          if (columns.updated_at && !columns.updatedAt) {
            await queryInterface.renameColumn(table, 'updated_at', 'updatedAt', { transaction });
          }
          
          if (columns.deleted_at && !columns.deletedAt) {
            await queryInterface.renameColumn(table, 'deleted_at', 'deletedAt', { transaction });
          }
        } catch (error) {
          if (!error.message.includes('Unknown table')) {
            console.log(`Table ${table} - ${error.message}`);
          }
        }
      }
    });
  }
};
