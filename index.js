const express = require("express")
const dotEnv = require('dotenv')
const app = express()
const port = 5000
dotEnv.config()
const cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.listen(port, _ => {
    console.log(`Server running in port ${port}`)
})

