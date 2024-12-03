require('dotenv').config();

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const db = require('./models');
const authRoutes = require('./routes/auth');
const valoresDominioRoutes = require('./routes/valoresDominio');
const metadatosFirmasRoutes = require('./routes/metadatosFirmas');
const firmasRoutes = require('./routes/firmasEspectrales');
const archivoRoutes = require('./routes/archivoRoutes');
const verifyToken = require('./middlewares/auth');
const path = require('path'); 

const app = express();

// Configuración de multer para almacenar archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Carpeta donde se almacenarán los archivos
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para evitar conflictos
    }
});

const upload = multer({ storage: storage });



// Habilita CORS para todas las solicitudes
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const uploadPath = path.join(__dirname, process.env.FILE_UPLOAD_PATH || 'uploads');
app.use('/uploads', express.static(uploadPath));


// Rutas
app.use('/auth', authRoutes);
app.use('/api', valoresDominioRoutes);
app.use('/', metadatosFirmasRoutes);
app.use('/', firmasRoutes);
app.use('/api', archivoRoutes);

// Listado de proyectos
app.get('/proyectos', verifyToken, async (req, res) => {
    const proyectos = await db.Proyecto.findAll();
    res.json(proyectos);
});


// Metodo para obtener campañas de un proyecto específico
app.get('/proyectos/:id_proyecto/campanas', verifyToken, async (req, res) => {
    const { id_proyecto } = req.params;

    try {
        const campanas = await db.Campana.findAll({
            where: { id_proyecto }
        });

        if (campanas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron campañas para este proyecto' });
        }

        res.json(campanas);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Método para obtener todas las campañas
app.get('/campanas', verifyToken, async (req, res) => {
    try {
        const campanas = await db.Campana.findAll();

        if (campanas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron campañas' });
        }

        res.json(campanas);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});


// Metodo para obtener todos los instrumentos
app.get('/instrumentos', verifyToken, async (req, res) => {
    try {
        const instrumentos = await db.Instrumento.findAll();

        if (instrumentos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron instrumentos' });
        }
        res.json(instrumentos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los instrumentos' });
    }
});

// Conectar a la base de datos y arrancar el servidor
db.sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Servidor escuchando en el puerto 3000');
    });
});
