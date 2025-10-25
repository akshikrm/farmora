module.exports = (sequelize, DataTypes) => {
    const Farms = sequelize.define('farms', 
        {
            master_id: {
                type: DataTypes.INTEGER, 
                allowNull: false
            },  
            name: {
                type: DataTypes.STRING, 
                allowNull: false
            },  
            place: {
                type: DataTypes.STRING, 
            },  
            capacity: {
                type: DataTypes.STRING, 
            },  
            own: {
                type: DataTypes.BOOLEAN, 
                defaultValue: false
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

    return Farms;
};
