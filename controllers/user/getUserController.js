const UserModel = require('../../models/UserModel');

module.exports = async function (req, res, next) {
    try {
        const user = await UserModel.findById(req.params.id)

        if (!user) return res.status(404).send({isSuccessful: false, error:{ message: 'User not found', path: null} });
        
        res.send({
            isSuccessful: true,
            message: "Successfully fetched user",
            data: user
        });
    } catch (error) {
        next(error);
    }
}