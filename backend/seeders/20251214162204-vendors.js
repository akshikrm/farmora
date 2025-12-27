/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const vendors = [
      // Manager 2 vendors
      {
        master_id: 2,
        name: 'Green Supplies Co.',
        vendor_type: 'seller',
        address: '123 Farm Road, California',
        opening_balance: 0.00,
        status: 'active',
        created_at: new Date('2024-01-20'),
        updated_at: new Date('2024-01-20'),
      },
      {
        master_id: 2,
        name: 'AgriPro Vendors',
        vendor_type: 'seller',
        address: '456 Agriculture Ave, California',
        opening_balance: 0.00,
        status: 'active',
        created_at: new Date('2024-01-25'),
        updated_at: new Date('2024-01-25'),
      },
      {
        master_id: 2,
        name: 'FarmTech Solutions',
        vendor_type: 'seller',
        address: '789 Tech Park, California',
        opening_balance: 0.00,
        status: 'active',
        created_at: new Date('2024-02-05'),
        updated_at: new Date('2024-02-05'),
      },
      // Manager 3 vendors
      {
        master_id: 3,
        name: 'FarmGear Texas',
        vendor_type: 'seller',
        address: '789 Ranch Blvd, Texas',
        opening_balance: 0.00,
        status: 'active',
        created_at: new Date('2024-02-15'),
        updated_at: new Date('2024-02-15'),
      },
      {
        master_id: 3,
        name: 'Texas Agri Supplies',
        vendor_type: 'seller',
        address: '321 Farm Street, Texas',
        opening_balance: 0.00,
        status: 'active',
        created_at: new Date('2024-02-20'),
        updated_at: new Date('2024-02-20'),
      },
      // Manager 4 vendors
      {
        master_id: 4,
        name: 'Oregon Farm Equipment',
        vendor_type: 'seller',
        address: '555 Equipment Lane, Oregon',
        opening_balance: 0.00,
        status: 'active',
        created_at: new Date('2024-03-25'),
        updated_at: new Date('2024-03-25'),
      },
      {
        master_id: 4,
        name: 'Pacific Seeds & Supplies',
        vendor_type: 'seller',
        address: '888 Pacific Ave, Oregon',
        opening_balance: 0.00,
        status: 'active',
        created_at: new Date('2024-04-05'),
        updated_at: new Date('2024-04-05'),
      },
      // Manager 5 vendors
      {
        master_id: 5,
        name: 'Midwest Agri Partners',
        vendor_type: 'seller',
        address: '999 Corn Belt Rd, Iowa',
        opening_balance: 0.00,
        status: 'active',
        created_at: new Date('2024-05-15'),
        updated_at: new Date('2024-05-15'),
      },
      {
        master_id: 5,
        name: 'Iowa Farm Supplies',
        vendor_type: 'seller',
        address: '111 Harvest Way, Iowa',
        opening_balance: 0.00,
        status: 'active',
        created_at: new Date('2024-05-20'),
        updated_at: new Date('2024-05-20'),
      },
      // Manager 6 vendors
      {
        master_id: 6,
        name: 'Vermont Organic Suppliers',
        vendor_type: 'seller',
        address: '222 Maple St, Vermont',
        opening_balance: 0.00,
        status: 'active',
        created_at: new Date('2024-06-10'),
        updated_at: new Date('2024-06-10'),
      },
      {
        master_id: 6,
        name: 'Green Mountain Farm Co.',
        vendor_type: 'seller',
        address: '333 Mountain Rd, Vermont',
        opening_balance: 0.00,
        status: 'active',
        created_at: new Date('2024-06-15'),
        updated_at: new Date('2024-06-15'),
      },
    ]

    await queryInterface.bulkInsert('vendors', vendors)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('vendors', {}, {})
  },
}
