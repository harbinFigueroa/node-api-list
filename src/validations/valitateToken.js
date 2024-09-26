const jwt = require('jsonwebtoken');
require('dotenv').config();


// funcion que recupera token y valida su autenticación, esto se colocará delante de las rutas protegidas
function verifyToken(req, res, next) {
    // tomamos el token de la request header
    const token = req.header('Authorization');

    // si no es enviado el token denegamos el acceso
    if (!token){
        return res.status(401).json({error: "Acceso denegado!"});
    }    
    try {
        // eliminamos el espacio y prefijo del token
        const validToken = token.split(" ")[1];
        // verificamos su validez
        const decoded = jwt.verify(validToken, process.env.SECRETKEY);
        
        req.userId = decoded.userId;
        next();

    } catch (error) {

        return res.status(401).json({error: "Token no válido!"});
        
    }
};

module.exports = verifyToken;