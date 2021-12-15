const listUser = require('../../models/listUsers.model');
const jwt = require('jsonwebtoken');

// account user
const getAll = async (req, res) => {
    const userName = await listUser.findOne({ userName: req.body.userName });
    
    if (userName) {
        const result = await listUser.updateOne({ userName: req.body.userName } , { password :  req.body.password      });
        return res.json({ succsess: true,  message: 'Successful update' });
    }else {
        return res.json({ succsess: false,  error: 'Account not found !!!' });
    }
    
}

// create account user
const register = async (req, res) => {
    try {
        const userName = await listUser.findOne({ userName: req.body.userName });
        if (userName) {
            return res.json({ succsess: false, error: 'That username is already in use !!!' });
        }
        if (!userName) {
            const result = await listUser.create(req.body);
            if (result) {
                res.json(result)
            } else {
                return res.status(400).json({ error: 'error create user !!!' });
            }
        }
    } catch (error) {
        return error;
    }
}

// login
const login = async (req, res) => {
    const userName = await listUser.findOne({ userName: req.body.userName });
    
    if (!userName) {
        return res.json({ succsess: false, error: 'Wrong username or password !!!' });
    }
    
    const password = userName.password === req.body.password;
    if (!password) {
        return res.json({ succsess: false, error: 'Wrong username or password !!!' });
    }
    
    if (userName) {
        const token = jwt.sign({_id : userName._id }, "mk")
        return res.status(200).json({ succsess: true , token :token });
    }
}

module.exports = {
    getAll,
    register,
    login
};