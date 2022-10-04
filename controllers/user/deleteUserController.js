const UserModel = require('../../models/UserModel');

module.exports = async function (req, res, next) {
    try {
        const user = await UserModel.findById(req.user._id)
        if (!user) return res.status(404).send({ isSuccessful: false,  error: { message: 'User not found', path: null}});
        
        if (req.user._id.toString() !== user._id.toString()) return res.status(403).send({ isSuccessful: false, error: { message: 'You are not allow to perform this action', path: null} });
        
        user.delete()
        await user.save()
        
        res.clearCookie('planner_auth_token', { path: '/' })
        res.send({
            isSuccessful: true,
            message: "Successfully deleted user",
        });
    } catch (error) {
        next(error);
    }
}