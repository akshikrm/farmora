/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const items = [
      {
        master_id: 2,
        category_id: 1,
        name: 'Corn Seeds - Premium Grade',
        quantity: 100,
        total_price: 5000.00,
        net_amount: 4750.00,
        invoice_number: 'INV-2024-001',
        invoice_date: new Date('2024-11-15'),
        price_per_unit: 50.00,
        discount_price: 250.00,
        vendor_id: 1,
        batch_id: 1,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        master_id: 2,
        category_id: 2,
        name: 'Organic Fertilizer NPK 10-10-10',
        quantity: 50,
        total_price: 2500.00,
        net_amount: 2500.00,
        invoice_number: 'INV-2024-002',
        invoice_date: new Date('2024-11-20'),
        price_per_unit: 50.00,
        discount_price: 0.00,
        vendor_id: 2,
        batch_id: 1,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        master_id: 2,
        category_id: 3,
        name: 'Bio Pesticide Spray',
        quantity: 20,
        total_price: 1500.00,
        net_amount: 1350.00,
        invoice_number: 'INV-2024-003',
        invoice_date: new Date('2024-12-01'),
        price_per_unit: 75.00,
        discount_price: 150.00,
        vendor_id: 1,
        batch_id: 2,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        master_id: 3,
        category_id: 4,
        name: 'Tractor Attachments Set',
        quantity: 5,
        total_price: 15000.00,
        net_amount: 14000.00,
        invoice_number: 'INV-2024-101',
        invoice_date: new Date('2024-06-15'),
        price_per_unit: 3000.00,
        discount_price: 1000.00,
        vendor_id: 3,
        batch_id: 4,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]

    await queryInterface.bulkInsert('items', items)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('items', {
      invoice_number: ['INV-2024-001', 'INV-2024-002', 'INV-2024-003', 'INV-2024-101']
    }, {})
  },
}
