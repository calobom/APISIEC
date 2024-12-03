const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../models');
const verifyToken = require('../middlewares/auth');

// Configuración de multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Carpeta para almacenar archivos
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único
    }
});

const upload = multer({ storage: storage });

// Ruta para cargar archivos y registrar en la base de datos
router.post('/upload', verifyToken, upload.single('file'), async (req, res) => {
    try {
        // Información del archivo desde el cuerpo de la solicitud
        const { objectid, numero_archivo, id_tipo_archivo } = req.body;
        const { filename, path: filePath } = req.file;

        // Crear registro en la base de datos
        const newFile = await db.Archivo.create({
            objectid,
            fecha_archivo: new Date(), // Ajusta la fecha según tus necesidades
            numero_archivo,
            id_tipo_archivo,
            nombre_archivo: filename,
            ruta_archivo: filePath // Ruta del archivo en el servidor
        });

        return res.status(200).json({ message: 'Archivo cargado y registrado correctamente', file: newFile });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error al cargar el archivo' });
    }
});

module.exports = router;