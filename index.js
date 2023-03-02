const express = require("express")
const dotEnv = require('dotenv')
const app = express()
const port = process.env.PORT || 5000
dotEnv.config()
const cors = require('cors')
const routerUser = require("./routes/user")
const conn = require("./db/connection")
const routerCollaborator = require("./routes/collaborator")
const bodyParser = require('body-parser')
const routerUpload = require("./routes/cert")
const routerEmail = require("./routes/email")


conn()

app.use(cors())

app.use(bodyParser.json({ limit: '5mb' }))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api',routerUser )
app.use('/api',routerCollaborator )
app.use('/api',routerUpload )
app.use('/api',routerEmail)

app.listen(port, _ => {
    console.log(`Server running in port ${port}`)
})

module.exports = app



