const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    age: {
        type: Number,
        required: true
    },
    access_token: {
        type: String
    }
});

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.access_token;

    return userObject;
}

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    user.access_token = jwt.sign({ _id: user._id.toString() }, 'waduhekisdat' , { expiresIn: '1 days' });
    await user.save();

    return user.access_token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        return null;
    };
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return null;
    }
    return user;
}

const User = mongoose.model('User', userSchema);

module.exports = User;