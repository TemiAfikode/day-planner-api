const TaskModel = require('../models/TaskModel');

module.exports.taskCap = function (cap) {
    return async function (req, res, next) {
        try {
            if (req.user.accountType !== 'basic') {
                next()
            }

            const taskCount = await TaskModel.count({
                createdBy: req.user._id, $where: function () {
                    return (this.createdAt > new Date().setDate(new Date().getDate() - 1) && this.createdAt < new Date())
                }
            })

            if (taskCount >= cap) {
                return res.status(403).send({ isSuccessful: false, message: 'You have exceeded the maximum number of daily tasks for this account type.' })
            }
            next();
        } catch (error) {
            next(error);
        }
    }
}

module.exports.noSharing = async function (req, res, next) {
        try {
            if (req.user.accountType === 'basic') {
                return res.status(403).send({isSuccessful: false, message: 'Upgrade to pro account to use this feature.' })
            }
            next()
           
        } catch (error) {
            next(error);
        }
    }