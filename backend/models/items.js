module.exports = (sequelize, DataTypes) => {
    const Items = sequelize.define('items', 
        {
            master_id: {
                type: DataTypes.INTEGER, 
                allowNull: false
            },  
            name: {
                type: DataTypes.STRING, 
                allowNull: false
            },  
            price: {
                type: DataTypes.DECIMAL(10, 2), 
                allowNull: false 
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

    return Items;
};
