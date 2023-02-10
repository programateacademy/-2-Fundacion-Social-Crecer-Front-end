const {Schema, model} = require('mongoose')

const CollaboratorSchema = Schema({
    document:{
        type: Number,
        required: true,
    },
    fName:{
        type: String,
        required: true,
    },
    sName:{
        type: String,
        default:''
    },
    fLastName:{
        type: String,
        required: true,
    },
    sLastName:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
    contract:{
        type: String,
        required: true,
    },
    campus:{   // es la sede o lugar de trabajo 
        type: String,
        required:true,
    },
    birthdate:{
        type: Date,
        required: true,
    },
    position:{
        type: String,
        required: true, 
    },
    state:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    transit:{ 
        type: String,
        required: true,
    },
    PS:{
        type: Number,
        default:''
    },
    OYL:{
        type: Number,
        default:''
    },
    ICBF:{
        type: Number,
        required: true,
    },
    gen:{
        type: String,
        required: true
    },
    dateECedula:{
        type: Date,
        required: true,
    },
    locality:{
        type: String,
        required: true,
    },
    neighborhood:{
        type: String,
        required: true,
    },
    adress:{
        type: String,
        required: true,
    },
    telP:{
        type: Number,
        required: true,
    },
    telS:{ // no se requiere estrictamente 
        type: Number,
        default:''
    },
    salaryL:{
        type: String,
        required: true,
    },
    salaryN:{
        type: Number,
        required: true,
    },
    dateIICBF:{
        type: Date,
        required: true,
    },
    dateIFSC:{
        type: Date,
        required: true,
    },
    newDateI:{ 
        type: Date,
        default:''
    },
    dateR:{
        type: Date,
        default:''
    },
    EPS:{
        type: String,
        required: true,
    },
    FDP:{
        type: String,
        default: 'N/A'
    },
    ARL:{
        type: String,
        default: 'N/A'
    },
    obs:{ 
        type: String,
        default:''
    },
},{
    versionKey: false,
})

module.exports = model('Collaborator', CollaboratorSchema)