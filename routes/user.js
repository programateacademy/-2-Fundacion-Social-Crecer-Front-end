const {Router} = require('express')
const { saveUser } = require('../controller/user')

const routerUser = Router()

routerUser.post('/user', saveUser)

module.exports = routerUser