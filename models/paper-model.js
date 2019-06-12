const mongoose = require('mongoose');

var paperSchema = new mongoose.Schema({
    subject:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    description:{
        type:String,
    },
    numberOfQuestions:{
        type:Number
    },
    likes:{
        type:Number
    },
    dislikes:{
        type:Number
    },
    rating:{
        type:Number
    },
    minutes:{
        type:Number
    }
    
});

module.exports = mongoose.model('papers',paperSchema);