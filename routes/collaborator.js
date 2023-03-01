const { Router } = require("express");
const { getCollaborator, saveCollaborator, deleteCollaborator, updateCollaborator, getEditCollab } = require("../controller/collaborator");

const routerCollaborator = Router()

routerCollaborator.get('/collaborator', getCollaborator)
routerCollaborator.get('/editcollab/:id', getEditCollab)
routerCollaborator.post('/collaborator', saveCollaborator)
routerCollaborator.delete('/collaborator/:id', deleteCollaborator)
routerCollaborator.put('/collaborator/:id', updateCollaborator)


module.exports = routerCollaborator