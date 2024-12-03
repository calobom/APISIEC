const express = require('express');
const router = express.Router();
const db = require('../models');
const ValoresDominio = db.ValoresDominio;
const verifyToken = require('../middlewares/auth'); // Importar el middleware

// Ruta para obtener todos los valores de dominio
router.get('/valores-dominio', verifyToken, async (req, res) => { // Añadir verifyToken como middleware
    try {
        const valores = await ValoresDominio.findAll();
        res.json(valores);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ruta para obtener valores de dominio por tipo_dominio
router.get('/valores-dominio/:tipo_dominio', verifyToken, async (req, res) => {
    const { tipo_dominio } = req.params;
    
    try {
        const valores = await ValoresDominio.findAll({
            where: { tipo_dominio },
            attributes: ['valor_dominio', 'descripcion_valor', 'id_valor_dom_padre', ]
        });

        if (valores.length === 0) {
            return res.status(404).json({ message: 'No se encontraron valores para este tipo de dominio' });
        }

        res.json(valores);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ruta para obtener valores de dominio por ID del dominio padre
router.get('/valores-dominio/padre/:id_valor_dom_padre', verifyToken, async (req, res) => {
    const { id_valor_dom_padre } = req.params;
    
    try {
        const valores = await ValoresDominio.findAll({
            where: { id_valor_dom_padre },
            attributes: ['valor_dominio', 'descripcion_valor', 'tipo_dominio', 'id_valor_dom_padre']
        });

        if (valores.length === 0) {
            return res.status(404).json({ message: 'No se encontraron valores para este ID de dominio padre' });
        }

        res.json(valores);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
