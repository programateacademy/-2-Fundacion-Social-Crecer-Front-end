const { sign } = require("jsonwebtoken");
const User = require("../models/User");
const { hash, compare, compareSync } = require("bcrypt");
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const getUser = async (req, res) => {
   try {
      const user = await User.find({})
      return res.status(200).send(user)
   } catch (error) {
      return res.status(400).send(error)
   }
}



const saveUser = async (req, res) => {
   const { email, password, role } = req.body;
   try {
      // Comprobar si el correo electrónico ya está registrado
      const user = await User.findOne({ email });
      if (user) {
         return res.status(400).send({ error: "Email ya está registrado" });
      }
      // Encriptar la contraseña
      const pass = await hash(password, 10)
      const newUser = new User({
         email,
         password: pass,
         role
      })
      const savedU = await newUser.save();
      return res.status(200).json({ savedU });
   } catch (error) {
      return res.status(400).send({ error: "Error: " + error });
   }


}

const updateUser = async (req, res) => {
   const { data, token } = req.body;
   console.log(token)
   const password = data.password
   const payload = jwt.verify(token, '12345')
   const iduser = payload.id


   await User.findByIdAndUpdate(iduser, {
      password
   })
};


const deleteUser = async (req, res) => await User.deleteById(req.params.id)

const senLinkPassword = (req, res) => {
   const { id } = req.body

   function generartoken(id) {
      const expira = Math.floor(Date.now() / 1000) + (60 * 60 * 24)
      const token = sign({id}, '12345', {expiresIn:'1d'})
      return token
   }

   const token = generartoken(id)
   const enlace = `http://localhost:3000/reset/${token}`

   const contenidoCorreo = `
      <p>Hola,</p>
      <p>Dando click en el siguiente enlace podras reestablecer tu contraseña</p>
      <p><a href=${enlace}>Enlace de reestablecer contraseña</a></p>
   `;


   const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
         user: 'river90@ethereal.email',
         pass: 'zgh1qay8qG6SUME6br'
      }
   });


   let mailOptions = {
      from: 'dericksaa@gmail.com',
      to: 'dmsaao@unal.edu.co',
      subject: 'ya solo falta el de verdad',
      html: contenidoCorreo,
      attachments: [
         {
            filename: 'enlace.txt',
            content: enlace,
         }
      ]
   };

   transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
         console.log(error);
      } else {
         console.log('Correo enviado: ' + info.response);
         console.log('URL de la vista previa: ' + nodemailer.getTestMessageUrl(info));
      }
   });



   try {
      res.status(200).json({ msg: 'correo contra enviado con exito' })
   } catch (error) {
      res.status(400).json(error)
   }

}


const logInUser = async (req, res) => {
   try {
      const { email, password } = req.body
      const userLogIn = await User.findOne({ email })
      const pass = await compareSync(password, userLogIn.password)
      if(!pass || userLogIn.length == 0){
         return res.status(404).json({
            error: "Correo o contraseña incorrectos"
         })
      }
      
      const token = sign({
         email: userLogIn.email,
         role: userLogIn.role
      }, process.env.JWT_SECRET)

      return res.status(200).json({ token })
   } catch (error) {
      return res.status(404).json({
         error: error.message
      })
   }

}

module.exports = {
   getUser,
   saveUser,
   updateUser,
   deleteUser,
   logInUser,
   senLinkPassword
}
