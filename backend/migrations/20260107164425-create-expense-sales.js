/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
		          DO $$ BEGIN
			          CREATE TYPE enum_expense_sales_status AS ENUM ('active', 'inactive');
				        EXCEPTION
		        WHEN duplicate_object THEN null;
		      END $$;
		    `)

    await queryInterface.createTable('expense_sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      season_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      master_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      purpose: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      narration: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active',
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('expense_sales')
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_expense_sales_status";'
    )
  },
}
