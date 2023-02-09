const { Router } = require('express')
const { saveUser, logInUser } = require('../controller/user')

const routerUser = Router()

routerUser.post('/user', saveUser)
routerUser.post('/login', logInUser)

module.exports = routerUser