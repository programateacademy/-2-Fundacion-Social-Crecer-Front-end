const { sign } = require("jsonwebtoken");
const User = require("../models/User");

const getUser = async (req, res) => await User.find()


const saveUser = async (req, res) => {
   console.log(req.body)
   try {
      const { body } = req
      const user = new User(body)
      const usersave = await user.save()
      return res.status(200).json(usersave)

   } catch (error) {
      console.log(error)
      return res.status(400).json({
         msg: `Error: ${error.message}`
      })
   }
}

const updateUser = async (req, res) => await User.findByIdAndUpdate(id)

const deleteUser = async (req, res) => await User.deleteById(req.params.id)


const logInUser = async (req, res) => {
   try {
      const { body: { email, password } } = req
      userLogIn = await User.findOne({ $and: [{email},{password}] })
      if(userLogIn.length == 0){
         return res.status(400).json({
            msg: "Correo o contraseña incorrectos"
         })
      }
      const token = sign({
         email: userLogIn.email,
         role: userLogIn.role
      }, process.env.JWT_SECRET)

      return res.status(200).json({token})
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
}