module.exports = (sequelize, DataTypes) => {
  const MetadatoFirma = sequelize.define('MetadatoFirma', {
    id_metadato: {
      type: DataTypes.NUMERIC(10),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    objectid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fileidentifier: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    abstract_fe: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    summary: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    credits: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    topics_keywords: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    citation: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    citeinfo_origin: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    citeinfo_pubdate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    citeinfo_title: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    pubinfo_pubplace: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    pubinfo_publish: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    onlink: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    lworkcit_origin: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    lworkcit_pubdate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    lworkcit_title: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    lworkcit_geoform: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    lworkcit_pubplace: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    lworkcit_publish: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    lworkcit_department: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    lworkcit_laboratory: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    lworkcit_onlink_based: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    lworkcit_voice: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    lworkcit_address_type: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    lworkcit_delivery_point: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    lworkcit_address_city: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    lworkcit_administrative_area: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    lworkcit_postal_code: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    lworkcit_address_country: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    lworkcit_email_address: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    lworkcit_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    lworkcit_version: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    standardname: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    standardmanufacturer: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    calibrationdate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    calibrationnumber: {
      type: DataTypes.NUMERIC(10),
      allowNull: true,
    },
    lastcalibrationdate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    id_signaltype: {
      type: DataTypes.NUMERIC(10),
      allowNull: true,
    },
    spectralrange: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    spectralresolution: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    id_lightinginfo: {
      type: DataTypes.NUMERIC(10),
      allowNull: true,
    },
    lightsource: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    lightingangle: {
      type: DataTypes.NUMERIC(3),
      allowNull: true,
    },
    fieldofview: {
      type: DataTypes.NUMERIC(4),
      allowNull: false,
    },
    measurementheight: {
      type: DataTypes.NUMERIC(4),
      allowNull: false,
    },
    observationangle: {
      type: DataTypes.NUMERIC(4),
      allowNull: true,
    },
    grounddistance: {
      type: DataTypes.NUMERIC(4),
      allowNull: true,
    },
    fibertilt: {
      type: DataTypes.NUMERIC(4),
      allowNull: true,
    },
    id_adaptedoptics: {
      type: DataTypes.NUMERIC(10),
      allowNull: false,
    },
    zenithangle: {
      type: DataTypes.NUMERIC(4),
      allowNull: true,
    },
    azimuthangle: {
      type: DataTypes.NUMERIC(4),
      allowNull: true,
    },
    cloudcoverpercentage: {
      type: DataTypes.NUMERIC(5, 2),
      allowNull: false,
    },
    id_sampletype: {
      type: DataTypes.NUMERIC(10),
      allowNull: false,
    },
    referencesystem: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    samplingdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    samplingtime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    samplingsitedescription: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    id_photocover: {
      type: DataTypes.NUMERIC(10),
      allowNull: false,
    },
    id_photocontext: {
      type: DataTypes.NUMERIC(10),
      allowNull: false,
    },
    integrationtime: {
      type: DataTypes.NUMERIC(3),
      allowNull: true,
    },
    boxcar_width: {
      type: DataTypes.NUMERIC(4),
      allowNull: true,
    },
    scan_average: {
      type: DataTypes.NUMERIC(4),
      allowNull: true,
    },
    id_proyecto: {
      type: DataTypes.NUMERIC(10),
      allowNull: false,
    },
  }, {
    tableName: 'metadatos_firmas',
    schema: 'firmas',
    timestamps: false,
  });

  return MetadatoFirma;
};
