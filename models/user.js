const mongoose = require('mongoose')
Schema=mongoose.Schema;

const userSchema = new Schema({

    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    mobile: {
        type: String,
        unique: true  
    },
    pass: {
        type: String,  
    },
    date:{
        type:Date,
        default:Date.now() 
    },
});


var User = mongoose.model('user', userSchema);
module.exports = User;