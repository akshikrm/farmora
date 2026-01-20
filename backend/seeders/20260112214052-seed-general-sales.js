/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    // Helper functions for random data generation
    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
    const randomFloat = (min, max, decimals = 2) => parseFloat((Math.random() * (max - min) + min).toFixed(decimals))
    const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)]

    // Generate random date between start and end
    const randomDate = (start, end) => {
      const startTime = start.getTime()
      const endTime = end.getTime()
      return new Date(startTime + Math.random() * (endTime - startTime))
    }

    // Date range: Jan 2024 to end of current month (Jan 2026)
    const startDate = new Date('2024-01-01')
    const endDate = new Date('2026-01-31')

    const purposes = [
      'Manure Sale',
      'Empty Feed Bags Sale',
      'Feather Sale',
      'Old Equipment Sale',
      'Organic Fertilizer Sale',
      'Scrap Metal Sale',
      'Empty Drum Sale',
      'Used Vehicle Sale',
      'Organic Waste Sale',
      'Old Cage Sale',
      'Compost Sale',
      'Scrap Sale',
      'Waste Material Sale',
      'Recycled Items Sale',
      'Byproduct Sale',
    ]

    const narrations = [
      'Regular byproduct sale',
      'Bulk sale to local farmers',
      'Quarterly collection sale',
      'Monthly scheduled sale',
      'One-time clearance sale',
      'Premium quality materials',
      'Recycled materials income',
      'Secondary income source',
      'Farm waste monetization',
      'Environmental disposal income',
    ]

    // Manager configurations with their seasons
    const managerConfigs = [
      { master_id: 2, seasons: [1, 2, 3, 4] },
      { master_id: 3, seasons: [5, 6, 7] },
      { master_id: 4, seasons: [8, 9] },
      { master_id: 5, seasons: [10, 11] },
      { master_id: 6, seasons: [12, 13] },
    ]

    const generalSales = []

    // Generate sales for each manager
    managerConfigs.forEach((config) => {
      // Generate 8-15 general sales per manager spread across the date range
      const numSales = randomInt(8, 15)

      for (let i = 0; i < numSales; i++) {
        const saleDate = randomDate(startDate, endDate)
        const amount = randomFloat(2000, 20000, 2)

        generalSales.push({
          master_id: config.master_id,
          season_id: randomChoice(config.seasons),
          purpose: randomChoice(purposes),
          date: saleDate,
          amount,
          narration: randomChoice(narrations),
          status: 'active',
          created_at: saleDate,
          updated_at: saleDate,
        })
      }
    })

    // Sort by date for cleaner data
    generalSales.sort((a, b) => a.date - b.date)

    await queryInterface.bulkInsert('expense_sales', generalSales)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('expense_sales', {}, {})
  },
}
