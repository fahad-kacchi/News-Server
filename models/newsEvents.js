const mongoose = require('mongoose')
Schema=mongoose.Schema;

const newsEventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    newsType: {
        type: String,
        required: true,
    },
    imagUrl: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    editor: {
        type: String
    },
    jornalist: {
        type: String
    },
    date:{
        type:Date,
        default:Date.now() 
    },
    approveDate:{
        type: String
    },
    newStatus: {
        type: String
    }
});


var NewsEvents = mongoose.model('newsEvent', newsEventSchema);
module.exports = NewsEvents;