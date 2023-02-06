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

}

module.exports ={
   getUser,
   saveUser,
   updateUser,
   deleteUser,
   logInUser,
}