module.exports = (sequelize, DataTypes) => {
    const FirmaEspectral = sequelize.define('FirmaEspectral', {
      objectid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      gdb_geomattr_data: {
        type: DataTypes.BLOB('long'), // Representa bytea en PostgreSQL
        allowNull: true,
      },
      shape: {
        type: DataTypes.GEOMETRY('POINT', 4326), // Geometría con SRID 4326
        allowNull: true,
      },
      codigofirma: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      projectname: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      campananame: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      divipoladepto: {
        type: DataTypes.STRING(2),
        allowNull: true,
      },
      divipolamunicipio: {
        type: DataTypes.STRING(5),
        allowNull: true,
      },
      instrumentname: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      covertype: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      sealevelaltitude: {
        type: DataTypes.NUMERIC(7, 1),
        allowNull: true,
      },
      photosignature: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      spectralintegrity: {
        type: DataTypes.NUMERIC(7, 1),
        allowNull: true,
      }
    }, {
      tableName: 'firmas_espectrales',
      schema: 'geofirmas',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['objectid'],
          name: 'r16_sde_rowid_uk'
        },
        {
          using: 'gist',
          fields: ['shape'],
          name: 'a5_ix1'
        }
      ]
    });
  
    return FirmaEspectral;
  };
  