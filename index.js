//required packages
var twilio = require('twilio'),
var client = new twilio('ACCOUNTSID', 'AUTHTOKEN'),
cronJob = require('cron').CronJob; //for sending text messages
var express = require('express');
bodyParser = require('body-parser'); //for receiving text messages
var Firebase = require('firebase'), //store user's data
usersRef = new Firebase('https://smspenpal-default-rtdb.firebaseio.com/Users/');

//send response
var MessagingResponse = require('twilio').twiml.MessagingResponse;
app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/message', function (req, res) {
  var resp = new MessagingResponse();
  resp.message('Thanks for subscribing!');
  res.writeHead(200, {
    'Content-Type':'text/xml'
  });
  res.end(resp.toString());
});

//listen to server
var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});