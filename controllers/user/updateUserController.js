const UserModel = require('../../models/UserModel');

module.exports = async function (req, res, next) {
    try {
        if (req.body?.email) delete req.body.email;
        if (req.body?.accountType) delete req.body.accountType;
        
        let user = await UserModel.findOne({ _id: req.user._id })
        
        if (!user) return res.status(404).send({ isSuccessful: false, error:{ message: 'User not found', path: null}});
        if (req.user._id.toString() !== user._id.toString()) return res.status(403).send({ isSuccessful: false, error:{message: 'You are not allow to perform this action', path: null}});
        
        user.set({ ...req.body })

        await user.save()

        res.send({
            isSuccessful: true,
            message: "Successfully updated user",
            data: user
        });
    } catch (error) {
        next(error);
    }
}