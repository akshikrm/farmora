import { sequelize } from '#utils/db'
import { Sequelize } from 'sequelize'

const RoleModel = sequelize.define(
  'roles',
  {
    manager_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    name: {
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
    timestamps: true,
  }
)

export default RoleModel
