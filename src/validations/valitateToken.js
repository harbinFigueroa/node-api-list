const jwt = require('jsonwebtoken');
require('dotenv').config();


// funcion que recupera token y valida su autenticación, esto se colocará delante de las rutas protegidas
function verifyToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token){
        return res.status(401).json({error: "Acceso denegado!"});
    }    
    try {
        
        const validToken = token.split(" ")[1];

        const decoded = jwt.verify(validToken, process.env.SECRETKEY);

        req.userId = decoded.userId;
        next();

    } catch (error) {

        return res.status(401).json({error: "Token no válido!"});
        
    }
};

module.exports = verifyToken;