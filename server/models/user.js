const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userid:{
        type:Number,
        required:true,
        maxLength:20
    },
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
    password:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model("user", userSchema);