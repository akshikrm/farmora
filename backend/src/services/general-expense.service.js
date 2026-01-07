import GeneralExpenseModel from '#models/generalexpense'
import SeasonModel from '#models/season'
import userRoles from '#utils/user-roles'
import dayjs from 'dayjs'
import { Op } from 'sequelize'

const create = async (payload, currentUser) => {
  payload.date = dayjs()

  if (currentUser.user_type === userRoles.staff.type) {
    payload.master_id = currentUser.master_id
  } else {
    payload.master_id = currentUser.id
  }

  const record = await GeneralExpenseModel.create(payload)
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

  const generalExpenses = await GeneralExpenseModel.findAll({
    where: whereClause,
    order: [['date', 'DESC']],
    include: [
      { model: SeasonModel, as: 'season', required: false },
    ],
  })

  return generalExpenses
}

const getById = async (id, currentUser) => {
  const whereClause = { id }

  if (currentUser.user_type === userRoles.staff.type) {
    whereClause.master_id = currentUser.master_id
  } else if (currentUser.user_type === userRoles.manager.type) {
    whereClause.master_id = currentUser.id
  }

  const record = await GeneralExpenseModel.findOne({
    where: whereClause,
  })

  if (!record) {
    throw new Error('General expense record not found')
  }

  return record
}

const updateById = async (id, payload, currentUser) => {
  const record = await getById(id, currentUser)
  await record.update(payload)
}

const deleteById = async (id, currentUser) => {
  const record = await getById(id, currentUser)
  await record.destroy()
}

const generalExpenseService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
}

export default generalExpenseService
