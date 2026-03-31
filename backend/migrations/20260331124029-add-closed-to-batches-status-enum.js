'use strict'

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_batches_status"
      ADD VALUE IF NOT EXISTS 'closed';
    `)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      // 0. Remove default (IMPORTANT)
      await queryInterface.sequelize.query(
        `
        ALTER TABLE "batches"
        ALTER COLUMN "status" DROP DEFAULT;
      `,
        { transaction: t }
      )

      // 1. Clean data
      await queryInterface.sequelize.query(
        `
        UPDATE "batches"
        SET "status" = 'inactive'
        WHERE "status" = 'closed';
      `,
        { transaction: t }
      )

      // 2. Create new enum
      await queryInterface.sequelize.query(
        `
        CREATE TYPE "enum_batches_status_new"
        AS ENUM ('active', 'inactive');
      `,
        { transaction: t }
      )

      // 3. Change column type
      await queryInterface.sequelize.query(
        `
        ALTER TABLE "batches"
        ALTER COLUMN "status"
        TYPE "enum_batches_status_new"
        USING "status"::text::"enum_batches_status_new";
      `,
        { transaction: t }
      )

      // 4. Drop old enum
      await queryInterface.sequelize.query(
        `
        DROP TYPE "enum_batches_status";
      `,
        { transaction: t }
      )

      // 5. Rename new enum
      await queryInterface.sequelize.query(
        `
        ALTER TYPE "enum_batches_status_new"
        RENAME TO "enum_batches_status";
      `,
        { transaction: t }
      )

      // 6. Restore default
      await queryInterface.sequelize.query(
        `
        ALTER TABLE "batches"
        ALTER COLUMN "status" SET DEFAULT 'active';
      `,
        { transaction: t }
      )
    })
  },
}
