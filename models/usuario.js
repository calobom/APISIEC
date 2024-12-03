module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        id_usuario: {
            type: DataTypes.NUMERIC(10),
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        apellido: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        correo: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        nombreusuario: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        contrasena: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        sal: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        activo: {
            type: DataTypes.STRING(1),
            allowNull: true
        },
        token: {
            type: DataTypes.STRING(40),
            allowNull: true
        },
        vigente_hasta: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'usuario',
        schema: 'admingeo',  
        timestamps: false
    });

    return Usuario;
};
