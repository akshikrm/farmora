/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, DataTypes) {
    await queryInterface.bulkInsert('farms', [
      {
        master_id: 2,
        name: 'Green Valley Farm',
        place: 'California',
        capacity: '500 acres',
        own: true,
        status: 'active',
        created_at: new Date('2024-01-15'),
        updated_at: new Date('2024-01-15'),
      },
      {
        master_id: 2,
        name: 'Riverside Orchards',
        place: 'California',
        capacity: '350 acres',
        own: true,
        status: 'active',
        created_at: new Date('2024-02-01'),
        updated_at: new Date('2024-02-01'),
      },
      {
        master_id: 3,
        name: 'Sunnybrook Farm',
        place: 'Texas',
        capacity: '300 acres',
        own: true,
        status: 'active',
        created_at: new Date('2024-02-10'),
        updated_at: new Date('2024-02-10'),
      },
      {
        master_id: 4,
        name: 'Highland Estate',
        place: 'Oregon',
        capacity: '450 acres',
        own: false,
        status: 'active',
        created_at: new Date('2024-03-20'),
        updated_at: new Date('2024-03-20'),
      },
      {
        master_id: 4,
        name: 'Valley View Farm',
        place: 'Oregon',
        capacity: '200 acres',
        own: true,
        status: 'active',
        created_at: new Date('2024-04-01'),
        updated_at: new Date('2024-04-01'),
      },
      {
        master_id: 5,
        name: 'Golden Harvest Fields',
        place: 'Iowa',
        capacity: '600 acres',
        own: true,
        status: 'active',
        created_at: new Date('2024-05-12'),
        updated_at: new Date('2024-05-12'),
      },
      {
        master_id: 6,
        name: 'Maple Ridge Farm',
        place: 'Vermont',
        capacity: '280 acres',
        own: true,
        status: 'active',
        created_at: new Date('2024-06-05'),
        updated_at: new Date('2024-06-05'),
      },
    ])
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.bulkDelete(
      'farms',
      {
        name: [
          'Green Valley Farm',
          'Riverside Orchards',
          'Sunnybrook Farm',
          'Highland Estate',
          'Valley View Farm',
          'Golden Harvest Fields',
          'Maple Ridge Farm',
        ],
      },
      {}
    )
  },
}
