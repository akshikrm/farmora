export default {
  async up(queryInterface, Sequelize) {
    // Rename old enum
    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_vendors_vendor_type" RENAME TO "enum_vendors_vendor_type_old";
    `)

    // Create new enum
    await queryInterface.sequelize.query(`
      CREATE TYPE "enum_vendors_vendor_type" AS ENUM ('supplier', 'customer');
    `)

    // Update column to use new enum
    await queryInterface.sequelize.query(`
      ALTER TABLE "vendors"
      ALTER COLUMN "vendor_type"
      TYPE "enum_vendors_vendor_type"
      USING (
        CASE
          WHEN vendor_type = 'seller' THEN 'supplier'
          WHEN vendor_type = 'buyer' THEN 'customer'
        END
      )::"enum_vendors_vendor_type";
    `)

    // Drop old enum
    await queryInterface.sequelize.query(`
      DROP TYPE "enum_vendors_vendor_type_old";
    `)
  },

  async down(queryInterface, Sequelize) {
    // Reverse process

    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_vendors_vendor_type" RENAME TO "enum_vendors_vendor_type_old";
    `)

    await queryInterface.sequelize.query(`
      CREATE TYPE "enum_vendors_vendor_type" AS ENUM ('seller', 'buyer');
    `)

    await queryInterface.sequelize.query(`
      ALTER TABLE "vendors"
      ALTER COLUMN "vendor_type"
      TYPE "enum_vendors_vendor_type"
      USING (
        CASE
          WHEN vendor_type = 'supplier' THEN 'seller'
          WHEN vendor_type = 'customer' THEN 'buyer'
        END
      )::"enum_vendors_vendor_type";
    `)

    await queryInterface.sequelize.query(`
      DROP TYPE "enum_vendors_vendor_type_old";
    `)
  },
}
