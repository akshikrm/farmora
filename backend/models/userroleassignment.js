import { sequelize } from '#utils/db'
import { Sequelize } from 'sequelize'
import RoleModel from '#models/role'

const UserRoleAssignment = sequelize.define(
  'user_role_assignments',
  {
    user_id: {
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

UserRoleAssignment.belongsTo(RoleModel, { foreignKey: 'role_id', as: 'role' })

RoleModel.hasMany(UserRoleAssignment, {
  foreignKey: 'role_id',
  as: 'assigned_users',
})

export default UserRoleAssignment

