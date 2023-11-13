const mongoose = require('mongoose')
Schema=mongoose.Schema;

const feedbackSchema = new Schema({

    userEmail: {
        type: String,
    },
    message: {
        type: String,
    },
    newsID: {
        type: String,
    },
    date:{
        type:Date,
        default:Date.now() 
    },
});


var Feedback = mongoose.model('feedback', feedbackSchema);
module.exports = Feedback;