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

    const vehiclePrefixes = ['CA', 'TX', 'OR', 'IA', 'VT', 'NY', 'FL', 'WA']
    const narrations = [
      'Regular batch sale',
      'Premium quality birds',
      'Good market price',
      'Bulk order delivery',
      'Weekly scheduled sale',
      'High demand fulfilled',
      'Quality stock clearance',
      'Seasonal sale',
      'Express delivery order',
      'Contract fulfillment',
    ]

    // Manager configurations with their seasons, batches, and buyers
    const managerConfigs = [
      { master_id: 2, seasons: [1, 2, 3, 4], batches: [1, 2, 3, 4, 5, 6, 7, 8, 9], buyers: [12, 13] },
      { master_id: 3, seasons: [5, 6, 7], batches: [10, 11, 12, 13], buyers: [14, 15] },
      { master_id: 4, seasons: [8, 9], batches: [14, 15, 16, 17, 18, 19], buyers: [16, 17] },
      { master_id: 5, seasons: [10, 11], batches: [20, 21, 22, 23], buyers: [18, 19] },
      { master_id: 6, seasons: [12, 13], batches: [24, 25, 26], buyers: [20, 21] },
    ]

    const sales = []

    // Generate sales for each manager
    managerConfigs.forEach((config) => {
      // Generate 15-30 sales per manager spread across the date range
      const numSales = randomInt(15, 30)

      for (let i = 0; i < numSales; i++) {
        const saleDate = randomDate(startDate, endDate)
        const bird_no = randomInt(80, 200)
        const weight = randomFloat(bird_no * 1.2, bird_no * 1.8, 2)
        const avg_weight = parseFloat((weight / bird_no).toFixed(2))
        const price = randomFloat(7.50, 10.50, 2)
        const amount = parseFloat((weight * price).toFixed(2))

        sales.push({
          master_id: config.master_id,
          season_id: randomChoice(config.seasons),
          batch_id: randomChoice(config.batches),
          date: saleDate,
          buyer_id: randomChoice(config.buyers),
          vehicle_no: `${randomChoice(vehiclePrefixes)}-${randomInt(1000, 9999)}`,
          weight,
          bird_no,
          avg_weight,
          payment_type: randomChoice(['cash', 'credit']),
          price,
          amount,
          narration: randomChoice(narrations),
          status: 'active',
          created_at: saleDate,
          updated_at: saleDate,
        })
      }
    })

    // Sort by date for cleaner data
    sales.sort((a, b) => a.date - b.date)

    await queryInterface.bulkInsert('sales', sales)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sales', {}, {})
  },
}
