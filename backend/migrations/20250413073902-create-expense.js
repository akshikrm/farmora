'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('expense', {
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
            season_id: {
                type: Sequelize.INTEGER, 
                allowNull: false
            }, 
            date: {
                type: Sequelize.DATEONLY, 
                allowNull: false
            },   
            invoice_no: {
                type: Sequelize.STRING,
                allowNull: false
            },   
            item_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },   
            vendor_id: {
                type: Sequelize.INTEGER
            },   
            batch_id: {
                type: Sequelize.INTEGER
            },  
            quatity: {
                type: Sequelize.DECIMAL(10, 2)
            },  
            rate: {
                type: Sequelize.DECIMAL(10, 2)
            },  
            amount: {
                type: Sequelize.DECIMAL(10, 2)
            },  
            discount: {
                type: Sequelize.DECIMAL(10, 2)
            },  
            net_amount: {
                type: Sequelize.DECIMAL(10, 2)
            },  
            payment_type: {
                type: Sequelize.INTEGER
            },  
            description: {
                type: Sequelize.TEXT
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
        await queryInterface.dropTable('expense');
    }
};
