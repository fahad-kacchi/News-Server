const mongoose = require('mongoose')
Schema=mongoose.Schema;

const notifyServiceSchema = new Schema({

    pubID: {
        type: String,
        required: true,
        unique:false,
    },
    notificationResp: {
        type: Boolean,
        required: true,
        unique:false,
    },
    date:{
        type:Date,
        default:Date.now() 
    },
});


var notifyService = mongoose.model('notifyService', notifyServiceSchema);
module.exports = notifyService;