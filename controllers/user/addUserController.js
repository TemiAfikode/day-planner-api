const _ = require('lodash')
const dotenv = require('dotenv')

dotenv.config()

const UserModel = require('../../models/UserModel');
const userValidation = require('../../validation/userValidation')

module.exports = async function (req, res, next) {
    try {
        const payload = userValidation(req.body);
        if (!payload.isValid) {
            return res.status(400).send({
                isSuccessful: false,
                error: payload.error
            })
        }

        let user = new UserModel(payload.body)
        
        const accessToken = user.accessToken()
        const refreshToken = user.refreshToken()
        
        await user.save()

        user = user.toObject();
        
        const isProd = process.env.NODE_ENV !== 'development'

        res.cookie('planner_auth_token', refreshToken, {
                maxAge: 1000 * 60 * 60 * 3,
                httpOnly: isProd,
                secure: isProd,
                path: '/'
        })
        res.send({
            isSuccessful: true,
            message: 'New user has been created successfully.',
            data: _.omit(user, ['password']),
            token: accessToken
        });
    } catch (err) {
        console.log(err)
        next(err);
    }
}