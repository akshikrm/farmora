/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const seasons = [
      {
        master_id: 2,
        name: 'Winter Season 2024',
        from_date: new Date('2024-11-01'),
        to_date: new Date('2025-02-28'),
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        master_id: 2,
        name: 'Spring Season 2025',
        from_date: new Date('2025-03-01'),
        to_date: new Date('2025-05-31'),
        status: 'inactive',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        master_id: 3,
        name: 'Summer Season 2024',
        from_date: new Date('2024-06-01'),
        to_date: new Date('2024-08-31'),
        status: 'inactive',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]

    await queryInterface.bulkInsert('seasons', seasons)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('seasons', {
      name: ['Winter Season 2024', 'Spring Season 2025', 'Summer Season 2024']
    }, {})
  },
}
