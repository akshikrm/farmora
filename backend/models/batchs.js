module.exports = (sequelize, DataTypes) => {
    const Batchs = sequelize.define('batchs', 
        {
            name: {
                type: DataTypes.STRING, 
                allowNull: false
            },  
            season_id: {
                type: DataTypes.INTEGER, 
                allowNull: false
            },  
            farm_id: {
                type: DataTypes.INTEGER, 
                allowNull: false
            },  
            name: {
                type: DataTypes.STRING,
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

    return Batchs;
};
