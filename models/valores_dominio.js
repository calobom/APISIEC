module.exports = (sequelize, DataTypes) => {
    const ValoresDominio = sequelize.define('ValoresDominio', {
        id_valor_dominio: {
            type: DataTypes.NUMERIC(10),
            primaryKey: true,
            autoIncrement: true, // Para manejar el nextval de la secuencia en PostgreSQL
        },
        tipo_dominio: {
            type: DataTypes.STRING(20),
            allowNull: false,
            references: {
                model: 'TipoDominio', // Nombre del modelo referenciado
                key: 'tipo_dominio'
            }
        },
        valor_dominio: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        descripcion_valor: {
            type: DataTypes.STRING(250),
            allowNull: true,
        },
        id_valor_dom_padre: {
            type: DataTypes.NUMERIC(10),
            allowNull: true,
        }
    }, {
        tableName: 'valores_dominio',
        schema: 'firmas',
        timestamps: false
    });

    return ValoresDominio;
};
