const listManager = require('../../models/ListManager.model');

// account manager
const getListManager = async (req, res) => {
    const result = await listManager.find();
    if (result) {
        res.json(result)
    } else {
        return res.status(400).json({  error: 'error get list manager' });
    }
}

// create account
const postManager = async (req, res) => {
    const result = await listManager.create(req.body);
    if (result) {
        res.json(result)
    } else {
        return res.status(400).json({ error: 'error post list manager '});
    }
}

// put account
const putManager = async (req, res) => {
    const result = await listManager.findById(req.params.id);
    if (result) {
        Object.assign(result, req.body);
        await result.save();
        res.json(result)
    } else {
        return res.status(400).json({ error: 'error put list manager' });
    }
}

// delete account
const deleteManager = async (req, res) => {
    const result = await listManager.deleteOne({ _id: req.params.id });
    if (result) {
        res.json(result)
    } else {
        return res.status(400).json({ error: 'error delete list manager' });
    }
}

module.exports = {
    getListManager,
    deleteManager,
    postManager,
    putManager
};