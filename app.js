const credentials = { secretUser: "user", secretPassword: "password" }

const cors = require('cors')
const express = require("express")
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');

const fs = require("fs");

const app = express()
const PORT = process.env.PORT || 3000

var https = require('https');
var http = require('http')

var options = {
   key: fs.readFileSync('camerons-key.pem'),
   cert: fs.readFileSync('camerons-cert.pem')
};

app.use(function (req, res, next) {
   res.setHeader('Content-Security-Policy', "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'");
   next();
});

app.use('/healthcheck', require('./routes/healthcheck.routes'));

app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get("/", (req, res) => {
   headers = { "http_status": 200, "cache-control": "no-cache" }
   body = { "status": "available" }
   res.status(200).send(body)
})

app.get("/health", (req, res) => {
   headers = { "http_status": 200, "cache-control": "no-cache" }
   body = { "status": "available" }
   res.status(200).send(body)
})


app.post('/authorize', (req, res) => {
   // Insert Login Code Here
   let user = req.body.user;
   let password = req.body.password;
   console.log(`User ${user}`)
   console.log(`Password ${password}`)

   if (user === credentials.secretUser && password === credentials.secretPassword) {
      console.log("Authorized")
      const token = jwt.sign({
         data: 'foobar'
      }, 'your-secret-key-here', { expiresIn: 60 * 60 });

      console.log(token)
      res.status(200).send(token)
   } else {
      console.log("Not authorized")
      res.status(200).send({ "STATUS": "FAILURE" })
   }
});

// app.listen(PORT, () => {
//    console.log(`STARTED LISTENING ON PORT ${PORT}`)
// });

http.createServer(app).listen(8080, function(){
   console.log('HTTP listening on 8080')
})

http.createServer(options, app).listen(PORT, function(){
   console.log('HTTPS listening on 3000');
})