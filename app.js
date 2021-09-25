const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {    //Variables defined with const cannot be Redeclared. Variables defined with const cannot be Reassigned.
                                      //Variables defined with const have Block Scope.
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

const data = {
  members: [
    {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      }
    }
  ]
};

const jsonData = JSON.stringify(data);

const url = "https://us5.api.mailchimp.com/3.0/lists/04d6b4d240";

const options = {
  method: "POST",
  auth: "utkarsh1:658b7876806b9f9fbf10efd1824d5979-us5",
}

const request = https.request(url, options, function(response) {

if (response.statusCode === 200) {
  res.sendFile(__dirname + "/success.html");
} else {
  res.sendFile(__dirname + "/failure.html");
}

  response.on("data", function(data) {
  console.log(JSON.parse(data));
  })
})

request.write(jsonData); //send jsonData to mailchimp server after saving our http.request in a constant
request.end();
});


app.post("/failure", function(req, res) {
  res.redirect("/");
});


app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});




//API Key
//658b7876806b9f9fbf10efd1824d5979-us5
//List id
//04d6b4d240
