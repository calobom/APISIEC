const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); 
const db = require('../models');
const verifyToken = require('../middlewares/auth');
const Usuario = db.Usuario;

const router = express.Router();

// Función para encriptar usando SHA-256
function getSHA256(str) {
    return crypto.createHash('sha256').update(str).digest('hex');
}

// Función para crear tokens
function createAccessToken(user) {
    return jwt.sign(
        { id_usuario: user.id_usuario, nombreusuario: user.nombreusuario },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }  // Token válido por 12 horas
    );
}

function createRefreshToken(user) {
    return jwt.sign(
        { id_usuario: user.id_usuario },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }  // Refresh token válido por 7 días
    );
}

// Función para calcular la expiración en días
function calculateExpireInDays(expInSeconds) {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const remainingTimeInSeconds = expInSeconds - currentTimeInSeconds;
    if (remainingTimeInSeconds <= 0) {
        return 0; // Retornar 0 si el token ya ha expirado
    }
    //const daysRemaining = remainingTimeInSeconds / (60 * 60 * 24); // Convertir segundos a días
    //return Math.floor(daysRemaining).toFixed(2); // Devolver la cantidad de días redondeada

    return Math.floor(remainingTimeInSeconds / (60 * 60 * 24));
}

// Endpoint para login
router.post('/login', async (req, res) => {
    const { nombreusuario, contrasena } = req.body;

    try {
        // Buscar usuario por nombre de usuario
        const user = await Usuario.findOne({ where: { nombreusuario } });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Encriptar la contraseña recibida y compararla con la almacenada
        const hashedPassword = getSHA256(contrasena);
        if (hashedPassword !== user.contrasena) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Crear tokens
        const accessToken = createAccessToken(user);
        const refreshToken = createRefreshToken(user);

       // Obtener el tiempo de expiración en días
        const decoded = jwt.decode(accessToken);
        const expireInDays  =  calculateExpireInDays(decoded.exp);

        // Devolver los tokens y la información del usuario
        return res.json({
            token: accessToken,
            refreshToken: refreshToken,
            expireInDays,
            user: { id_usuario: user.id_usuario, nombreusuario: user.nombreusuario }
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Endpoint para refrescar el token
router.post('/refresh-token', (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(403).json({ message: 'Refresh token requerido' });
    }

    try {
        // Verificar el refresh token
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Refresh token inválido' });
            }

            // Si el token es válido, generar un nuevo access token
            const newAccessToken = createAccessToken(user);

           // Obtener el tiempo de expiración en días
            const decoded = jwt.decode(newAccessToken);
            const expireInDays = calculateExpireInDays(decoded.exp);

            return res.json({
                token: newAccessToken,
                expireInDays
            });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Endpoint información de usuario
router.get('/usuario/:id_usuario', verifyToken, async (req, res) => {
    const { id_usuario } = req.params;

    try {
        // Buscar el usuario por su ID
        const user = await db.Usuario.findOne({
            where: { id_usuario },
            attributes: ['nombre', 'apellido', 'correo', 'nombreusuario'] // Seleccionar solo los campos deseados
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Devolver la información del usuario
        return res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router;
