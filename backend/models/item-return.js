import { sequelize } from '#utils/db'
import { Sequelize } from 'sequelize'

const ItemReturnModel = sequelize.define(
  'item_returns',
  {
    return_type: {
      type: Sequelize.ENUM('vendor', 'batch'),
      allowNull: false,
      field: 'return_type',
    },
    item_category_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'item_category_id',
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
      field: 'date',
    },
    from_batch: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'from_batch',
    },
    to_batch: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'to_batch',
    },
    to_vendor: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'to_vendor',
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'quantity',
    },
    rate_per_bag: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      field: 'rate_per_bag',
    },
    total_amount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      field: 'total_amount',
    },
    master_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'master_id',
    },
    status: {
      type: Sequelize.ENUM('pending', 'completed', 'cancelled'),
      defaultValue: 'completed',
      field: 'status',
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
)

export default ItemReturnModel
