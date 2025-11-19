import { sequelize } from '#utils/db'
import { Sequelize } from 'sequelize'

const BatchModel = sequelize.define(
  'batches',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    master_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    season_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    farm_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM('active', 'inactive'),
      defaultValue: 'active',
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
)

export default BatchModel
