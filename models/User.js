const {Schema, model} = require("mongoose")
const bcrypt = require("bcryptjs")


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
}
);
//los statics son formas de llamar metodos estaticos
UserSchema.statics.encryptPassword = async (password) => {
//metodo para aplicar un algoritmo especificando el recorrido
const salt = await bcrypt.genSalt(10)
//retornamos una contraseña ya cifrada, el metodo hash
return await bcrypt.hash(password, salt)
}




//nueva contraseña que el usuario quiere comparar para ver si es falsa o no
UserSchema.statics.comparePassword = async (password, receivePassword) => {
   //retorna un booleano si conincide:true si no: false
   return await bcrypt.compare(password, receivePassword)
}

module.exports = model("User", UserSchema)