const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/signup.html');
})

app.post('/', function (req, res) {
  let fName = req.body.fName;
  let lName = req.body.lName;
  let email = req.body.email;

  let data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          'FNAME': fName,
          'LNAME': lName,
        }
      }
    ]
  };

  let jsonData = JSON.stringify(data);

  let options = {
    url: 'https://us19.api.mailchimp.com/3.0/lists/0c327cb1e8',
    method: 'POST',
    headers:{
      'Authorization': 'Tobi 0351e36e2200781d6f82fcb60fd0af0e-us19'
    },
    body: jsonData
  };

  request(options, function (error, response, body) {
    if(error){
      res.sendFile(__dirname + '/failure.html');
    } else {
      if(response.statusCode === 200){
      res.sendFile(__dirname + '/success.html');
    } else{
      res.sendFile(__dirname + '/failure.html');
    }
  }
  });

});

app.post('/failure', function (req, res) {
  res.redirect('/');
})

app.listen(process.env.PORT || 3000,function () {
  console.log('server is running on port 3000');
})

//api key
// 0351e36e2200781d6f82fcb60fd0af0e-us19
// 0351e36e2200781d6f82fcb60fd0af0e-us19
// 0351e36e2200781d6f82fcb60fd0af0e-us19
// 0351e36e2200781d6f82fcb60fd0af0e-us19

//list id
// 0c327cb1e8
