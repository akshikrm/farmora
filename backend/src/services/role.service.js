import RoleModel from '#models/role'
import { PermissionDeniedError } from '#errors/auth.errors'
import { sequelize } from '#utils/db'
import { Op } from 'sequelize'
import { RoleNotFoundError } from '#errors/role.errors'
import RolePermissionModel from '#models/rolepermission'
import userRoles from '#utils/user-roles'
import PermissionModel from '#models/permission'

const createRoleService = async (payload, currentUser) => {
  console.log('Creating role with payload:', payload, 'for user:', currentUser)
  if (currentUser.user_type === userRoles.staff.type) {
    throw new PermissionDeniedError('Only managers and admins can create roles')
  }

  const transaction = await sequelize.transaction()
  try {
    const newRole = await RoleModel.create(
      {
        manager_id: currentUser.id,
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
    console.log('Error creating role:', error)
    throw error
  }
}

const getAllRolesService = async (payload, currentUser) => {
  const { limit, page, ...filter } = payload
  const offset = (page - 1) * limit

  if (currentUser.user_type === userRoles.manager.type) {
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
    include: [
      {
        model: RolePermissionModel,
        as: 'role_permissions',
        required: false,
        include: [
          {
            model: PermissionModel,
            as: 'permission',
            required: false,
          },
        ],
      },
    ],
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

  if (user_type === userRoles.manager.type) {
    filter.manager_id = id
  }

  const roleRecord = await RoleModel.findOne({
    where: filter,
  })

  if (!roleRecord) {
    throw new RoleNotFoundError(roleId)
  }
  return roleRecord
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
