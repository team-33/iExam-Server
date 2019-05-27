const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    method: {
        type: String,
        //more methods will add
        enum: ['google', 'local'],
        required: true
    },
    google: {
        id: {
            type: String,
        },
        email: {
            type: String,
            lowercase: true
        },
        family_name: {
            type: String
        },
        given_name: {
            type: String
        },
        photo: {
            type: String
        }
    },
    local: {
        email: {
            type: String,
            lowercase: true,
        },
        family_name: {
            type: String
        },
        given_name: {
            type: String
        },
        photo: {
            type: String
        },
        password: {
            type: String
        }
    }
});

//TODO: add encryption to password
userSchema.methods.isValidPassword = async function (newPassword) {
    return newPassword === this.local.password;
};

module.exports = mongoose.model('user', userSchema);