const UserModel = require('../../models/UserModel');
const mongoose = require('mongoose');

module.exports = async function (req, res, next) {
    try {
        
        let user = await UserModel.findOne({ _id: req.user._id })
        
        if (!user) return res.status(404).send({ isSuccessful: false, error:{ message: 'User not found' , path: null}});
        if (req.user._id.toString() !== user._id.toString()) return res.status(403).send({ isSuccessful: false, error:{message: 'You are not allow to perform this action', path: null}});
        
        user.accountType = 'pro'
        
        user.save()

        res.send({
            isSuccessful: true,
            message: "Successfully upgraded user",
            data: user
        });
    } catch (error) {
        next(error);
    }
}