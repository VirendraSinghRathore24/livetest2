var nodemailer = require('nodemailer');
const otpdb = require("../models/otp");

exports.sendEmail = async (req,res) => {
    try{
        const {name, email} = req.body;

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'virendrasinghrathore025@gmail.com',
              pass: 'nxjj bmhp jkpk oest'
            }
          });
          

          let digits = '0123456789'; 
          let OTP = ''; 
          let len = digits.length 
          for (let i = 0; i < 4; i++) { 
              OTP += digits[Math.floor(Math.random() * len)]; 
          }
          console.log("OTP => " + OTP)
          const user = await otpdb.findOneAndUpdate({name:name, email:email},{otp:OTP});

          if(!user)
          {
            await otpdb.create({
                name:name,
                email:email, 
                otp:OTP
            });
          }

          var mailOptions = {
            from: 'virendrasinghrathore025@gmail.com',
            to: `${email}`,
            subject: 'Verify Your Account with One-Time Passcode (OTP) - livetest',
            text: "Dear " + name + "\n\n" + "Thank you for choosing to create an account with us! To ensure the security of your account, we require one final step to verify your email address."
            +"\n\n" + "Please use the following one-time passcode (OTP) to complete the verification process:" + "\n\n" + 
            `OTP: ${OTP}` + "\n\n" + 
            "Please enter this code in the designated field on our website livetest to confirm your email address." + 
            "Please note that this code is valid for [2 minutes] from the time of this email." + 
            "If you did not request this code or have any concerns about your account's security," +
            "please contact our support team immediately at [virendrasinghrathore025@gmail.com]."
            + "\n\n" + "Thank you for your cooperation in helping us maintain the security of your account. We look forward to serving you!" + "\n\n" +
            "Best Regards," + "\n" + 
            "livetest Team"
        };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
    catch(err){
        console.log(err);
    }
}