const {Schema, model} = require('mongoose')

const CollaboratorSchema = Schema({
    document:{
        type: String,
        
    },
    fName:{
        type: String,
        
    },
    sName:{
        type: String,
        default:''
    },
    fLastName:{
        type: String,
        
    },
    sLastName:{
        type: String,
        default:''
    },
    age:Number,
    contract:{
        type: String,
        
    },
    modality:{
        type: String,
        
    },
    campus:{   // es la sede o lugar de trabajo 
        type: String,
    },
    birthdate:{
        type: String,
        
    },
    position:{
        type: String,

    },
    state:{
        type: String,
        
    },
    email:{
        type: String,
        
    },
    transit:{ 
        type: String,
        
    },
    PS:Number,
    OYL:Number,
    ICBF:{
        type: String,
        
    },
    gen:{
        type: String,

    },
    dateECedula:{
        type: String,
        
    },
    locality:{
        type: String,
        
    },
    neighborhood:{
        type: String,
        
    },
    adress:{
        type: String,
        
    },
    telP:{
        type: Number,
        
    },
    telS:{ // no se requiere estrictamente 
        type: Number,
        default:''
    },
    salaryL:{
        type: String,
        
    },
    salaryN:{
        type: String,
        
    },
    dateIICBF:{
        type: String,
        
    },
    dateIFSC:{
        type: String,
        
    },
    newDateI:{ 
        type: String,
        default:''
    },
    dateR:{
        type: String,
        default:''
    },
    EPS:{
        type: String,
        
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