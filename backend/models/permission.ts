import { sequelize } from '@utils/db'
import { DataTypes } from 'sequelize'

const PermissionModel = sequelize.define(
  'permissions',
  {
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
)

export default PermissionModel
