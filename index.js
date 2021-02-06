//required packages
var twilio = require('twilio'),
var client = new twilio('ACCOUNTSID', 'AUTHTOKEN'),
cronJob = require('cron').CronJob; //for sending text messages
var express = require('express');
bodyParser = require('body-parser'); //for receiving text messages
var Firebase = require('firebase'), //store user's data
usersRef = new Firebase('https://smspenpal-default-rtdb.firebaseio.com/Users/');

//add numbers
var numbers = [];
usersRef.on('child_added', function(snapshot) {
numbers.push( snapshot.val() );
  console.log( 'Added number ' + snapshot.val() );
})

//sign up
app.post('/message', function (req, res) {
  var resp = new MessagingResponse();
  if( req.body.Body.trim().toLowerCase() === 'yes' ) {
    var fromNum = req.body.From;
    if(numbers.indexOf(fromNum) !== -1) {
      resp.message('You have signed up to SMS penpal!');
    } else {
      resp.message('Thank you, you have signed up to SMS penpal. Reply "STOP" to cancel.');
      usersRef.push(fromNum);
    }
  } else {
    resp.message('Welcome to SMS penpal. Type "yes" if you would like to sign up for SMS penpal.');
  }

  res.writeHead(200, {
    'Content-Type':'text/xml'
  });
  res.end(resp.toString());

});

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