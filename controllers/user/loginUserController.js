const _ = require('lodash')
const dotenv = require('dotenv')

dotenv.config()

const UserModel = require('../../models/UserModel');

module.exports = async function (req, res, next) {
    try {
        
        let user = await UserModel.findOne({ email: req.body.email }).select('+password')
        
        if (!user) return res.status(400).send({ isSuccessful: false, error:{message: 'User password or email incorrect', path: null }});

        if(!(await user.isPassword(req.body.password))) return res.status(400).send({ isSuccessful: false, error:{message: 'User password or email incorrect', path: null} });
        
        const token = user.accessToken()
        const refreshToken = user.refreshToken()
        
        user = user.toObject();

        const isProd = process.env.NODE_ENV !== 'development'

        res.cookie('planner_auth_token', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: isProd,
                secure: isProd,
                path: '/'
            })
            .send({
                isSuccessful: true,
                message: 'Logged in successfully.',
                data: _.omit(user, ['password']),
                token
            });
        
    } catch (err) {
        console.log(err)
        next(err);
    }
}