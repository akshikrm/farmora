import { sequelize } from '@utils/db'
import { Sequelize } from 'sequelize'

const WorkingCostModel = sequelize.define(
  'working_costs',
  {
    season_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    master_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    purpose: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    amount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM('inactive', 'active'),
      defaultValue: 'active',
      allowNull: false,
    },
    payment_type: {
      type: Sequelize.ENUM('income', 'expense'),
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
)

export default WorkingCostModel
