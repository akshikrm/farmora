import { sequelize } from '#utils/db'
import { Sequelize } from 'sequelize'
import RoleModel from './role'
import PermissionModel from './permission'

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
    paranoid: true,
    timestamps: true,
  }
)

RolePermissionModel.belongsTo(RoleModel, { foreignKey: 'role_id', as: 'role' })
RolePermissionModel.belongsTo(PermissionModel, {
  foreignKey: 'permission_id',
  as: 'permission',
})

export default RolePermissionModel

