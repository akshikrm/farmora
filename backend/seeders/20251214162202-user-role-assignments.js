/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    // Assign roles to staff users
    // Assuming staff user IDs are 4, 5 from 20251110170546-staff.js
    const userRoleAssignments = [
      { user_id: 4, role_id: 1, created_at: new Date(), updated_at: new Date() }, // Staff 1 - All Access
      { user_id: 5, role_id: 2, created_at: new Date(), updated_at: new Date() }, // Staff 2 - Read Only
    ]

    await queryInterface.bulkInsert('user_role_assignments', userRoleAssignments)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_role_assignments', { user_id: [4, 5] }, {})
  },
}
