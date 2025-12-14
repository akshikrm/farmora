import { sequelize } from './src/utils/db.js';

// Vendors
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
];

// Batches
const batches = [
  {
    master_id: 2,
    season_id: 1,
    name: 'Batch A-Winter-2024',
    status: 'active',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    master_id: 2,
    season_id: 1,
    name: 'Batch B-Winter-2024',
    status: 'active',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    master_id: 2,
    season_id: 2,
    name: 'Batch A-Spring-2025',
    status: 'inactive',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    master_id: 3,
    season_id: 3,
    name: 'Batch A-Summer-2024',
    status: 'inactive',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

// Item Categories
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
];

// Items
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
];

// Item Batch Assignments
const assignments = [
  {
    item_id: 1,
    batch_id: 1,
    quantity: 100,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    item_id: 2,
    batch_id: 1,
    quantity: 50,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    item_id: 3,
    batch_id: 2,
    quantity: 20,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    item_id: 4,
    batch_id: 4,
    quantity: 5,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

// Item Returns
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
];

try {
  console.log('Seeding vendors...');
  await sequelize.queryInterface.bulkInsert('vendors', vendors);
  console.log('✓ Vendors seeded');

  console.log('\nSeeding batches...');
  await sequelize.queryInterface.bulkInsert('batches', batches);
  console.log('✓ Batches seeded');

  console.log('\nSeeding item categories...');
  await sequelize.queryInterface.bulkInsert('item_categories', categories);
  console.log('✓ Item categories seeded');

  console.log('\nSeeding items...');
  await sequelize.queryInterface.bulkInsert('items', items);
  console.log('✓ Items seeded');

  console.log('\nSeeding item batch assignments...');
  await sequelize.queryInterface.bulkInsert('item_batch_assignments', assignments);
  console.log('✓ Item batch assignments seeded');

  console.log('\nSeeding item returns...');
  await sequelize.queryInterface.bulkInsert('item_returns', returns);
  console.log('✓ Item returns seeded');

  console.log('\n✅ All missing data seeded successfully!');
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
} finally {
  await sequelize.close();
}
