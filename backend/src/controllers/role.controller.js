import roleService from '#services/role.service'
import asyncHandler from '#utils/async-handler'

const createRole = async (req, res) => {
  const { name, description, permission_ids } = req.body

  const payload = {
    name,
    description,
    permission_ids,
  }
  const newRole = await roleService.createRoleService(payload, req.user)
  res.success(newRole, { message: 'Role created', statusCode: 201 })
}

const getAllRoles = async (req, res) => {
  const { name, page, limit, manager_id } = req.query
  const filter = {
    page: page ? parseInt(req.query.page) : 1,
    limit: limit ? parseInt(req.query.limit) : 10,
  }
  if (name) {
    filter.name = name
  }

  if (manager_id) {
    filter.manager_id = manager_id
  }

  const roleRecords = await roleService.getAllRolesService(filter, req.user)
  res.success(roleRecords, { message: 'Roles fetched successfully' })
}

const getRoleById = (req, res) => {
  const { role_id } = req.params
  // Logic to get a role by ID
  res.send(`Details of role with ID: ${role_id}`)
}

const updateRoleById = (req, res) => {
  const { role_id } = req.params
  // Logic to update a role by ID
  res.send(`Role with ID: ${role_id} updated`)
}

const deleteRoleById = (req, res) => {
  const { role_id } = req.params
  // Logic to delete a role by ID
  res.send(`Role with ID: ${role_id} deleted`)
}

const roleController = {
  createRole: asyncHandler(createRole),
  getAllRoles: asyncHandler(getAllRoles),
  getRoleById,
  updateRoleById,
  deleteRoleById,
}

export default roleController
