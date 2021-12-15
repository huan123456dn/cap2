const billList = require('../../models/userBillList.model');

const getProduct =  async(req, res) =>{
    const result = await billList.findOne({ id_user: req.params.id })
    if(result){
        res.json(result)
    }else if(result === null){
        res.json()
    }
    else {
        return res.status(400).json({error : 'error bill list user'});
    }
}

const postProduct =  async(req, res) =>{

    const result = await billList.findOne({ id_user: req.body.id_user })
    if(result){
        const newDate = await billList.findOneAndUpdate( 
        {   
            id_user: req.body.id_user
        },
        {
            $push:{
                listProduct : req.body.listProduct
            }
        });
        res.json(newDate)
    }else if(!result){
        const newData = await billList.create(req.body);
        res.json(newData)
    }else {
        return res.status(400).json({error : 'error bill list user'});
    }
}

const putProduct =  async(req, res) =>{
    const result = await billList.findOne({ id_user: req.body.id_user })
    if(result){
        const newDate = await billList.findOneAndUpdate( 
        {   
            id_user: req.body.id_user
        },
        {
            $pull:{
                listProduct : { _id : req.body.id }
            }
        });
        res.json(newDate)
    }else if(!result){
        const newData = await billList.create(req.body);
        res.json(newData)
    }else {
        return res.status(400).json({error : 'error bill list user'});
    }
}

module.exports = {
    getProduct,
    postProduct,
    putProduct
} ;