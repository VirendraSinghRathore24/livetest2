const mongoose = require('mongoose');

require('dotenv').config();

const dbconnect = () => {

    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {console.log("Connction successful")})
    .catch((error) => {
        console.log("Error occurred");
        process.exit(1);
    })
}

module.exports = dbconnect;