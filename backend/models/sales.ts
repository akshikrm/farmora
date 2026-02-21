import { sequelize } from '@utils/db'
import { DataTypes } from 'sequelize'

const SalesModel = sequelize.define(
  'sales',
  {
    master_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    season_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    batch_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    buyer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vehicle_no: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    weight: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    bird_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    avg_weight: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    payment_type: {
      type: DataTypes.ENUM('credit', 'cash'),
      defaultValue: 'cash',
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    narration: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
    },
  },
  {
    underscored: true,
    paranoid: true,
    timestamps: true,
  }
)

export default SalesModel
