const Collaborator = require("../models/Collaborator");

const getCollaborator = async (req, res) => {
    try {
        const collaborator = await Collaborator.find({})
        return res.send(collaborator)
    } catch (error) {
        return res.status(400).send(error)
    }
} 

const saveCollaborator = async (req, res) => {
    try {
        const collaborator = new Collaborator(req.body)
        return await collaborator.save()
    } catch (error) {
        return res.status(400).json({
            msg: `Error: ${error.message}`
        })
    }
    
}

const deleteCollaborator = async (req, res) => {
    try {
        const collaborator = await Collaborator.findByIdAndDelete(req.params.id)
        if(!collaborator)return res.status(404)
        return res.send(collaborator)
    } catch (error) {
        return res.status(400).send(error)
    }
}

const updateCollaborator = async (req, res) => {
    try {
        const collaborator = await Collaborator.findByIdAndUpdate(req.params.id, req.body,{new:true})
        return res.send(collaborator)
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports = {
    getCollaborator,
    saveCollaborator,
    deleteCollaborator,
    updateCollaborator,
}