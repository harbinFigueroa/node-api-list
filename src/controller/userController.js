const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


//register new user controller
const registerUser = async (req, res) => {

    const {username, email, password} = req.body;

    const user = await User.findOne({username});
    const useremail = await User.findOne({email});
   
    if( user || useremail ){
        
        return res.status(300).send({message: "Exte usuario existe."});
    }

    const salt = Number(process.env.SALT);

    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = User({
        username: username,
        email: email,
        password: hashPassword
    }).save();

    if (!newUser) {

        return res.status(500).send({message: "Error al intentar crear este usuario, intente más tarde."});
    }

    res.status(201).send({message: "Nuevo usuario creado!"});
};

// Login, generar webtoken
const loginUser = async (req, res) => {

    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(401).json({message: "Usuario no encontrado."});
    };   
   

    const match = await bcrypt.compare(password, user.password);    

    if(!match){        
       
        return res.status(301).json({message: "Usuario o contraseña incorrectos."});

    }
    const token = jwt.sign({
        "usuario": user.username,
        "email": user.email,
        "role": user.role
        }, process.env.SECRETKEY, {expiresIn: '1h'}); 

    res.status(200).send({token});   
   
}



module.exports = { registerUser, loginUser };