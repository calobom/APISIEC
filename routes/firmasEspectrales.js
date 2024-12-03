
const express = require('express');
const router = express.Router();
const db = require('../models');
const FirmaEspectral = db.FirmaEspectral;
const verifyToken = require('../middlewares/auth');


// Obtener todas las firmas
router.get('/firmas-espectrales', verifyToken, async (req, res) => {
    try {
        const firmas = await FirmaEspectral.findAll();
        res.json(firmas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Obtener firma por objectid
router.get('/firmas-espectrales/:objectid', verifyToken, async (req, res) => {
    const { objectid } = req.params;
    try {
        const firma = await FirmaEspectral.findByPk(objectid);
        if (!firma) {
            return res.status(404).json({ message: 'Firma espectral no encontrada' });
        }
        res.json(firma);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtener firma por codigo
router.get('/firmas-espectrales/codigo/:codigofirma', verifyToken, async (req, res) => {
    const { codigofirma } = req.params;
    try {
        const firma = await FirmaEspectral.findOne({ where: { codigofirma } });
        if (!firma) {
            return res.status(404).json({ message: 'Firma espectral no encontrada' });
        }
        res.json(firma);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtener firma por nombre de proyecto 
router.get('/firmas-espectrales/proyecto/:projectname', verifyToken, async (req, res) => {
    const { projectname } = req.params;
    try {
        const firmas = await FirmaEspectral.findAll({ where: { projectname } });
        if (firmas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron firmas para el proyecto especificado' });
        }
        res.json(firmas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Crear una nueva firma
router.post('/firmas-espectrales', verifyToken, async (req, res) => {
    try {
        const nuevaFirma = await FirmaEspectral.create(req.body);
        res.status(201).json(nuevaFirma);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Eliminar una firma  por objectid
router.delete('/firmas-espectrales/:objectid', verifyToken, async (req, res) => {
    const { objectid } = req.params;
    try {
        const deleted = await FirmaEspectral.destroy({ where: { objectid } });
        if (deleted === 0) {
            return res.status(404).json({ message: 'Firma espectral no encontrada' });
        }
        res.json({ message: `Firma espectral con ID ${objectid} eliminada correctamente` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// actualizar una firma por objectid
router.put('/firmas-espectrales/:objectid', verifyToken, async (req, res) => {
    const { objectid } = req.params;
    try {
        const [updated] = await FirmaEspectral.update(req.body, { where: { objectid } });
        if (updated === 0) {
            return res.status(404).json({ message: 'Firma espectral no encontrada' });
        }
        const updatedFirma = await FirmaEspectral.findByPk(objectid);
        res.json(updatedFirma);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;