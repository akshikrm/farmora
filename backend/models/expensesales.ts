import { sequelize } from '@utils/db'
import { DataTypes } from 'sequelize'

const ExpenseSalesModel = sequelize.define(
  'expense_sales',
  {
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
      type: DataTypes.ENUM('inactive', 'active'),
      defaultValue: 'active',
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
)

export default ExpenseSalesModel
