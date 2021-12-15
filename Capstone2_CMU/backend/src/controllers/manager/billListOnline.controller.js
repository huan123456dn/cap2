const billList = require('../../models/billListOnline.model');

// bill list
const getBillList = async (req, res) => {
    const result = await billList.find();
    if (result) {
        res.json(result)
    } else {
        return res.status(400).json({  error: 'error get bill list' });
    }
}

// bill list find id
const getBillListID = async (req, res) => {
    const result = await billList.findById(req.params.id);
    if (result) {
        res.json(result)
    } else {
        return res.status(400).json({  error: 'error get bill list' });
    }
}

// create Bill
const postBill = async (req, res) => {
    const result = await billList.create(req.body);
    if (result) {
        res.json(result)
    } else {
        return res.status(400).json({ error: 'error post bill list '});
    }
}

// put  Bill
const putBill = async (req, res) => {
    const result = await billList.findById(req.params.id);
    if (result) {
        Object.assign(result, req.body);
        await result.save();
        res.json(result);
    } else {
        return res.status(400).json({ error: 'error put list manager' });
    }
}

// delete  product
const deleteBill = async (req, res) => {
    const result = await billList.deleteOne({ _id: req.params.id });
    if (result) {
        res.json(result)
    } else {
        return res.status(400).json({ error: 'error delete list manager' });
    }
}


const putProduct =  async(req, res) =>{
    const result = await billList.findOne({ _id: req.body.id_user })
    if(result){
        const newDate = await billList.updateOne( 
        {   
            _id : req.body.id_user,
            "listProduct._id" :req.body.data._id
        },
        {
            "$set" : {
                "listProduct.$" : req.body.data
            }
        });

        res.json(newDate);

    }else {
        return res.status(400).json({error : 'error bill list Product manager '});
    }
}

const deleteProduct =  async(req, res) =>{
    const result = await billList.findOne({ _id: req.body.id_user });
    console.log(req.body);
    if(result){
        const newDate = await billList.findOneAndUpdate( 
        {   
            _id : req.body.id_user
        },
        {
            $pull:{
                listProduct : { _id : req.body.id_product }
            }
        });
        res.json(newDate)
    }else {
        return res.status(400).json({error : 'error bill list user'});
    }
}


module.exports = {
    getBillList,
    getBillListID,
    postBill,
    putBill,
    deleteBill,
    putProduct,
    deleteProduct
};