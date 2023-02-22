const { Router } = require("express");
const { postEmail } = require("../controller/email");

const routerEmail = Router()

routerEmail.post('/send', postEmail)

module.exports = routerEmail