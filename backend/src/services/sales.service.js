import { SaleNotFoundError } from '#errors/sale.errors'
import SalesModel from '#models/sales'
import SeasonModel from '#models/season'
import BatchModel from '#models/batch'
import VendorModel from '#models/vendor'
import userRoles from '#utils/user-roles'
import { Op } from 'sequelize'
import logger from '#utils/logger'

const create = async (payload, currentUser) => {
  logger.debug({ payload, currentUser }, 'Creating sale: raw input')

  if (currentUser.user_type === userRoles.staff.type) {
    payload.master_id = currentUser.master_id
  } else {
    payload.master_id = currentUser.id
  }
  logger.debug(
    { resolved_master_id: payload.master_id },
    'Resolved master owner id'
  )

  // Calculate avg_weight and amount
  payload.avg_weight = (payload.weight / payload.bird_no).toFixed(2)
  payload.amount = (payload.price * payload.weight).toFixed(2)

  logger.info({ sale: payload }, 'Creating sale')
  const newSale = await SalesModel.create(payload)
  logger.info({ new_sale_id: newSale.id }, 'Sale created')

  return newSale
}

const getAll = async (payload, currentUser) => {
  const { page, limit, ...filter } = payload
  const offset = (page - 1) * limit

  logger.debug(
    { payload, actor_id: currentUser.id },
    'Fetching sales: raw query payload'
  )

  if (currentUser.user_type === userRoles.staff.type) {
    filter.master_id = currentUser.master_id
  } else if (currentUser.user_type === userRoles.manager.type) {
    filter.master_id = currentUser.id
  }

  if (filter.start_date || filter.end_date) {
    filter.date = {}
    if (filter.start_date) {
      filter.date[Op.gte] = new Date(filter.start_date)
      delete filter.start_date
    }
    if (filter.end_date) {
      filter.date[Op.lte] = new Date(filter.end_date)
      delete filter.end_date
    }
  }

  logger.debug(
    {
      filter,
      page,
      limit,
    },
    'Fetching sales: processed query payload'
  )

  const { count, rows } = await SalesModel.findAndCountAll({
    where: filter,
    limit,
    offset,
    order: [['id', 'DESC']],
    attributes: {
      exclude: ['season_id', 'batch_id', 'buyer_id'],
    },
    include: [
      { model: SeasonModel, as: 'season', required: false },
      { model: BatchModel, as: 'batch', required: false },
      { model: VendorModel, as: 'buyer', required: false },
    ],
  })

  logger.info(
    { actor_id: currentUser.id, page, limit, count, filter },
    'Sales Fetched'
  )

  return {
    page,
    limit,
    total: count,
    data: rows,
  }
}

const getById = async (saleId, currentUser) => {
  const filter = { id: saleId }

  if (currentUser.user_type === userRoles.staff.type) {
    filter.master_id = currentUser.master_id
  } else if (currentUser.user_type === userRoles.manager.type) {
    filter.master_id = currentUser.id
  }

  logger.debug({ filter }, 'Getting sale by id')
  const saleRecord = await SalesModel.findOne({
    where: filter,
    attributes: {
      exclude: ['season_id', 'batch_id', 'buyer_id'],
    },
    include: [
      { model: SeasonModel, as: 'season', required: false },
      { model: BatchModel, as: 'batch', required: false },
      { model: VendorModel, as: 'buyer', required: false },
    ],
  })
  logger.debug({ saleRecord }, 'Sale retrieved')
  if (!saleRecord) {
    throw new SaleNotFoundError(saleId)
  }

  logger.info(
    {
      sale_id: saleRecord.id,
      actor_id: currentUser.id,
    },
    'Sale retrieved by id'
  )

  return saleRecord
}

const updateById = async (id, payload, currentUser) => {
  logger.debug(
    { sale_id: id, updated_data: payload, actor_id: currentUser.id },
    'Updating sale: raw payload'
  )

  const saleRecord = await getById(id, currentUser)

  // Recalculate avg_weight and amount if relevant fields are updated
  if (payload.weight !== undefined || payload.bird_no !== undefined) {
    const weight = payload.weight || saleRecord.weight
    const bird_no = payload.bird_no || saleRecord.bird_no
    payload.avg_weight = (weight / bird_no).toFixed(2)
  }

  if (payload.price !== undefined || payload.weight !== undefined) {
    const price = payload.price || saleRecord.price
    const weight = payload.weight || saleRecord.weight
    payload.amount = (price * weight).toFixed(2)
  }

  logger.info(
    {
      sale_id: id,
      updated_keys: Object.keys(payload),
      actor_id: currentUser.id,
    },
    'Updating sale'
  )
  await saleRecord.update(payload)
  logger.info({ sale_id: saleRecord.id }, 'Sale updated')
}

const deleteById = async (id, currentUser) => {
  logger.debug(
    { sale_id: id, actor_id: currentUser.id },
    'Deleting sale: resolving record'
  )
  const saleRecord = await getById(id, currentUser)
  await saleRecord.destroy()
  logger.info({ sale_id: id, actor_id: currentUser.id }, 'Sale Deleted')
}

const salesService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
}

export default salesService
