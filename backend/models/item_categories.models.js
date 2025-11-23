import { sequelize } from '#utils/db'
import { Sequelize } from 'sequelize'

const ItemCategoryModel = sequelize.define(
  'item_categories',
  {
    master_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    name: { type: Sequelize.STRING, allowNull: false },
    status: {
      type: Sequelize.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'active',
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
)

export default ItemCategoryModel
