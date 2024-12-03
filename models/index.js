const { Sequelize } = require('sequelize');

// Configura la conexión a PostgreSQL
const sequelize = new Sequelize('bdfirmas', 'appfirmas', 'appfirmas24.*', {
    host: '172.19.3.49',
    dialect: 'postgres',
    logging: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Usuario = require('./usuario')(sequelize, Sequelize); 
db.Proyecto = require('./proyecto')(sequelize, Sequelize);
db.Campana = require('./campana')(sequelize, Sequelize);
db.Instrumento = require('./instrumento')(sequelize, Sequelize);
db.ValoresDominio = require('./valores_dominio')(sequelize, Sequelize);
db.MetadatoFirma = require('./MetadatoFirma')(sequelize, Sequelize);
db.FirmaEspectral = require('./FirmaEspectral')(sequelize, Sequelize);
db.Archivo = require('./archivo')(sequelize, Sequelize);

// Configurar asociaciones
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;
