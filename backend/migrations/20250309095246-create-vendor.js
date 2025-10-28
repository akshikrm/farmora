'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('vendors', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            master_id: {
                type: Sequelize.INTEGER, 
                allowNull: false
            },  
            name: {
                type: Sequelize.STRING, 
                allowNull: false
            },  
            phone: {
                type: Sequelize.STRING
            },   
            email: {
                type: Sequelize.STRING
            },   
            address: {
                type: Sequelize.TEXT
            },   
            opening_balance: {
                type: Sequelize.DECIMAL(10, 2),
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
        await queryInterface.dropTable('vendors');
    }
};
