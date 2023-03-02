const { Router } = require('express')
const { saveUser, logInUser, getUser, senLinkPassword, updateUser, deleteUser, updateStrikes, recoveryAdmin } = require('../controller/user')
const { body, validationResult } = require('express-validator');

const routerUser = Router();

routerUser.get('/user', getUser)

routerUser.post('/change', senLinkPassword)

routerUser.post('/recovadmin', recoveryAdmin)

routerUser.post('/verify', updateUser)

routerUser.put('/strikes', updateStrikes)

routerUser.post('/user',
    [
        body('email')
            .trim()
            .isEmail()
            .withMessage('Por favor introduzca un email valido')
            .normalizeEmail()
            .toLowerCase(),
        body('password')
            .trim()
            .isLength(8)
            .withMessage('La contraseña requiere min 8 caracteres'),
        (req, res) => {
            let errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.json({ errors: errors.array() })
            }
            saveUser(req,res)
        }
    ]
    /* saveUser */)

routerUser.post('/login',
    [
        body('email')
            .trim()
            .isEmail()
            .normalizeEmail()
            .toLowerCase(),
        body('password')
            .trim()
            .isLength(8),
        (req, res) => {
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({ errors: errors.array() })
            }
            logInUser(req, res)
        }


    ]/* ,
    logInUser, */

)

routerUser.delete("/user/:id", deleteUser)


module.exports = routerUser
