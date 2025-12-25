/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const seasons = [
      // Manager 2 (Jeevan) - 2024 seasons
      {
        master_id: 2,
        name: 'Winter Season 2024',
        from_date: new Date('2024-11-01'),
        to_date: new Date('2025-02-28'),
        status: 'active',
        created_at: new Date('2024-10-15'),
        updated_at: new Date('2024-10-15'),
      },
      {
        master_id: 2,
        name: 'Spring Season 2024',
        from_date: new Date('2024-03-01'),
        to_date: new Date('2024-05-31'),
        status: 'inactive',
        created_at: new Date('2024-02-15'),
        updated_at: new Date('2024-02-15'),
      },
      {
        master_id: 2,
        name: 'Summer Season 2024',
        from_date: new Date('2024-06-01'),
        to_date: new Date('2024-08-31'),
        status: 'inactive',
        created_at: new Date('2024-05-20'),
        updated_at: new Date('2024-05-20'),
      },
      {
        master_id: 2,
        name: 'Fall Season 2024',
        from_date: new Date('2024-09-01'),
        to_date: new Date('2024-10-31'),
        status: 'inactive',
        created_at: new Date('2024-08-20'),
        updated_at: new Date('2024-08-20'),
      },
      // Manager 3 (Raoof) - 2024 seasons
      {
        master_id: 3,
        name: 'Winter Season 2024-25',
        from_date: new Date('2024-11-15'),
        to_date: new Date('2025-02-15'),
        status: 'active',
        created_at: new Date('2024-11-01'),
        updated_at: new Date('2024-11-01'),
      },
      {
        master_id: 3,
        name: 'Summer Season 2024',
        from_date: new Date('2024-06-01'),
        to_date: new Date('2024-08-31'),
        status: 'inactive',
        created_at: new Date('2024-05-15'),
        updated_at: new Date('2024-05-15'),
      },
      {
        master_id: 3,
        name: 'Monsoon Season 2024',
        from_date: new Date('2024-07-01'),
        to_date: new Date('2024-09-30'),
        status: 'inactive',
        created_at: new Date('2024-06-20'),
        updated_at: new Date('2024-06-20'),
      },
      // Manager 4 (Priya)
      {
        master_id: 4,
        name: 'Spring Season 2024',
        from_date: new Date('2024-03-15'),
        to_date: new Date('2024-06-15'),
        status: 'inactive',
        created_at: new Date('2024-03-01'),
        updated_at: new Date('2024-03-01'),
      },
      {
        master_id: 4,
        name: 'Fall Season 2024',
        from_date: new Date('2024-09-15'),
        to_date: new Date('2024-12-15'),
        status: 'active',
        created_at: new Date('2024-09-01'),
        updated_at: new Date('2024-09-01'),
      },
      // Manager 5 (Arjun)
      {
        master_id: 5,
        name: 'Summer Harvest 2024',
        from_date: new Date('2024-05-01'),
        to_date: new Date('2024-08-31'),
        status: 'inactive',
        created_at: new Date('2024-04-20'),
        updated_at: new Date('2024-04-20'),
      },
      {
        master_id: 5,
        name: 'Winter Harvest 2024',
        from_date: new Date('2024-11-01'),
        to_date: new Date('2025-02-28'),
        status: 'active',
        created_at: new Date('2024-10-25'),
        updated_at: new Date('2024-10-25'),
      },
      // Manager 6 (Meera)
      {
        master_id: 6,
        name: 'Autumn Season 2024',
        from_date: new Date('2024-09-01'),
        to_date: new Date('2024-11-30'),
        status: 'inactive',
        created_at: new Date('2024-08-25'),
        updated_at: new Date('2024-08-25'),
      },
      {
        master_id: 6,
        name: 'Winter Season 2024',
        from_date: new Date('2024-12-01'),
        to_date: new Date('2025-02-28'),
        status: 'active',
        created_at: new Date('2024-11-20'),
        updated_at: new Date('2024-11-20'),
      },
    ]

    await queryInterface.bulkInsert('seasons', seasons)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('seasons', {}, {})
  },
}
