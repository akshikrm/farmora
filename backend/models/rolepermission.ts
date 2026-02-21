import { sequelize } from '@utils/db'
import { DataTypes } from 'sequelize'

const RolePermissionModel = sequelize.define(
  'role_permissions',
  {
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
)

export default RolePermissionModel
