import { sequelize } from '#utils/db'
import { Sequelize } from 'sequelize'

const PermissionModel = sequelize.define(
  'permissions',
  {
    key: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    paranoid: true,
    timestamps: true,
  }
)

export default PermissionModel

