const listStaff = require('../../models/listStaff.model');

// account Staff
const getListStaff = async (req, res) => {
    const result = await listStaff.find();
    if (result) {
        res.json(result)
    } else {
        return res.status(400).json({  error: 'error get list manager' });
    }
}

// create account Staff
const postStaff = async (req, res) => {
    const result = await listStaff.create(req.body);
    if (result) {
        res.json(result)
    } else {
        return res.status(400).json({ error: 'error post list manager '});
    }
}

// put account Staff
const putStaff = async (req, res) => {
    const result = await listStaff.findById(req.params.id);
    if (result) {
        Object.assign(result, req.body);
        await result.save();
        res.json(result);
    } else {
        return res.status(400).json({ error: 'error put list manager' });
    }
}

// delete account Staff
const deleteStaff = async (req, res) => {
    const result = await listStaff.deleteOne({ _id: req.params.id });
    if (result) {
        res.json(result)
    } else {
        return res.status(400).json({ error: 'error delete list manager' });
    }
}

module.exports = {
    getListStaff,
    deleteStaff,
    postStaff,
    putStaff
};