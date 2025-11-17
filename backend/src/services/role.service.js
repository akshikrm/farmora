import RoleModel from '#models/role'
import { PermissionDeniedError } from '#errors/auth.errors'
import { sequelize } from '#utils/db'
import { Op } from 'sequelize'
import { RoleNotFoundError } from '#errors/role.errors'
import RolePermissionModel from '#models/rolepermission'

const createRoleService = async (payload, currentUser) => {
  if (currentUser.user_type === currentUser.staff.type) {
    throw new PermissionDeniedError('Only managers and admins can create roles')
  }

  const transaction = await sequelize.transaction()
  try {
    const newRole = await RoleModel.create(
      {
        manager_id: payload.manager_id,
        name: payload.name,
        description: payload.description,
      },
      {
        underscored: true,
        paranoid: true,
        timestamps: true,
        transaction,
      }
    )

    const permissionIds = payload.permission_ids || []

    await RolePermissionModel.bulkCreate(
      permissionIds.map((permissionId) => ({
        role_id: newRole.id,
        permission_id: permissionId,
      })),
      { transaction }
    )

    await transaction.commit()
    return newRole
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

const getAllRolesService = async (payload, currentUser) => {
  const { limit, page, ...filter } = payload
  const offset = (page - 1) * limit

  if (currentUser.user_type === currentUser.manager.type) {
    filter.manager_id = currentUser.id
  }

  if (filter.name) {
    filter.name = { [Op.iLike]: `%${filter.name}%` }
  }

  const { count, rows } = await RoleModel.findAndCountAll({
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

const getRoleByIdService = async (roleId, currentUser) => {
  const { user_type, id } = currentUser || {}
  const filter = { id: roleId }

  if (user_type === currentUser.manager.type) {
    filter.manager_id = id
  }

  const roleRecord = await RoleModel.findOne({
    where: filter,
  })
  if (!roleRecord) {
    throw new RoleNotFoundError(roleId)
  }
  return null
}

const updateRoleByIdService = async (roleId, payload, currentUser) => {
  const roleRecord = await getRoleByIdService(roleId, currentUser)
  await roleRecord.update(payload)
  return null
}

const deleteRoleByIdService = async (roleId, currentUser) => {
  const roleRecord = await getRoleByIdService(roleId, currentUser)
  await roleRecord.destroy()
}

const roleService = {
  createRoleService,
  getAllRolesService,
  getRoleByIdService,
  updateRoleByIdService,
  deleteRoleByIdService,
}

export default roleService
