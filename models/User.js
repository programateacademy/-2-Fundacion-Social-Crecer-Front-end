const { Schema, model } = require("mongoose")



const UserSchema = new Schema({
      email: {
         type: String,
         required: [true, "El correo es necesario"]
      },
      password: {
         type: String,
         required: [true, "La contraseña es obligatoria"]
      },
      role: {
         type: String,
         default: 'USER',
      }
   },
   {
      versionKey: false,
   });


module.exports = model("User", UserSchema)