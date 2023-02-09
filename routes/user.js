const {Router} = require('express')
const { saveUser, getUser,logInUser } = require('../controller/user')

const routerUser = Router()

routerUser.get('/api/user', getUser)

routerUser.post('/user', saveUser)
routerUser.post('/login', logInUser)




module.exports = routerUser