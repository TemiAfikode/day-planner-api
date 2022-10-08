const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const UserModel = require("../models/UserModel");

dotenv.config();

module.exports = async function (req, res, next) {
  try {
    const authToken = req.headers["authorization"];
    let token = "";

    if (!authToken)
      return res
        .status(401)
        .send({
          isSuccessful: false,
          message: "Access denied, login required",
        });

    if (authToken && authToken.startsWith("Bearer ")) {
      token = authToken.split(" ")[1];
    }

    if (!token) {
      return res
        .status(401)
        .send({
          isSuccessful: false,
          message: "Access denied, login required",
        });
    }

    const verify = jwt.verify(token, process.env.JWT_SECRET);

    user = await UserModel.findById({ _id: verify.user.id });
    if (!user)
      return res
        .status(404)
        .send({
          isSuccessful: false,
          message: "Access denied, login required",
        });

    req.user = user;

    next();
  } catch (error) {
    res.status(400).send({ isSuccessful: false, message: "Invalid token" });
  }
};
