const express = require('express')
const cors = require('cors')
const app = express()
var bodyParser = require('body-parser')
const port = 5000
var User = require('./User')

app.use('/user', User)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
//Added fields to cors to allow incoming requests to include session in header
app.use(cors({
    credentials: true,
    origin: function(origin, callback) {
      callback(null, true);
    }
  }))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(port, () => {
  console.log(`Node app listening at http://localhost:${port}`)
})