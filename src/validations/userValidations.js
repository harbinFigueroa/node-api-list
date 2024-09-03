const { body, validationResult } = require('express-validator');

const  validateRegister = [
    body('username')
        .not()
        .isEmpty()
        .trim()
        .isLength({ min: 3 })
        .withMessage('Este campo no puede estar vacío, 3 caracteres mínimo requeridos.'),
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('No es un email válido'),
    body('password')
        .not()
        .isEmpty()
        .isLength({ min: 7 })
        .withMessage('Este campo no puede estar vacío, debe tener al menos 7 caracteres'),
        (req, res, next) => {
            validateResult(req, res, next)
        }
];

const validateLogin = [
    body('username')
    .not()
    .isEmpty()
    .trim()
    .withMessage('Este campo no puede estar vacío.'),
body('password')
    .not()
    .isEmpty()
    .isLength({ min: 7 })
    .withMessage('Este campo no puede estar vacío.'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];


const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
        
    } catch (errors) {
        res.status(403)
        res.send({errors: errors.array()})
        
    }
}

module.exports = { validateRegister, validateLogin }