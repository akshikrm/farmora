import { sequelize } from '@utils/db'
import { DataTypes } from 'sequelize'

const FarmModel = sequelize.define(
  'farms',
  {
    master_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    place: {
      type: DataTypes.STRING,
    },
    capacity: {
      type: DataTypes.STRING,
    },
    own: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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

export default FarmModel
