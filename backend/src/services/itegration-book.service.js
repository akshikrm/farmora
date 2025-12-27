import IntegrationBookModel from '#models/integationbook'
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

  const record = await IntegrationBookModel.create(payload)
  return record
}

const getAll = async (filter, currentUser) => {
  const { farm_id, start_date, end_date } = filter
  const whereClause = {
    farm_id,
  }

  if (start_date) {
    whereClause.createdAt = { [Op.gte]: dayjs(start_date) }
  }
  if (end_date) {
    whereClause.createdAt = { [Op.lte]: dayjs(end_date) }
  }

  if (currentUser.user_type === userRoles.staff.type) {
    whereClause.master_id = currentUser.master_id
  } else if (currentUser.user_type === userRoles.manager.type) {
    whereClause.master_id = currentUser.id
  }
  const integrationBookRecords = await IntegrationBookModel.findAll(whereClause)
  if (integrationBookRecords.total === 0) {
    return { credit_items: [], paid_items: [] }
  }

  const creditItems = integrationBookRecords.filter(
    (item) => item.payment_type === 'credit'
  )
  const paidItems = integrationBookRecords.filter(
    (item) => item.payment_type === 'paid'
  )

  return { credit_items: creditItems, paid_items: paidItems }
}

const integrationService = {
  create,
  getAll,
}

export default integrationService
