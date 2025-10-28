'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('subscriptions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: { 
                type: Sequelize.INTEGER, 
                allowNull: false
            },
            package_id: { 
                type: Sequelize.INTEGER, 
                allowNull: false
            },
            start_date: { 
                type: Sequelize.DATE, 
                allowNull: false 
            },
            end_date: { 
                type: Sequelize.DATE, 
                allowNull: false 
            },
            status: { 
                type: Sequelize.ENUM("active", "expired", "cancelled"), 
                defaultValue: "active"
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true 
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('subscriptions');
    }
};