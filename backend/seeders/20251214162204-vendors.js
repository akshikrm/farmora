/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const vendors = [
      {
        master_id: 2,
        name: 'Green Supplies Co.',
        vendor_type: 'seller',
        address: '123 Farm Road, California',
        opening_balance: 0.00,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        master_id: 2,
        name: 'AgriPro Vendors',
        vendor_type: 'seller',
        address: '456 Agriculture Ave, California',
        opening_balance: 0.00,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        master_id: 3,
        name: 'FarmGear Texas',
        vendor_type: 'seller',
        address: '789 Ranch Blvd, Texas',
        opening_balance: 0.00,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]

    await queryInterface.bulkInsert('vendors', vendors)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('vendors', {
      name: ['Green Supplies Co.', 'AgriPro Vendors', 'FarmGear Texas']
    }, {})
  },
}
