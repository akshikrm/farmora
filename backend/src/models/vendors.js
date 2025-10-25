module.exports = (sequelize, DataTypes) => {
    const Vendors = sequelize.define('vendors', 
        {
            master_id: {
                type: DataTypes.INTEGER, 
                allowNull: false
            },  
            name: {
                type: DataTypes.STRING, 
                allowNull: false
            },  
            phone: {
                type: DataTypes.STRING
            },   
            email: {
                type: DataTypes.STRING
            },   
            address: {
                type: DataTypes.TEXT
            },   
            opening_balance: {
                type: DataTypes.DECIMAL(10, 2),
            },  
            status: { 
                type: DataTypes.INTEGER,
                defaultValue: 1 
            },
        },
        {
            paranoid: true,
            timestamps: true,
        }
    );

    return Vendors;
};
