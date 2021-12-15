const billList = require('../../models/billListOff.model');

// bill list
const getBillList = async (req, res) => {
    const result = await billList.find();
    if (result) {
        res.json(result)
    } else {
        return res.status(400).json({  error: 'error get bill list off' });
    }
}

module.exports = {
    getBillList
};