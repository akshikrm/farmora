import { Op } from 'sequelize'
import BatchModel from '@models/batch'
import { BatchNotFoundError } from '@errors/batch.errors'
import userRoles from '@utils/user-roles'
import UserModel from '@models/user'
import FarmModel from '@models/farm'
import SeasonModel from '@models/season'

const create = async (payload, currentUser) => {
  payload.name = payload.name.trim()
  payload.status = 'active'
  payload.master_id = currentUser.id
  const newBatch = await BatchModel.create(payload)
  return newBatch
}

const getNames = async (currentUser) => {
  const filter = {}
  if (currentUser.user_type === userRoles.manager.type) {
    filter.master_id = currentUser.id
  }

  const records = await BatchModel.findAll({
    where: filter,
    attributes: ['id', 'name'],
    limit: 50,
  })
  return records
}
const getNamesBySeasonId = async (seasonId, currentUser) => {
  const filter = {
    season_id: seasonId,
  }

  if (currentUser.user_type === userRoles.manager.type) {
    filter.master_id = currentUser.id
  }

  const records = await BatchModel.findAll({
    where: filter,
    attributes: ['id', 'name'],
    limit: 50,
  })
  return records
}

const getAll = async (payload, currentUser) => {
  const { page, limit, ...filter } = payload
  const offset = (page - 1) * limit

  if (filter.name) {
    filter.name = { [Op.iLike]: `%${filter.name}%` }
  }
  if (currentUser.user_type === userRoles.manager.type) {
    filter.master_id = currentUser.id
  }
  try {
    console.log('Filter in getAll:', filter)
    const { count, rows } = await BatchModel.findAndCountAll({
      where: filter,
      limit,
      offset,
      order: [['id', 'DESC']],
      include: [
        { model: UserModel, as: 'master', attributes: ['id', 'name'] },
        { model: FarmModel, as: 'farm', attributes: ['id', 'name'] },
        { model: SeasonModel, as: 'season', attributes: ['id', 'name'] },
      ],
    })

    return {
      page,
      limit,
      total: count,
      data: rows,
    }
  } catch (error) {
    console.error('Error in getAll:', error)
    throw error
  }
}

const getById = async (batchId, currentUser) => {
  const filter = { id: batchId }
  if (currentUser.user_type === userRoles.manager.type) {
    filter.master_id = currentUser.id
  }

  const batchRecord = await BatchModel.findOne({ where: filter })
  if (!batchRecord) {
    throw new BatchNotFoundError(batchId)
  }
  return batchRecord
}

const updateById = async (batchId, payload, currentUser) => {
  const batchRecord = await getById(batchId, currentUser)
  await batchRecord.update(payload)
}

const deleteById = async (batchId, currentUser) => {
  const batchRecord = await getById(batchId, currentUser)
  await batchRecord.destroy()
}

const batchService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  getNames,
  getNamesBySeasonId,
}

export default batchService
