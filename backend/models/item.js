import { sequelize } from '#utils/db'
import { Sequelize } from 'sequelize'
import ItemCategoryModel from '#models/item_categories.models'
import VendorModel from '#models/vendor'
import ItemBatchAssignmentModel from '#models/itembatchassignment'

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
    status: {
      type: Sequelize.ENUM('active', 'active'),
      defaultValue: 'active',
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
)

ItemModel.belongsTo(ItemCategoryModel, {
  foreignKey: 'category_id',
  as: 'category',
  targetKey: 'id',
})

ItemModel.belongsTo(VendorModel, {
  foreignKey: 'vendor_id',
  as: 'vendor',
  targetKey: 'id',
})

ItemModel.hasMany(ItemBatchAssignmentModel, {
  foreignKey: 'item_id',
  as: 'assignments',
})

export default ItemModel
