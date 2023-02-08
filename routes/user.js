const {Router} = require('express')
const { saveUser, getUser } = require('../controller/user')
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const routerUser = Router()

routerUser.get('/api/user', getUser)

routerUser.post('/user', saveUser)






/*
routerUser.post('/user', async (req, res) => {
      const { email, password } = req.body;
      // Verifica que el usuario no exista
      User.findOne({ email }, ( user) => {
        if (user) {
          return res.status(400).json({
            error: "El correo ya existe"
          });
        }
        // Si no existe, procede a encriptar la contraseña y guardar el usuario en la base de datos
         // Encripta la contraseña
         const saltRounds = 10;
         const token = jwt.sign({ email, password, role }, saltRounds);
         // Guarda el usuario en la base de datos
         const newUser = new User({
           username,
           password: token,
           role
         });
         newUser.save((err) => {
           if (err) {
             return res.status(400).json({
               error: "Error al guardar el usuario en la base de datos"
             });
           }
           res.json(saveUser);
         });
      });
      
  
})*/

module.exports = routerUser