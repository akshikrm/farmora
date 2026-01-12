/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const generalSales = [
      // Manager 2 (Jeevan) - Season 1 (Winter Season 2024)
      {
        master_id: 2,
        season_id: 1,
        purpose: 'Manure Sale',
        date: new Date('2024-11-15'),
        amount: 8000.00,
        narration: 'Sale of poultry manure to local farmers',
        status: 'active',
        created_at: new Date('2024-11-15'),
        updated_at: new Date('2024-11-15'),
      },
      {
        master_id: 2,
        season_id: 1,
        purpose: 'Empty Feed Bags Sale',
        date: new Date('2024-12-01'),
        amount: 2500.00,
        narration: 'Sale of used feed bags',
        status: 'active',
        created_at: new Date('2024-12-01'),
        updated_at: new Date('2024-12-01'),
      },

      // Manager 2 - Season 2 (Spring Season 2024)
      {
        master_id: 2,
        season_id: 2,
        purpose: 'Feather Sale',
        date: new Date('2024-03-20'),
        amount: 5000.00,
        narration: 'Bulk sale of poultry feathers to pillow manufacturer',
        status: 'active',
        created_at: new Date('2024-03-20'),
        updated_at: new Date('2024-03-20'),
      },

      // Manager 2 - Season 3 (Summer Season 2024)
      {
        master_id: 2,
        season_id: 3,
        purpose: 'Old Equipment Sale',
        date: new Date('2024-06-25'),
        amount: 12000.00,
        narration: 'Sale of old farm equipment',
        status: 'active',
        created_at: new Date('2024-06-25'),
        updated_at: new Date('2024-06-25'),
      },

      // Manager 2 - Season 4 (Fall Season 2024)
      {
        master_id: 2,
        season_id: 4,
        purpose: 'Manure Sale',
        date: new Date('2024-09-20'),
        amount: 7500.00,
        narration: 'Quarterly manure sale',
        status: 'active',
        created_at: new Date('2024-09-20'),
        updated_at: new Date('2024-09-20'),
      },

      // Manager 3 (Raoof) - Season 5 (Winter Season 2024-25)
      {
        master_id: 3,
        season_id: 5,
        purpose: 'Organic Fertilizer Sale',
        date: new Date('2024-11-25'),
        amount: 15000.00,
        narration: 'Sale of processed organic fertilizer',
        status: 'active',
        created_at: new Date('2024-11-25'),
        updated_at: new Date('2024-11-25'),
      },
      {
        master_id: 3,
        season_id: 5,
        purpose: 'Scrap Metal Sale',
        date: new Date('2024-12-10'),
        amount: 6000.00,
        narration: 'Sale of old metal equipment as scrap',
        status: 'active',
        created_at: new Date('2024-12-10'),
        updated_at: new Date('2024-12-10'),
      },

      // Manager 3 - Season 6 (Summer Season 2024)
      {
        master_id: 3,
        season_id: 6,
        purpose: 'Feather Sale',
        date: new Date('2024-06-15'),
        amount: 4500.00,
        narration: 'Sale of collected poultry feathers',
        status: 'active',
        created_at: new Date('2024-06-15'),
        updated_at: new Date('2024-06-15'),
      },

      // Manager 3 - Season 7 (Monsoon Season 2024)
      {
        master_id: 3,
        season_id: 7,
        purpose: 'Empty Drum Sale',
        date: new Date('2024-07-20'),
        amount: 3500.00,
        narration: 'Sale of empty chemical drums',
        status: 'active',
        created_at: new Date('2024-07-20'),
        updated_at: new Date('2024-07-20'),
      },

      // Manager 4 (Priya) - Season 8 (Spring Season 2024)
      {
        master_id: 4,
        season_id: 8,
        purpose: 'Manure Sale',
        date: new Date('2024-03-25'),
        amount: 9000.00,
        narration: 'Bulk manure sale to agricultural cooperative',
        status: 'active',
        created_at: new Date('2024-03-25'),
        updated_at: new Date('2024-03-25'),
      },

      // Manager 4 - Season 9 (Fall Season 2024)
      {
        master_id: 4,
        season_id: 9,
        purpose: 'Used Vehicle Sale',
        date: new Date('2024-10-10'),
        amount: 45000.00,
        narration: 'Sale of old farm pickup truck',
        status: 'active',
        created_at: new Date('2024-10-10'),
        updated_at: new Date('2024-10-10'),
      },
      {
        master_id: 4,
        season_id: 9,
        purpose: 'Empty Bag Sale',
        date: new Date('2024-10-25'),
        amount: 2000.00,
        narration: 'Sale of empty feed and supply bags',
        status: 'active',
        created_at: new Date('2024-10-25'),
        updated_at: new Date('2024-10-25'),
      },

      // Manager 5 (Arjun) - Season 10 (Summer Harvest 2024)
      {
        master_id: 5,
        season_id: 10,
        purpose: 'Organic Waste Sale',
        date: new Date('2024-05-20'),
        amount: 6500.00,
        narration: 'Sale of organic waste to biogas plant',
        status: 'active',
        created_at: new Date('2024-05-20'),
        updated_at: new Date('2024-05-20'),
      },

      // Manager 5 - Season 11 (Winter Harvest 2024)
      {
        master_id: 5,
        season_id: 11,
        purpose: 'Feather Sale',
        date: new Date('2024-11-15'),
        amount: 5500.00,
        narration: 'Quarterly feather collection sale',
        status: 'active',
        created_at: new Date('2024-11-15'),
        updated_at: new Date('2024-11-15'),
      },
      {
        master_id: 5,
        season_id: 11,
        purpose: 'Manure Sale',
        date: new Date('2024-12-05'),
        amount: 10000.00,
        narration: 'Winter season manure sale',
        status: 'active',
        created_at: new Date('2024-12-05'),
        updated_at: new Date('2024-12-05'),
      },

      // Manager 6 (Meera) - Season 12 (Autumn Season 2024)
      {
        master_id: 6,
        season_id: 12,
        purpose: 'Old Cage Sale',
        date: new Date('2024-09-15'),
        amount: 8000.00,
        narration: 'Sale of old poultry cages',
        status: 'active',
        created_at: new Date('2024-09-15'),
        updated_at: new Date('2024-09-15'),
      },

      // Manager 6 - Season 13 (Winter Season 2024)
      {
        master_id: 6,
        season_id: 13,
        purpose: 'Compost Sale',
        date: new Date('2024-12-15'),
        amount: 7000.00,
        narration: 'Sale of composted poultry waste',
        status: 'active',
        created_at: new Date('2024-12-15'),
        updated_at: new Date('2024-12-15'),
      },
      {
        master_id: 6,
        season_id: 13,
        purpose: 'Scrap Sale',
        date: new Date('2025-01-05'),
        amount: 4000.00,
        narration: 'Sale of miscellaneous scrap materials',
        status: 'active',
        created_at: new Date('2025-01-05'),
        updated_at: new Date('2025-01-05'),
      },

      // ========================================
      // CURRENT MONTH (January 2026) - Recent sales for all managers
      // ========================================

      // Manager 2 - January 2026
      {
        master_id: 2,
        season_id: 1,
        purpose: 'Manure Sale',
        date: new Date('2026-01-08'),
        amount: 9500.00,
        narration: 'January bulk manure sale',
        status: 'active',
        created_at: new Date('2026-01-08'),
        updated_at: new Date('2026-01-08'),
      },

      // Manager 3 - January 2026
      {
        master_id: 3,
        season_id: 5,
        purpose: 'Feather Sale',
        date: new Date('2026-01-10'),
        amount: 6000.00,
        narration: 'Monthly feather collection sale',
        status: 'active',
        created_at: new Date('2026-01-10'),
        updated_at: new Date('2026-01-10'),
      },

      // Manager 4 - January 2026
      {
        master_id: 4,
        season_id: 9,
        purpose: 'Empty Bag Sale',
        date: new Date('2026-01-07'),
        amount: 3000.00,
        narration: 'Sale of accumulated empty bags',
        status: 'active',
        created_at: new Date('2026-01-07'),
        updated_at: new Date('2026-01-07'),
      },

      // Manager 5 - January 2026
      {
        master_id: 5,
        season_id: 11,
        purpose: 'Organic Fertilizer Sale',
        date: new Date('2026-01-12'),
        amount: 11000.00,
        narration: 'Premium organic fertilizer sale',
        status: 'active',
        created_at: new Date('2026-01-12'),
        updated_at: new Date('2026-01-12'),
      },

      // Manager 6 - January 2026
      {
        master_id: 6,
        season_id: 13,
        purpose: 'Manure Sale',
        date: new Date('2026-01-09'),
        amount: 8500.00,
        narration: 'Regular manure sale to local farmers',
        status: 'active',
        created_at: new Date('2026-01-09'),
        updated_at: new Date('2026-01-09'),
      },
    ]

    await queryInterface.bulkInsert('expense_sales', generalSales)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('expense_sales', {}, {})
  },
}
