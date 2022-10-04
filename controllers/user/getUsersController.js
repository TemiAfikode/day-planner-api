const UserModel = require('../../models/UserModel');

module.exports = async function (_req, res, next) {
    try {
        const users = await UserModel.find({})
        res.send({
            isSuccessful: true,
            message: "Successfully fetched users",
            data: users
        });
    } catch (error) {
        next(error);
    }
}