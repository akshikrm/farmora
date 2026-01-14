'use strict'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    // Make fields nullable for sales book entries (ledger entries without full sale details)
    await queryInterface.changeColumn('sales', 'season_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })
    await queryInterface.changeColumn('sales', 'batch_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })
    await queryInterface.changeColumn('sales', 'weight', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    })
    await queryInterface.changeColumn('sales', 'bird_no', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })
    await queryInterface.changeColumn('sales', 'avg_weight', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    })
    await queryInterface.changeColumn('sales', 'price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    })
  },

  async down(queryInterface, Sequelize) {
    // Revert to NOT NULL (note: this may fail if there are null values)
    await queryInterface.changeColumn('sales', 'season_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    })
    await queryInterface.changeColumn('sales', 'batch_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    })
    await queryInterface.changeColumn('sales', 'weight', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    })
    await queryInterface.changeColumn('sales', 'bird_no', {
      type: Sequelize.INTEGER,
      allowNull: false,
    })
    await queryInterface.changeColumn('sales', 'avg_weight', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    })
    await queryInterface.changeColumn('sales', 'price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    })
  },
}
