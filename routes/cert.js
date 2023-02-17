const { Router } = require("express");
const { getPdf, generatePdf, downloadPdf } = require("../controller/cert");


const routerUpload = Router()

routerUpload.get('/cert', getPdf)
routerUpload.get('/cert/download', downloadPdf)
routerUpload.post('/cert', generatePdf)

module.exports = routerUpload