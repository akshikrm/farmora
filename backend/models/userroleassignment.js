import { sequelize } from '#utils/db'
import { Sequelize } from 'sequelize'

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
    timestamps: true,
  }
)

export default UserRoleAssignment
