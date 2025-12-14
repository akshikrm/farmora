/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const batches = [
      {
        master_id: 2,
        season_id: 1,
        farm_id: 1,
        name: 'Batch A-Winter-2024',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        master_id: 2,
        season_id: 1,
        farm_id: 1,
        name: 'Batch B-Winter-2024',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        master_id: 2,
        season_id: 2,
        farm_id: 1,
        name: 'Batch A-Spring-2025',
        status: 'inactive',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        master_id: 3,
        season_id: 3,
        farm_id: 2,
        name: 'Batch A-Summer-2024',
        status: 'inactive',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]

    await queryInterface.bulkInsert('batches', batches)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'batches',
      {
        name: [
          'Batch A-Winter-2024',
          'Batch B-Winter-2024',
          'Batch A-Spring-2025',
          'Batch A-Summer-2024',
        ],
      },
      {}
    )
  },
}
