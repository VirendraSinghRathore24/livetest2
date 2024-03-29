
const otpdb = require("../models/otp");

exports.getOTP = async (req, res) => {
    try{ 
        const {name, email} = req.query;     
        const user = await otpdb.findOne({name:name, email:email});
        
        return res.send({ otp: user.otp });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:'Error occurred ' + err
        });
    }
}