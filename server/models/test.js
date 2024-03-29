const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    testid:{
        type:String,
        required:true,
        maxLength:20
    },
    paper:{
        type:String,
        required:true,
        trim:true
    },
    result:{
        type:Number,
        required:true,
    },
    date:{
        type:String,
        required:true,
        trim:true
    },
});

module.exports = mongoose.model("test", testSchema);