
const user = require("../models/user");

exports.getUser = async (req, res) => {
    try{
        
        const {name, email} = req.query;    
        console.log("Rudransh => " + name + "," + email)   
        const user1 = await user.findOne({email});

    
        if(user1)
        {
            console.log("Sonam1") 
            return res.send({ userExists: true });
        }
        console.log("Sonam2") 
        return res.send({ userExists: false });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:'Error occurred ' + err
        });
    }
}