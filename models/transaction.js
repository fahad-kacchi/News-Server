const mongoose = require('mongoose')
Schema=mongoose.Schema;

const transDetailSchema = new Schema({

    custID: {
        type: String,
        required: false,
    },
    date:{
        type:Date,
        default:Date.now() 
    },
    otp:{
        type: Number, 
        required: false,
    },
    pubId: {
        type: String,
        required: false
    },
    amount: {
        type: Number,
        required: false,
    
    },
    transStatus: {
        type: String,
        required: false,
    },
    discount: {
        type: String,
        required: false,
    
    },
});


var transDetail = mongoose.model('transDetail', transDetailSchema);
module.exports = transDetail;