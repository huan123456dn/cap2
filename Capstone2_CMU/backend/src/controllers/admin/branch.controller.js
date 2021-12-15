const BranchManager = require('../../models/branchManager.model');

// branch manager
const getBranchManager = async (req, res) => {
    const result = await BranchManager.find();
    if (result) {
        res.json(result)
    } else {
        return res.status(400).json({ error: 'error' });
    }
}

// create branch
const postBranchManager = async (req, res) => {
    const result = await BranchManager.create(req.body);
    if (result) {
        res.json(result)
    } else {
        return res.status(400).json({ error: 'error post list branch '});
    }
}

// put branch
const putBranchManager = async (req, res) => {
    const result = await BranchManager.findById(req.params.id);
    if (result) {
        Object.assign(result, req.body);
        await result.save();
        res.json(result)
    } else {
        return res.status(400).json({ error: 'error put list branch' });
    }
}

// delete branch
const deleteBranchManager = async (req, res) => {
    const result = await BranchManager.deleteOne({ _id: req.params.id });
    if (result) {
        res.json(result)
    } else {
        return res.status(400).json({ error: 'error delete list branch' });
    }
}

module.exports = {
    getBranchManager,
    postBranchManager,
    putBranchManager,
    deleteBranchManager,
};