/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const categories = [
      // Manager 2 categories
      {
        master_id: 2,
        name: 'Seeds',
        status: 'active',
        type: 'regular',
        created_at: new Date('2024-01-15'),
        updated_at: new Date('2024-01-15'),
      },
      {
        master_id: 2,
        name: 'Fertilizers',
        status: 'active',
        type: 'regular',
        created_at: new Date('2024-01-15'),
        updated_at: new Date('2024-01-15'),
      },
      {
        master_id: 2,
        name: 'Pesticides',
        status: 'active',
        type: 'regular',
        created_at: new Date('2024-01-15'),
        updated_at: new Date('2024-01-15'),
      },
      {
        master_id: 2,
        name: 'Irrigation Equipment',
        status: 'active',
        type: 'working',
        created_at: new Date('2024-01-15'),
        updated_at: new Date('2024-01-15'),
      },
      // Manager 3 categories
      {
        master_id: 3,
        name: 'Equipment',
        status: 'active',
        type: 'working',
        created_at: new Date('2024-02-10'),
        updated_at: new Date('2024-02-10'),
      },
      {
        master_id: 3,
        name: 'Tools',
        status: 'active',
        type: 'working',
        created_at: new Date('2024-02-10'),
        updated_at: new Date('2024-02-10'),
      },
      {
        master_id: 3,
        name: 'Organic Fertilizers',
        status: 'active',
        type: 'regular',
        created_at: new Date('2024-02-10'),
        updated_at: new Date('2024-02-10'),
      },
      // Manager 4 categories
      {
        master_id: 4,
        name: 'Vegetable Seeds',
        status: 'active',
        type: 'regular',
        created_at: new Date('2024-03-20'),
        updated_at: new Date('2024-03-20'),
      },
      {
        master_id: 4,
        name: 'Machinery',
        status: 'active',
        type: 'working',
        created_at: new Date('2024-03-20'),
        updated_at: new Date('2024-03-20'),
      },
      {
        master_id: 4,
        name: 'Bio Pesticides',
        status: 'active',
        type: 'regular',
        created_at: new Date('2024-03-20'),
        updated_at: new Date('2024-03-20'),
      },
      // Manager 5 categories
      {
        master_id: 5,
        name: 'Grain Seeds',
        status: 'active',
        type: 'regular',
        created_at: new Date('2024-05-12'),
        updated_at: new Date('2024-05-12'),
      },
      {
        master_id: 5,
        name: 'Soil Amendments',
        status: 'active',
        type: 'regular',
        created_at: new Date('2024-05-12'),
        updated_at: new Date('2024-05-12'),
      },
      {
        master_id: 5,
        name: 'Farm Equipment',
        status: 'active',
        type: 'working',
        created_at: new Date('2024-05-12'),
        updated_at: new Date('2024-05-12'),
      },
      // Manager 6 categories
      {
        master_id: 6,
        name: 'Organic Seeds',
        status: 'active',
        type: 'regular',
        created_at: new Date('2024-06-05'),
        updated_at: new Date('2024-06-05'),
      },
      {
        master_id: 6,
        name: 'Compost',
        status: 'active',
        type: 'regular',
        created_at: new Date('2024-06-05'),
        updated_at: new Date('2024-06-05'),
      },
      {
        master_id: 6,
        name: 'Hand Tools',
        status: 'active',
        type: 'working',
        created_at: new Date('2024-06-05'),
        updated_at: new Date('2024-06-05'),
      },
    ]

    await queryInterface.bulkInsert('item_categories', categories)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('item_categories', {}, {})
  },
}
