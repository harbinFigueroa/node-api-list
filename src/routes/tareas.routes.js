const express = require('express');
const { getAllTask, createNote, editNote, deleteNote, getOneTask  } = require('../controller/notesController');
const { registerUser, loginUser } = require('../controller/userController');
const { validateRegister, validateLogin } = require('../validations/userValidations');
const router = express.Router();


// rutas user
router.post('/register',validateRegister , registerUser );
router.post('/login', validateLogin, loginUser );

// rutas CRUD
router.get('/notas', getAllTask);
router.get('/nota/:id', getOneTask);
router.post('/nota', createNote);
router.put('/nota/:id', editNote);
router.delete('/nota/:id', deleteNote);


module.exports = router;