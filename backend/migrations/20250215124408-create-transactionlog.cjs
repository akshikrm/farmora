'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('transaction_logs', {
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
            subscription_id: { 
                type: Sequelize.INTEGER, 
                allowNull: true
            },
            payment_id: { 
                type: Sequelize.INTEGER, 
                allowNull: true
            },
            action: { 
                type: Sequelize.STRING, 
                allowNull: false 
            }, 
            // e.g., "subscription_created", "payment_success"
            details: { 
                type: Sequelize.TEXT 
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
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('transaction_logs');
    }
};