const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config()

const UserSchema = new mongoose.Schema({
   email: {
        type: String,
        required: [true, 'Email can not be empty'],
        unique: [true, 'Email must be unique'],
        trim: true,
    },
    accountType: {
        type: String,
        enum: ['basic', 'pro'],
        default: 'basic',
    },
    firstname: {
        type: String,
        required: [true, 'First name can not be empty'],
        trim: true
    },
    lastname: {
        type: String,
        required: [true, 'Last name can not be empty'],   
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Due time can not be empty'],
        select: false,
        minLength: [8, 'Password must be at least 8 characters long'],
    }
}, {
    timestamps: true,
});

UserSchema.pre('save', async function (next) { 
    if (!this.isModified('password')) next();
    
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

UserSchema.methods.isPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.accessToken = function () {
    return jwt.sign({ user: { id: this._id } }, process.env.JWT_SECRET, {expiresIn:'2h'})
}

UserSchema.methods.refreshToken = function () {
    return jwt.sign({ user: { id: this._id } }, process.env.JWT_REFRESH_TOKEN, {expiresIn:'30d'})
}

module.exports = mongoose.model('user', UserSchema)