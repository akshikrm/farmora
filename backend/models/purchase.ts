import { sequelize } from '@utils/db'
import { DataTypes } from 'sequelize'

const PurchaseModel = sequelize.define(
  'purchases',
  {
    master_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    net_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    invoice_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    invoice_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    price_per_unit: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    discount_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: null,
    },
    vendor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    season_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    batch_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('inactive', 'active'),
      defaultValue: 'active',
      allowNull: false,
    },
    payment_type: {
      type: DataTypes.ENUM('credit', 'paid'),
      defaultValue: 'credit',
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
)

export default PurchaseModel
