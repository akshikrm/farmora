export type UserRoles = 'admin' | 'manager' | 'staff'

const userRoles = {
  admin: {
    type: 'admin',
    descriptirn: 'Administrator with full access',
  },
  manager: {
    type: 'manager',
    description: 'Manager with elevated privileges',
  },
  staff: {
    type: 'staff',
    description: 'Staff member with limited access',
  },
}

export default userRoles
