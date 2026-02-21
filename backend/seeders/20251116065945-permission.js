import permissions from '../config/permissions.js'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, DataTypes) {
    await queryInterface.bulkInsert('permissions', [
      {
        key: permissions.season_read,
        description: 'Permission to read season data',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        key: permissions.season_write,
        description: 'Permission to create a new season',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        key: permissions.season_edit,
        description: 'Permission to edit a new season',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        key: permissions.season_delete,
        description: 'Permission to delete a season',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.bulkDelete(
      'permissions',
      {
        key: [
          permissions.season_read,
          permissions.season_write,
          permissions.season_edit,
          permissions.season_delete,
        ],
      },
      {}
    )
  },
}
