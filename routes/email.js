const { Router } = require("express");
const { postEmail } = require("../controller/email");

const routerEmail = Router()

routerEmail.get('/send', postEmail)

module.exports = routerEmail