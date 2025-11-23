import { sequelize } from '#utils/db'
import { Sequelize } from 'sequelize'

const ItemModel = sequelize.define(
  'items',
  {
    master_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM('active', 'active'),
      defaultValue: 'active',
    },
  },
  {
    underscored: true,
    paranoid: true,
    timestamps: true,
  }
)

export default ItemModel
