/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const categories = [
      {
        master_id: 2,
        name: 'Seeds',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        master_id: 2,
        name: 'Fertilizers',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        master_id: 2,
        name: 'Pesticides',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        master_id: 3,
        name: 'Equipment',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        master_id: 3,
        name: 'Tools',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]

    await queryInterface.bulkInsert('item_categories', categories)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('item_categories', {
      name: ['Seeds', 'Fertilizers', 'Pesticides', 'Equipment', 'Tools']
    }, {})
  },
}
