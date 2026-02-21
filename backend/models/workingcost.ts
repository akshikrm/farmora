import { sequelize } from '@utils/db'
import { DataTypes } from 'sequelize'

const WorkingCostModel = sequelize.define(
  'working_costs',
  {
    season_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    master_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    purpose: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('inactive', 'active'),
      defaultValue: 'active',
      allowNull: false,
    },
    payment_type: {
      type: DataTypes.ENUM('income', 'expense'),
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
)

export default WorkingCostModel
