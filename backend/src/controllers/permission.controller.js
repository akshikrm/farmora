import permissionRoleService from '#services/permission.role'
import asyncHandler from '#utils/async-handler'

const getAllPermissions = async (req, res) => {
  const permissions = await permissionRoleService.getAllPermissionRoles()
  res.success(permissions, { message: 'permissions list' })
}

const permissionController = {
  getAllPermissions: asyncHandler(getAllPermissions),
}

export default permissionController
