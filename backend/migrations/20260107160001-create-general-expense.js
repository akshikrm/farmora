'use strict'
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, DataTypes) {
    await queryInterface.sequelize.query(`
		          DO $$ BEGIN
			          CREATE TYPE enum_general_expenses_status AS ENUM ('active', 'inactive');
				        EXCEPTION
		        WHEN duplicate_object THEN null;
		      END $$;
		    `)

    await queryInterface.createTable('general_expenses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      season_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      master_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      purpose: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      narration: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active',
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    })
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('general_expenses')
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_general_expenses_status";'
    )
  },
}
