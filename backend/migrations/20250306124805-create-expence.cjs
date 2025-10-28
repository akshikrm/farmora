'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('expences', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            season_id: { 
                type: Sequelize.INTEGER,
                allowNull: false
            },
            date: { 
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            invoice_number: {
                type: Sequelize.STRING, 
                allowNull: false
            },
            status: { 
                type: Sequelize.INTEGER,
                defaultValue: 1 
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

    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable('expences');
    }
};
