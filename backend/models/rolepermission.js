import { sequelize } from '#utils/db'
import { Sequelize } from 'sequelize'
import RoleModel from '#models/role'
import PermissionModel from '#models/permission'

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

RolePermissionModel.belongsTo(RoleModel, { foreignKey: 'role_id', as: 'role' })
RolePermissionModel.belongsTo(PermissionModel, {
  foreignKey: 'permission_id',
  as: 'permission',
})

RoleModel.hasMany(RolePermissionModel, {
  foreignKey: 'role_id',
  as: 'role_permissions',
})

export default RolePermissionModel
