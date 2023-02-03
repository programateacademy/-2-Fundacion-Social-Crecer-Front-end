const {Router} = require('express')
const { saveUser } = require('../controller/user')

const router = Router()

router.post('/', saveUser)

module.exports = router