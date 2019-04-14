const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    method: {
        type: String,
        //more methods will add
        enum: ['google'],
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
        family_name:{
            type:String
        },
        given_name:{
            type:String
        },
        photo:{
            type:String
        }
    }
})

module.exports = mongoose.model('user',userSchema);