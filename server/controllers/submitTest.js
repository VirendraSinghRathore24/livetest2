const testdb = require("../models/test");

exports.submitTest = async(req, res) => {
    try{
        const {testid, paper, result, date} = req.body.data;
        const name = req.body.name;

        await testdb.create({
            name:name,
            testid:testid, 
            paper:paper,
            result:result,
            date:date
        });
        res.send({message : 'Test Submitted Successfully'});
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