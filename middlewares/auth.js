
const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
    // Extraer el token del encabezado Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extraer el token después de 'Bearer '

    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Usar una variable de entorno para la clave secreta
        req.userId = decoded.id_usuario;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token no válido' });
    }
};

module.exports = verifyToken;
