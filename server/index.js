const express = require("express");
const app = express();

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 3002;

app.use(cors());

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
	});

//database connect
database();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:"http://localhost:3000",
		//origin:"https://mom-backend.onrender.com",
		credentials:true,
	})
)


//routes
app.use(require("./routes/tests"));

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})

