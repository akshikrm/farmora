import { UserNameConflictError, UserNotFoundError } from '@errors/user.errors'
import SubscriptionModel from '@models/subscription'
import User from '@models/user'
// import { sendMail } from "./mailService.js";
import { sequelize } from '@utils/db'
import { Op } from 'sequelize'
// import subscriptionService from "#services/subscription.service";
import userRoles from '@utils/user-roles'
import { PermissionDeniedError } from '@errors/auth.errors'
import UserRoleAssignment from '@models/userroleassignment'

const createStaff = async (payload, currentUser) => {
  if (currentUser.user_type === userRoles.staff.type) {
    throw new PermissionDeniedError('Unauthorized to create staff user')
  }

  const existsingUser = await getUserByUsername(payload.username)

  if (existsingUser) {
    throw new UserNameConflictError('username already taken')
  }

  const transaction = await sequelize.transaction()
  try {
    const newUser = await User.create(
      {
        name: payload.name,
        username: payload.username,
        password: payload.password,
        user_type: userRoles.staff.type,
        status: payload.status,
        parent_id: currentUser.id,
      },
      { transaction }
    )

    const newRoles = await UserRoleAssignment.bulkCreate(
      payload.role_ids.map((roleId) => ({
        user_id: newUser.id,
        role_id: roleId,
      })),
      { transaction }
    )

    console.log('Assigned Roles:', newRoles)
    // await subscriptionService.create(newUser.id, payload.package_id, transaction);

    // sendMail(
    // 	insertData.username,
    // 	"Your Account Details",
    // 	"accountCreated",
    // 	{
    // 		username: insertData.username,
    // 		password: hashedPassword,
    // 	}
    // );

    await transaction.commit()
    delete newUser.dataValues.password
    return newUser
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

const getById = async (userId: number, currentUser) => {
  const { user_type, id } = currentUser || {}
  const filter: { id: number; parent_id?: number } = { id: userId }

  if (user_type === userRoles.manager.type) {
    filter.parent_id = id
  }

  const userRecord = await User.findOne({
    where: filter,
    attributes: {
      exclude: ['password'],
    },
  })

  if (!userRecord) {
    throw new UserNotFoundError(userId)
  }
  return userRecord
}

const getUserByUsername = async (username) => {
  const userRecord = await User.findOne({
    where: { username },
  })
  return userRecord
}

const update = async (userId, payload, currentUser) => {
  const userRecord = await userService.getById(userId, currentUser)
  await userRecord.update(payload)
}

const deleteById = async (userId, currentUser) => {
  const userRecord = await userService.getById(userId, currentUser)
  await userRecord.destroy()
}

const getAll = async (payload = {}, currentUser) => {
  const { limit, page, ...filter } = payload
  const offset = (page - 1) * limit

  if (currentUser.user_type === userRoles.manager.type) {
    filter.parent_id = currentUser.id
  }

  if (filter.name) {
    filter.name = { [Op.iLike]: `%${filter.name}%` }
  }

  const { count, rows } = await User.findAndCountAll({
    include: {
      model: SubscriptionModel,
      as: 'subscriptions',
    },
    where: filter,
    limit,
    offset,
    order: [['id', 'DESC']],
    attributes: {
      exclude: ['password'],
    },
  })

  return {
    page,
    limit,
    total: count,
    data: rows,
  }
}

const userService = {
  createStaff,
  getAll,
  getById,
  update,
  getUserByUsername: getUserByUsername,
  delete: deleteById,
}

export default userService
