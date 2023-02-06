const express = require("express")
const dotEnv = require('dotenv')
const app = express()
const port = 5000
dotEnv.config()
const cors = require('cors')
const routerUser = require("./routes/user")
const conn = require("./db/connection")
const routerCollaborator = require("./routes/collaborator")

conn()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api',routerUser )
app.use('/api',routerCollaborator )

app.listen(port, _ => {
    console.log(`Server running in port ${port}`)
})



