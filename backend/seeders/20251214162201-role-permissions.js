import permissions from '../config/permissions.js'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    // Assume Role ID 1 = Season All Access (from 20251116073938-role.js)
    // Assume Role ID 2 = Season Read Only (from 20251116073938-role.js)
    
    const rolePermissions = [
      // Season All Access - has all permissions
      { role_id: 1, permission_id: 1, created_at: new Date(), updated_at: new Date() }, // season_read
      { role_id: 1, permission_id: 2, created_at: new Date(), updated_at: new Date() }, // season_write
      { role_id: 1, permission_id: 3, created_at: new Date(), updated_at: new Date() }, // season_edit
      { role_id: 1, permission_id: 4, created_at: new Date(), updated_at: new Date() }, // season_delete
      
      // Season Read Only - only read permission
      { role_id: 2, permission_id: 1, created_at: new Date(), updated_at: new Date() }, // season_read
    ]

    await queryInterface.bulkInsert('role_permissions', rolePermissions)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('role_permissions', { role_id: [1, 2] }, {})
  },
}
