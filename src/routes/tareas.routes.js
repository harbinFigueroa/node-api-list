const express = require('express');
const { getAllTask, createNote, editNote, deleteNote, getOneTask  } = require('../controller/notesController');
const { registerUser, loginUser } = require('../controller/userController');
const { validateRegister, validateLogin } = require('../validations/userValidations');
const verifyToken = require('../validations/valitateToken');

const router = express.Router();


// rutas user
router.post('/register',validateRegister , registerUser );
router.post('/login', validateLogin, loginUser );

// rutas CRUD (verificamos el token autenticado antes de acceder a las rutas)
router.get('/notas', verifyToken, getAllTask);
router.get('/nota/:id', verifyToken, getOneTask);
router.post('/nota', verifyToken, createNote);
router.put('/nota/:id', verifyToken, editNote);
router.delete('/nota/:id', verifyToken, deleteNote);




module.exports = router;