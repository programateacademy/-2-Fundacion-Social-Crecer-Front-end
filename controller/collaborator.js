const Collaborator = require("../models/Collaborator");

const getCollaborator = async (req, res) => await Collaborator.find()

const saveCollaborator = async (req, res) => {
    const collaborator = new Collaborator(req.body)
    return await Collaborator.save()
}

const deleteCollaborator = async (req, res) => await Collaborator.findByIdAndDelete(req.params.id)

const updateCollaborator = async (req, res) => await Collaborator.findByIdAndUpdate(req.params.id, req.body,{new:true})

module.exports = {
    getCollaborator,
    saveCollaborator,
    deleteCollaborator,
    updateCollaborator,
}