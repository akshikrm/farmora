module.exports = (sequelize, DataTypes) => {
    const Seasons = sequelize.define('seasons', 
        {
            master_id: {
                type: DataTypes.INTEGER, 
                allowNull: false
            }, 
            name: {
                type: DataTypes.STRING, 
                allowNull: false
            },  
            from_date: { 
                type: DataTypes.DATEONLY 
            },
            to_date: { 
                type: DataTypes.DATEONLY 
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

    return Seasons;
};
