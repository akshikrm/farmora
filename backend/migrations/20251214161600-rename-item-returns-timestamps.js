'use strict'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, DataTypes) {
    return await queryInterface.sequelize.transaction(async (transaction) => {
      const table = 'purchase_returns'

      try {
        const columns = await queryInterface.describeTable(table, {
          transaction,
        })

        if (columns.createdAt && !columns.created_at) {
          await queryInterface.renameColumn(table, 'createdAt', 'created_at', {
            transaction,
          })
          console.log('Renamed createdAt to created_at in purchase_returns')
        }

        if (columns.updatedAt && !columns.updated_at) {
          await queryInterface.renameColumn(table, 'updatedAt', 'updated_at', {
            transaction,
          })
          console.log('Renamed updatedAt to updated_at in purchase_returns')
        }

        if (columns.deletedAt && !columns.deleted_at) {
          await queryInterface.renameColumn(table, 'deletedAt', 'deleted_at', {
            transaction,
          })
          console.log('Renamed deletedAt to deleted_at in purchase_returns')
        }
      } catch (error) {
        console.error('Error renaming columns:', error.message)
        throw error
      }
    })
  },

  async down(queryInterface, DataTypes) {
    return await queryInterface.sequelize.transaction(async (transaction) => {
      const table = 'purchase_returns'

      try {
        const columns = await queryInterface.describeTable(table, {
          transaction,
        })

        if (columns.created_at && !columns.createdAt) {
          await queryInterface.renameColumn(table, 'created_at', 'createdAt', {
            transaction,
          })
        }

        if (columns.updated_at && !columns.updatedAt) {
          await queryInterface.renameColumn(table, 'updated_at', 'updatedAt', {
            transaction,
          })
        }

        if (columns.deleted_at && !columns.deletedAt) {
          await queryInterface.renameColumn(table, 'deleted_at', 'deletedAt', {
            transaction,
          })
        }
      } catch (error) {
        console.error('Error reverting column names:', error.message)
        // Don't throw, table might not exist during undo
      }
    })
  },
}
