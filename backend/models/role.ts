import { sequelize } from '@utils/db'
import { DataTypes } from 'sequelize'

const RoleModel = sequelize.define(
  'roles',
  {
    manager_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
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

export default RoleModel
