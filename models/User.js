const {Schema, model} = require("mongoose")

const UserSchema = Schema({
   email: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
   role: {
      type: String,
      default: 'user',
   }
},
{
   versionKey: false,
}
)

module.exports = model("User", UserSchema)