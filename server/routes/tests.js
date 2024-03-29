const express = require('express');
const path = require('path');

const router = express.Router();

const {getLogin} = require("../controllers/getLogin");
const {getSignup} = require("../controllers/getSignup");
const {sendEmail} = require("../controllers/sendEmail");
const {getOTP} = require("../controllers/getOTP");
const {getUser} = require("../controllers/getUser");
const {submitTest} = require("../controllers/submitTest");

router.post("/login", getLogin);
router.post("/signup", getSignup);
router.post("/sendemail", sendEmail);
router.get("/getotp", getOTP);
router.get("/getuser", getUser);
router.post("/submittest", submitTest);

module.exports = router;