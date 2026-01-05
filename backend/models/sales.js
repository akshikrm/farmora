import { sequelize } from '#utils/db'
import { Sequelize } from 'sequelize'

const SalesModel = sequelize.define(
  'sales',
  {
    master_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    season_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    batch_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    buyer_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    vehicle_no: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    weight: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    bird_no: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    avg_weight: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    payment_type: {
      type: Sequelize.ENUM('credit', 'cash'),
      defaultValue: 'cash',
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    amount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    narration: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    status: {
      type: Sequelize.ENUM('active', 'inactive'),
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
