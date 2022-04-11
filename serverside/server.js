let express = require('express')
let mongoose = require('mongoose')
let cors = require('cors')
let bodyParser = require('body-parser')
let dbConfig = require('./database/db')
const createError = require('http-errors');

// Express Route
const userRoute = require("./routes/user.route");
const blogRoute = require("./routes/blog.route")

// Connecting mongoDB Database
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/nexuser');//connect mongodb collection users

var db = mongoose.connection;

db.on("error", () => {console.log("Error connecting db.")});
db.once("open", () => { console.log("COnnected succesfully")});

const app = express()
app.use(express.json());
app.use(express.urlencoded());
//app.use(bodyParser.json())

app.use(cors())
app.options('*', cors());
app.use('/users', userRoute);
app.use('/blogs', blogRoute);
//app.listen(3000)

// PORT
const port = process.env.PORT || 4000
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

