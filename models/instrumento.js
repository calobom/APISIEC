module.exports = (sequelize, DataTypes) => {
    const Instrumento = sequelize.define('Instrumento', {
        id_instrumento: {
            type: DataTypes.NUMERIC(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        instrumentname: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        instrumentmanufacturer: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        instrumentmodel: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        spectralrange: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        metrologicnumber: {
            type: DataTypes.NUMERIC(10),
            allowNull: false
        },
        serialwhitereference: {
            type: DataTypes.NUMERIC(10),
            allowNull: true
        },
        serialdarkreference: {
            type: DataTypes.NUMERIC(10),
            allowNull: true
        }
    }, {
        tableName: 'instrumentos',
        schema: 'firmas',
        timestamps: false
    });

    return Instrumento;
};
