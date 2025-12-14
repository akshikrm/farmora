import { SeasonNotFoundError } from '#errors/season.errors'
import SeasonModel from '#models/season'
import userRoles from '#utils/user-roles'
import dayjs from 'dayjs'
import { Op } from 'sequelize'

const create = async (payload, currentUser) => {
  const startDate = dayjs(payload.startDate).toDate()
  const endDate = dayjs(payload.endDate).toDate()
  payload.start_date = startDate
  payload.end_date = endDate
  payload.master_id = currentUser.id
  payload.status = 'active'

  const newSeason = await SeasonModel.create(payload)
  return newSeason
}

const getNames = async (currentUser) => {
  const filter = {}
  if (currentUser.user_type === userRoles.manager.type) {
    filter.master_id = currentUser.id
  }

  const records = await SeasonModel.findAll({
    where: filter,
    attributes: ['id', 'name'],
    limit: 50,
  })
  return records
}

const getAll = async (payload = {}, currentUser) => {
  const { page, limit, ...filter } = payload
  const offset = (page - 1) * limit

  if (filter.name) {
    filter.name = { [Op.iLike]: `%${filter.name}%` }
  }

  if (currentUser.user_type === userRoles.manager.type) {
    filter.master_id = currentUser.id
  }

  const { count, rows } = await SeasonModel.findAndCountAll({
    where: filter,
    limit,
    offset,
    order: [['id', 'DESC']],
  })

  return {
    page,
    limit,
    total: count,
    data: rows,
  }
}

const getById = async (seasonId, currentUser) => {
  const filter = { id: seasonId }
  if (currentUser.user_type === userRoles.manager.type) {
    filter.master_id = currentUser.id
  }

  const seasonRecord = await SeasonModel.findOne({ where: filter })
  if (!seasonRecord) {
    throw new SeasonNotFoundError(seasonId)
  }
  return seasonRecord
}

const updateById = async (seasonId, payload, currentUser) => {
  const seasonRecord = await getById(seasonId, currentUser)
  await seasonRecord.update(payload)
}

const deleteById = async (packageID, currentUser) => {
  const seasonRecord = await getById(packageID, currentUser)
  await seasonRecord.destroy()
}

const seasonService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  getNames,
}

export default seasonService
