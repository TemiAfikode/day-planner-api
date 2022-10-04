module.exports = async function (req, res, _next) {
         res.send({
            isSuccessful: true,
            message: "Successfully fetched user",
            data: req.user
        });
}