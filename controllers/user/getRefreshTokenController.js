const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const UserModel = require('../../models/UserModel');

dotenv.config()

module.exports = async function (req, res, next) {
    try {
        const cookie = req.headers['cookie']
        let token = ''
         if (cookie && cookie.startsWith('planner_auth_token')) {
            token = cookie.split('=')[1]
        }
        if (!token) {
            return res.status(401).send({ isSuccessful: false, error: { message: 'Access denied, login required', path: null } });
        }

        const verify = jwt.verify(token, process.env.JWT_REFRESH_TOKEN)
         
        user = await UserModel.findById({ _id: verify.user.id })
        if (!user) return res.status(404).send({ isSuccessful: false, error:{ message: 'Access denied, login required', path: null} });
        
        req.user = user;
        
        const isProd = process.env.NODE_ENV !== 'development'

        const accessToken = user.accessToken()
        const refreshToken = user.refreshToken()

        res.cookie('planner_auth_token', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: isProd,
                secure: isProd,
                path: '/'
            })
            .send({
                isSuccessful: true,
                message: "Successfully updated user token",
                token: accessToken,
            });
    } catch (error) {
        res.status(400).send({ isSuccessful: false, message: 'Invalid token' })
    }
}