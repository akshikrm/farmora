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
      'Farm Equipment Maintenance',
      'Electricity Bill',
      'Transport Charges',
      'Veterinary Services',
      'Water Bill',
      'Cooling System Maintenance',
      'Labor Wages',
      'Farm Repairs',
      'Heating Equipment',
      'Insurance Premium',
      'Feed Storage Renovation',
      'Drainage System',
      'Emergency Repairs',
      'Farm Security System',
      'Cleaning Supplies',
      'License Renewal',
      'Office Supplies',
      'Vehicle Maintenance',
      'Water Pump Repair',
      'Pest Control',
      'Backup Generator',
      'Staff Training',
      'Transport Fuel',
      'Building Repairs',
      'Safety Equipment',
      'Internet & Communication',
      'Legal Consultation',
      'Waste Management',
      'Marketing Expenses',
      'Packaging Materials',
      'Property Tax',
      'Miscellaneous Expenses',
    ]

    const narrations = [
      'Regular maintenance expense',
      'Monthly recurring charge',
      'Quarterly payment',
      'Annual service fee',
      'Emergency expense',
      'Scheduled maintenance',
      'One-time purchase',
      'Seasonal requirement',
      'Operational expense',
      'Infrastructure improvement',
    ]

    // Manager configurations with their seasons
    const managerConfigs = [
      { master_id: 2, seasons: [1, 2, 3, 4] },
      { master_id: 3, seasons: [5, 6, 7] },
      { master_id: 4, seasons: [8, 9] },
      { master_id: 5, seasons: [10, 11] },
      { master_id: 6, seasons: [12, 13] },
    ]

    const generalExpenses = []

    // Generate expenses for each manager
    managerConfigs.forEach((config) => {
      // Generate 10-20 expenses per manager spread across the date range
      const numExpenses = randomInt(10, 20)

      for (let i = 0; i < numExpenses; i++) {
        const expenseDate = randomDate(startDate, endDate)
        const amount = randomFloat(1000, 15000, 2)

        generalExpenses.push({
          master_id: config.master_id,
          season_id: randomChoice(config.seasons),
          purpose: randomChoice(purposes),
          date: expenseDate,
          amount,
          narration: randomChoice(narrations),
          status: 'active',
          created_at: expenseDate,
          updated_at: expenseDate,
        })
      }
    })

    // Sort by date for cleaner data
    generalExpenses.sort((a, b) => a.date - b.date)

    await queryInterface.bulkInsert('general_expenses', generalExpenses)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('general_expenses', {}, {})
  },
}
