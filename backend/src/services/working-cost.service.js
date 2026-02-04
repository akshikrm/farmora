import WorkingCostModel from '#models/workingcost'
import userRoles from '#utils/user-roles'
import dayjs from 'dayjs'
import { Op } from 'sequelize'

const create = async (payload, currentUser) => {
  if (currentUser.user_type === userRoles.staff.type) {
    payload.master_id = currentUser.master_id
  } else {
    payload.master_id = currentUser.id
  }

  const record = await WorkingCostModel.create(payload)
  return record
}

const getAll = async (filter, currentUser) => {
  const { season_id, start_date, end_date } = filter
  const whereClause = {}

  if (season_id) {
    whereClause.season_id = season_id
  }

  if (start_date && end_date) {
    whereClause.date = {
      [Op.between]: [dayjs(start_date).toDate(), dayjs(end_date).toDate()],
    }
  } else if (start_date) {
    whereClause.date = { [Op.gte]: dayjs(start_date).toDate() }
  } else if (end_date) {
    whereClause.date = { [Op.lte]: dayjs(end_date).toDate() }
  }

  if (currentUser.user_type === userRoles.staff.type) {
    whereClause.master_id = currentUser.master_id
  } else if (currentUser.user_type === userRoles.manager.type) {
    whereClause.master_id = currentUser.id
  }

  const workingCostRecords = await WorkingCostModel.findAll({
    where: whereClause,
  })

  const income = workingCostRecords.filter(
    (record) => record.payment_type === 'income'
  )
  const expense = workingCostRecords.filter(
    (record) => record.payment_type === 'expense'
  )

  return { income, expense }
}

const workingCostService = {
  create,
  getAll,
}

export default workingCostService
