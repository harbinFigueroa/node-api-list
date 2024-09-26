const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { clientMailTrap, sender } = require('../mailtrap/mailtrap.config');
const { sendVerificationEmail } = require('../mailtrap/emails');
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

    // Send Validation Number
    const validationKey = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = await User({
        username: username,
        email: email,
        password: hashPassword,
        validationToken: validationKey
    }).save();
    
    console.log(newUser.email);  

    sendVerificationEmail(newUser.email, newUser.validationToken);
    

    if (!newUser) {

        return res.status(500).send({message: "Error al intentar crear este usuario, intente más tarde."});
    }

    res.status(201).send({message: "Nuevo usuario creado!"});
};

// Login, generar webtoken
const loginUser = async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({message: "Usuario no encontrado."});
    };   
   

    const match = await bcrypt.compare(password, user.password);    

    if(!match){        
       
        return res.status(301).json({message: "Usuario o contraseña incorrecto."});
    }

    if(user.validUser === false){

        return res.status(401).json({message: "Usuario no verificado, verifica tu email, hemos enviado un código para que puedas activar tu usuario."});

    } 

    const token = jwt.sign({
        "usuario": user.username,
        "email": user.email,
        "role": user.role
        }, process.env.SECRETKEY, {expiresIn: '1h'}); 

    res.status(200).send({token});   
   
}



module.exports = { registerUser, loginUser };