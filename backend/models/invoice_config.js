import { sequelize } from '@utils/db'
import { Sequelize } from 'sequelize'

const InvoiceConfig = sequelize.define(
  'invoice_config',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    number: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    parent_id: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      field: 'parent_id',
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
)

export default InvoiceConfig

