module.exports = async function (req, res, next) {
    try {
        req.user = null

        res.clearCookie('planner_auth_token', { path:'/'})
            .send({
            isSuccessful: true,
            message: "Successfully logged out user",
        });
    } catch (error) {
        next(error);
    }
}