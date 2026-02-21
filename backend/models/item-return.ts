import { sequelize } from '@utils/db'
import { DataTypes } from 'sequelize'

const ItemReturnModel = sequelize.define(
  'item_returns',
  {
    return_type: {
      type: DataTypes.ENUM('vendor', 'batch'),
      allowNull: false,
      field: 'return_type',
    },
    item_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'item_category_id',
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'date',
    },
    from_batch: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'from_batch',
    },
    to_batch: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'to_batch',
    },
    to_vendor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'to_vendor',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'quantity',
    },
    rate_per_bag: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'rate_per_bag',
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'total_amount',
    },
    master_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'master_id',
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
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
