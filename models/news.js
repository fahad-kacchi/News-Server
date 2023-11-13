const mongoose = require('mongoose')
Schema=mongoose.Schema;

const newsSchema = new Schema({

    name: {
        type: String,
    },
    role: {
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
    address: {
        type: String,
    },
    highQualification: {
        type: String,
    },
    experience: {
        type: String,
    },
    adhaar: {
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


var News = mongoose.model('news', newsSchema);
module.exports = News;