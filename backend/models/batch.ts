import { sequelize } from '@utils/db'
import { DataTypes } from 'sequelize'

const BatchModel = sequelize.define(
  'batches',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    master_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    season_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    farm_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
)

export default BatchModel
