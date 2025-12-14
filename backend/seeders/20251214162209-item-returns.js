/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const returns = [
      {
        master_id: 2,
        return_type: 'vendor',
        item_category_id: 3,
        date: new Date('2024-12-10'),
        from_batch: 2,
        to_batch: null,
        to_vendor: 1,
        quantity: 5,
        rate_per_bag: 75.00,
        total_amount: 375.00,
        status: 'completed',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        master_id: 2,
        return_type: 'batch',
        item_category_id: 1,
        date: new Date('2024-12-12'),
        from_batch: 1,
        to_batch: 2,
        to_vendor: null,
        quantity: 10,
        rate_per_bag: 50.00,
        total_amount: 500.00,
        status: 'completed',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        master_id: 2,
        return_type: 'vendor',
        item_category_id: 2,
        date: new Date('2024-12-13'),
        from_batch: 1,
        to_batch: null,
        to_vendor: 2,
        quantity: 3,
        rate_per_bag: 50.00,
        total_amount: 150.00,
        status: 'pending',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]

    await queryInterface.bulkInsert('item_returns', returns)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('item_returns', {
      master_id: 2
    }, {})
  },
}
