const {Schema, model} = require('mongoose')

const CollaboratorSchema = Schema({
    document:{
        type: Number,
        require: true,
    },
    name:{
        type: String,
        require: true,
    },
    lastName:{
        type: String,
        require: true,
    },
    age:{
        type: Number,
        require: true,
    },
    contract:{
        type: String,
        require: true,
    },
    campus:{   // es la sede
        type: String,
        default: 'Bogotá',
    },
    date:{
        type: Date,
        require: true,
    },
    position:{
        type: String,
        require: true, 
    },
    state:{
        type: String,
        default: 'Activo',
    },
    email:{
        type: String,
        require: true,
    },
    phone:{
        type: Number,
        require: true,
    },
},{
    versionKey: false,
})

module.exports = model('Collaborator', CollaboratorSchema)