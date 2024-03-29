const user = require("../models/user");
const path = require('path');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getLogin = async(req, res) => {
    try{
        const {email, password} = req.body.data;

        if(!password || !email){
            return res.send({message : 'Password or Email is incorrect'});
        }

        const data = await user.findOne({email});

        if(!data){
            return res.send({message : 'User does not exist'});
        }

        const payload = {
            email:data.email,
            id:data._id,
            role:data.role,
            name:data.name,
            userid:data.userid
        }

        const JWT_TOKEN = "Viren";
        
        if(await bcrypt.compare(password, data.password))
        {
            let token = jwt.sign(payload, JWT_TOKEN,
                                {
                                    expiresIn:"2h"
                                });
            data.token = token;
            data.password = undefined;

            const options = {
                expires: new Date(Date.now() + 1200000),
                httpOnly:false
            };
            res.cookie("token", token, options);

            return res.send({token : token, message:"User logged in successfully", name:data.name})
            //res.render(path.join((__dirname), 'views/index.ejs'), {user:data.name});
            //res.setHeader('Authorization', 'Bearer '+ token);
            // res.cookie("token", token, options).status(200).json({
            //     success:true,
            //     token,
            //     data,
            //     mesaage:"User logged in successfully"
            // });
        }
        else{
            return res.send({message : 'Wrong Password'});
        }
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            data:"internal server error",
            message:err.message
        });
    }
}