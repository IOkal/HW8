'use strict'

const express = require('express');
const bodyParser = require('body-parser');

// Create a new instance of express
const app = express();

// Tell express to use the body-parser middleware and to not parse extended bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Route that receives a POST request to /sms
app.post('/sms', function (req, res) {
  const phonenumber = req.body.From;
  // const fileURL = req.query.fileURL;
  const body = req.body.Body;
  // const body = JSON.stringify(req.body);
  res.set('Content-Type', 'text/plain');
  res.send(`You sent: ${body}, ${phonenumber} to Express`);
});

// Tell our app to listen on port 3000
app.listen(3000, function (err) {
  console.log('Server started on port 3000');
});
