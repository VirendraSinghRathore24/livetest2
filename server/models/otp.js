const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    otp:{
        type:Number,
        required:true,
    }
});

module.exports = mongoose.model("otp", otpSchema);