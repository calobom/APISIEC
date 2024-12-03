module.exports = (sequelize, DataTypes) => {
    const Campana = sequelize.define('Campana', {
        id_campana: {
            type: DataTypes.NUMERIC(10),
            primaryKey: true,
            autoIncrement: true
        },
        id_proyecto: {
            type: DataTypes.NUMERIC(10),
            allowNull: false
        },
        campananame: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        ambienttemperature: {
            type: DataTypes.NUMERIC(4),
            allowNull: false
        },
        relativehumidity: {
            type: DataTypes.NUMERIC(4),
            allowNull: false
        },
        windspeed: {
            type: DataTypes.NUMERIC(4),
            allowNull: false
        },
        rainfall: {
            type: DataTypes.NUMERIC(4),
            allowNull: false
        }
    }, {
        tableName: 'campanas',
        schema: 'firmas',
        timestamps: false 
    });

    Campana.associate = models => {
        // Una campaña pertenece a un proyecto
        Campana.belongsTo(models.Proyecto, {
            foreignKey: 'id_proyecto',
            as: 'proyecto'
        });
    };

    return Campana;
};
