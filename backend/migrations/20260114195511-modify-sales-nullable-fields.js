'use strict'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, DataTypes) {
    // Make fields nullable for sales book entries (ledger entries without full sale details)
    await queryInterface.changeColumn('sales', 'season_id', {
      type: DataTypes.INTEGER,
      allowNull: true,
    })
    await queryInterface.changeColumn('sales', 'batch_id', {
      type: DataTypes.INTEGER,
      allowNull: true,
    })
    await queryInterface.changeColumn('sales', 'weight', {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    })
    await queryInterface.changeColumn('sales', 'bird_no', {
      type: DataTypes.INTEGER,
      allowNull: true,
    })
    await queryInterface.changeColumn('sales', 'avg_weight', {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    })
    await queryInterface.changeColumn('sales', 'price', {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    })
  },

  async down(queryInterface, DataTypes) {
    // Delete sales book entries (where season_id or batch_id is null) before reverting
    await queryInterface.sequelize.query(`
      DELETE FROM sales WHERE season_id IS NULL OR batch_id IS NULL;
    `)

    // Revert to NOT NULL (note: this may fail if there are null values)
    await queryInterface.changeColumn('sales', 'season_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
    })
    await queryInterface.changeColumn('sales', 'batch_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
    })
    await queryInterface.changeColumn('sales', 'weight', {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    })
    await queryInterface.changeColumn('sales', 'bird_no', {
      type: DataTypes.INTEGER,
      allowNull: false,
    })
    await queryInterface.changeColumn('sales', 'avg_weight', {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    })
    await queryInterface.changeColumn('sales', 'price', {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    })
  },
}
