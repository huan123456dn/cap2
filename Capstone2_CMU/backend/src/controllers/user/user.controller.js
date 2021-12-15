const Product = require('../../models/drugList.model');

const getProduct =  async(req, res) =>{
    const result = await Product.find();
    if(result){
        res.json(result)
    }else {
        return res.status(400).json({error : 'error list product user'});
    }
}

module.exports = {
    getProduct
} ;