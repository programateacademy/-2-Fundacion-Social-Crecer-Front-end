const express = require("express")
const dotEnv = require('dotenv')
const app = express()
const port = 5000
dotEnv.config()
const cors = require('cors')
const routerUser = require("./routes/user")
const conn = require("./db/connection")
const routerCollaborator = require("./routes/collaborator")
const rawBody = require('raw-body')
const bodyParser = require('body-parser')
const routerUpload = require("./routes/cert")

conn()

app.use(cors())

app.use(bodyParser.json({ limit: '5mb' }))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api',routerUser )
app.use('/api',routerCollaborator )
app.use('/api',routerUpload )

app.listen(port, _ => {
    console.log(`Server running in port ${port}`)
})



