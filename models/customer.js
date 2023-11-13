const mongoose = require('mongoose')
Schema=mongoose.Schema;

const custDetailSchema = new Schema({

    custName: {
        type: String,
        required: true,
        unique:true,
    },
    date:{
        type:Date,
        default:Date.now() 
    },
    number:{
        type: Number,
        required: true,
        unique:true,
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    rewardPoints: {
        type: Number,
        required: false,
        unique:false,
    }
});


var CustDetail = mongoose.model('custDetail', custDetailSchema);
module.exports = CustDetail;