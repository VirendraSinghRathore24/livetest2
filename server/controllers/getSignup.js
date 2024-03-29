const bcrypt = require("bcrypt");
const user = require("../models/user");
const path = require('path');

exports.getSignup = async (req, res) => {
    try{
        const {name, email} = req.body.data;
        const hashedPassword = req.body.pass;      
        const existingUser = await user.findOne({email});

        if(existingUser){
            return res.send({message : 'User Already Exists'});
        }

        // secure password
        // let hashedPassword;
        // try{
        //     hashedPassword = await bcrypt.hash(password, 10);
        // }
        // catch(err){
        //     return res.status(500).json({
        //         success:false,
        //         message:'Error in hashing password => ' + err
        //     });
        // }
        
        const lastUser = await user.find({});

        const userid = lastUser.length > 0 ? lastUser[lastUser.length-1].userid + 1 : 1;

        const User = await user.create({
            userid:userid,
            name:name,
            email:email, 
            password:hashedPassword
        });

        res.send({message : 'User Added Successfully'});
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:'Error occurred ' + err
        });
    }
}