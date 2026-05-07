'use strict'

export default {
  async up(queryInterface, Sequelize) {
    // 1. Add column as nullable first
    await queryInterface.addColumn('purchases', 'farm_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })

    // 2. Populate farm_id from batches table
    await queryInterface.sequelize.query(`
      UPDATE purchases p
      SET farm_id = b.farm_id
      FROM batches b
      WHERE p.batch_id = b.id
    `)

    // 3. Make column NOT NULL
    await queryInterface.changeColumn('purchases', 'farm_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    })
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('purchases', 'farm_id')
  },
}
