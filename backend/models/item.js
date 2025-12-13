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
    category_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    price_per_unit: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    discount_price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: null,
    },
    vendor_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    batch_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    status: {
      type: Sequelize.ENUM('inactive', 'active'),
      defaultValue: 'active',
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
)

export default ItemModel
