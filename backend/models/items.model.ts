import { sequelize } from '@utils/db'
import { DataTypes } from 'sequelize'

const ItemModel = sequelize.define(
  'items',
  {
    master_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    vendor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'vendor_id',
    },
    base_price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      field: 'base_price',
    },

    type: {
      type: DataTypes.ENUM('integration', 'working', 'regular'),
      defaultValue: 'regular',
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'active',
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
)

export default ItemModel
