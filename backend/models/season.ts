import { sequelize } from '@utils/db'
import { DataTypes } from 'sequelize'

const SeasonModel = sequelize.define(
  'seasons',
  {
    master_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    from_date: {
      type: DataTypes.DATE,
    },
    to_date: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    underscored: true,
    paranoid: true,
    timestamps: true,
  }
)

export default SeasonModel
