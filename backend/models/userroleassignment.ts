import { sequelize } from '@utils/db'
import { DataTypes } from 'sequelize'

const UserRoleAssignment = sequelize.define(
  'user_role_assignments',
  {
    user_id: {
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

export default UserRoleAssignment
