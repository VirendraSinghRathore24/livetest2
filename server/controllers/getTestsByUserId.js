const testdb = require("../models/test");

exports.getTestsByUserId = async (req, res) => {
    try{ 
        const name = req.query.currentUser;  
        const result = await testdb.find({name : name+"data"});

        return res.send({ data: result });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:'Error occurred ' + err
        });
    }
}