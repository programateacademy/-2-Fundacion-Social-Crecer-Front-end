const {Schema, model} = required('mongoose')

const CollaboratorSchema = Schema({
    document:{
        type: Number,
        required: true,
    },
    primerNombre:{
        type: String,
        required: true,
    },
    segundoNombre:{
        type: String,
        default:''
    },
    primerApellido:{
        type: String,
        required: true,
    },
    segundoApellido:{
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
    phone:{
        type: Number,
        required: true,
    },
    transit:{ 
        type: String,
        required: true,
    },
    consecutivoPS:{
        type: Number,
        default:''
    },
    consecutivoOYL:{
        type: Number,
        default:''
    },
    contratoICBF:{
        type: Number,
        required: true,
    },
    genero:{
        type: String,
        required: true
    },
    FechaExpedicionCedula:{
        type: Date,
        required: true,
    },
    Localidad:{
        type: String,
        required: true,
    },
    Barrio:{
        type: String,
        required: true,
    },
    direccion:{
        type: String,
        required: true,
    },
    telefonoPrincipal:{
        type: Number,
        required: true,
    },
    telefonoSecundario:{ // no se requiere estrictamente 
        type: Number,
        default:''
    },
    SalarioLetras:{
        type: String,
        required: true,
    },
    SalarioNumeros:{
        type: Number,
        required: true,
    },
    fechaInicioICBF:{
        type: Date,
        required: true,
    },
    fechaInicioFSC:{
        type: Date,
        required: true,
    },
    NuevaFechaDeInicio:{ 
        type: Date,
        default:''
    },
    fechaRetiro:{
        type: Date,
        default:''
    },
    EPS:{
        type: String,
        required: true,
    },
    fondoDePensiones:{
        type: String,
        default: 'N/A'
    },
    ARL:{
        type: String,
        default: 'N/A'
    },
    Observaciones:{ 
        type: String,
        default:''
    },
},{
    versionKey: false,
})

module.exports = model('Collaborator', CollaboratorSchema)