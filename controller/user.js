const { sign } = require("jsonwebtoken");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const { hash, compare, compareSync } = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const getUser = async (req, res) => {
  try {
    const user = await User.find({});
    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const saveUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    // Comprobar si el correo electrónico ya está registrado
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ error: "Email ya está registrado" });
    }
    // Encriptar la contraseña
    const pass = await hash(password, 10);
    const newUser = new User({
      email,
      password: pass,
      role,
    });
    const savedU = await newUser.save();
    return res.status(200).json({ savedU });
  } catch (error) {
    return res.status(400).send({ error: "Error: " + error });
  }
};

const updateStrikes = async (req, res) => {
  const { email } = req.body;
  try {
    const person = await User.findOne({
      email,
    });

    await User.findByIdAndUpdate(person._id, {
      $set: {
         strikes: person.strikes+1
       }
    });
    return res.status(200).json({msg: "strikes Update"})
  } catch (error) {
   return res.status(400).json({
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  const { data, token } = req.body;
  try {
    const password = await hash(data.password, 10);
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const iduser = payload.id;

    await User.findByIdAndUpdate(iduser, {
      $set: {
        password,
      },
    });
    return res.status(200).json({
      msg: "user updated",
    });
  } catch (error) {
   return res.status(400).json({
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      msg: "user deleted",
    });
  } catch (error) {
   return res.status(400).json({
      error: error.message,
    });
  }
};

const senLinkPassword = (req, res) => {
  const { id } = req.body;

  function generartoken(id) {
    //const expira = Math.floor(Date.now() / 1000) + (60 * 60 * 24)
    const token = sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return token;
  }

  const token = generartoken(id);
  const enlace = `http://localhost:3000/reset/${token}`;

  const contenidoCorreo = `
      <p>Hola,</p>
      <p>Dando click en el siguiente enlace podras reestablecer tu contraseña</p>
      <p><a href=${enlace}>Enlace de reestablecer contraseña</a></p>
   `;

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "river90@ethereal.email",
      pass: "zgh1qay8qG6SUME6br",
    },
  });

  let mailOptions = {
    from: "dericksaa@gmail.com",
    to: "dmsaao@unal.edu.co",
    subject: "ya solo falta el de verdad",
    html: contenidoCorreo,
    attachments: [
      {
        filename: "enlace.txt",
        content: enlace,
      },
    ],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Correo enviado: " + info.response);
      console.log(
        "URL de la vista previa: " + nodemailer.getTestMessageUrl(info)
      );
    }
  });

  try {
   return res.status(200).json({ msg: "correo contra enviado con exito" });
  } catch (error) {
   return res.status(400).json(error);
  }
};

const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLogIn = await User.findOne({ email });
    if( userLogIn.strikes === 3){
      return res.status(401).json ({
         error: "Usuario Bloqueado",
         locked:true
       });
      
    }
    const pass = await compareSync(password, userLogIn.password);
    if (!pass || userLogIn.length == 0) {
      return res.status(404).json({
        error: "Correo o contraseña incorrectos",
      });
    }

    const token = sign(
      {
        email: userLogIn.email,
        role: userLogIn.role,
      },
      process.env.JWT_SECRET
    );

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(404).json({
      error: error.message,
    });
  }
};

module.exports = {
  getUser,
  saveUser,
  updateUser,
  deleteUser,
  logInUser,
  senLinkPassword,
  updateStrikes,
};
