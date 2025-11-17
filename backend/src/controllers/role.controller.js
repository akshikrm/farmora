import roleService from '#services/role.service'

const createRole = async (req, res) => {
  const { manager_id, name, description, permission_ids } = req.body

  const payload = {
    manager_id: manager_id,
    name,
    description,
    permission_ids,
  }
  const newRole = await roleService.createRoleService(payload, req.user)
  res.success(newRole, { message: 'Role created', statusCode: 201 })
}

const getAllRoles = (req, res) => {
  // Logic to get all roles
  res.send('List of all roles')
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
  createRole,
  getAllRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
}

export default roleController
