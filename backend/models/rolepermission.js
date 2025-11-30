import { sequelize } from '#utils/db'
import { Sequelize } from 'sequelize'

const RolePermissionModel = sequelize.define(
  'role_permissions',
  {
    permission_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    role_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
)

export default RolePermissionModel
