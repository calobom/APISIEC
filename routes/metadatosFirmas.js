
const express = require('express');
const router = express.Router();
const db = require('../models');
const MetadatoFirma = db.MetadatoFirma;
const verifyToken = require('../middlewares/auth');

// Obtener todos los metadatos
router.get('/metadatos-firmas', verifyToken, async (req, res) => {
    try {
        const metadatos = await MetadatoFirma.findAll();
        res.json(metadatos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtener un metadato por ID
router.get('/metadatos-firmas/:id_metadato', verifyToken, async (req, res) => {
    const { id_metadato } = req.params;
    try {
        const metadato = await MetadatoFirma.findByPk(id_metadato);
        if (!metadato) {
            return res.status(404).json({ message: 'Metadato no encontrado' });
        }
        res.json(metadato);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtener un metadato por código de firma
router.get('/metadatos-firmas/codigo/:codigo_firma', verifyToken, async (req, res) => {
    const { codigo_firma } = req.params;
    try {
        const metadato = await MetadatoFirma.findOne({
            where: { codigo_firma }
        });

        if (!metadato) {
            return res.status(404).json({ message: 'Metadato no encontrado' });
        }

        res.json(metadato);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Crear un nuevo metadato
router.post('/metadatos-firmas/crearmetadato', verifyToken, async (req, res) => {
    try {
        const nuevoMetadato = await MetadatoFirma.create(req.body);
        res.status(201).json(nuevoMetadato);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Actualizar un metadato por ID
router.put('/metadatos-firmas/actualizar/:id_metadato', verifyToken, async (req, res) => {
    const { id_metadato } = req.params;
    try {
        const [updated] = await MetadatoFirma.update(req.body, {
            where: { id_metadato }
        });

        if (!updated) {
            return res.status(404).json({ message: 'Metadato no encontrado' });
        }

        const metadatoActualizado = await MetadatoFirma.findByPk(id_metadato);
        res.json(metadatoActualizado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




// Eliminar un metadato por ID
router.delete('/metadatos-firmas/eliminar/:id_metadato', verifyToken, async (req, res) => {
    const { id_metadato } = req.params;
    try {
        const deleted = await MetadatoFirma.destroy({
            where: { id_metadato }
        });

        if (!deleted) {
            return res.status(404).json({ message: 'Metadato no encontrado' });
        }

  
        res.status(200).json({ message: `Eliminado correctamente el id_metadato ${id_metadato}` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
