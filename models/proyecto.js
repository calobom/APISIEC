module.exports = (sequelize, DataTypes) => {
    const Proyecto = sequelize.define('Proyecto', {
        id_proyecto: {
            type: DataTypes.NUMERIC(10),
            primaryKey: true,
            autoIncrement: true
        },
        projectname: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        projectdescription: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        projectinstitution: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }, {
        tableName: 'proyectos',
        schema: 'firmas',
        timestamps: false 
    });

    Proyecto.associate = models => {
        // Un proyecto tiene muchas campañas
        Proyecto.hasMany(models.Campana, {
            foreignKey: 'id_proyecto',
            as: 'campanas'
        });
    };

    return Proyecto;
};
