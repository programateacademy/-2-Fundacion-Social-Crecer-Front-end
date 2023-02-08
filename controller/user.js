const User = require("../models/User");
const jwt = require("jsonwebtoken");

const getUser = async (req, res) => await User.find()



const saveUser = async (req, res) => {

   const { email, password, role } = req.body;
   // Validar el formato del correo electrónico
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send({ error: 'Email inválido' });
  }
   // Comprobar si el correo electrónico ya está registrado
   const user = await User.findOne({ email });
   if (user) {
     return res.status(400).send({ error: 'Email ya está registrado' });
   }

   const newUser = new User({
      email,
      password: await User.encryptPassword(password),
      role
   })
   const savedU = await newUser.save();
   console.log(newUser);
  //usamos el metodo para crear el token y le pasamos los parametros que utilizará para crear el token
  //palabra secreta, se recomienda crear un archivo config donde se exporte un objeto llamado SECRET: 'palabra' y se importa ese archivo y se usa config.SECRET en vez de lo que esta entre comillas simples
   const token = jwt.sign({id: savedU._id}, 'user.api', {
      expiresIn: 86400 //24h
   })

   res.status(200).json({token})
}

const updateUser = async (req, res) => await User.findByIdAndUpdate(id)

const deleteUser = async (req, res) => await User.deleteById(req.params.id)


const logInUser = async (req, res) => {

}

module.exports = {
   getUser,
   saveUser,
   updateUser,
   deleteUser,
   logInUser,
}