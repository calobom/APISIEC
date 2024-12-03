module.exports = (sequelize, DataTypes) => {
    const Archivo = sequelize.define('Archivo', {
      id_archivo: {
        type: DataTypes.NUMERIC(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      objectid: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      fecha_archivo: {
        type: DataTypes.DATE,
        allowNull: false
      },
      numero_archivo: {
        type: DataTypes.NUMERIC(4),
        allowNull: false
      },
      id_tipo_archivo: {
        type: DataTypes.NUMERIC(10),
        allowNull: false,
        references: {
          model: 'ValoresDominio', // Hace referencia a la tabla 'valores_dominio'
          key: 'id_valor_dominio'
        }
      },
      nombre_archivo: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      ruta_archivo: {
        type: DataTypes.STRING(200),
        allowNull: false
      }
    }, {
      tableName: 'archivos',
      schema: 'firmas',
      timestamps: false
    });
  
    return Archivo;
  };
  