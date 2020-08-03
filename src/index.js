require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const expressJwt = require('express-jwt');

const server = require('http').Server(app);

// Logger
app.use(morgan('combined'));

// MongoDB connection configuration
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {useUnifiedTopology: true,  useNewUrlParser: true}, (err, res) => {
  if (err)
    console.log(`err connecting to db on ${process.env.DB_URL}, err: ${err}`);
  else
    console.log(`----- Database connected on ${process.env.DB_URL} -----`);
}); // connect to our database

// Set port
app.set('port', process.env.PORT || 8000);

// Allow cross origin
app.use(cors());

// Validate each call before route
app.use('/', function (err, req, res, next) {
  next();
});

// Set directory for express
app.use(express.static(path.join(__dirname, 'public')));

let filter = function (req) {
  if (['/login'].indexOf(req.path) >= 0) {
    return true;
  }
};

app.use(expressJwt({secret: process.env.APP_SECRET}).unless(filter));

app.use('/', function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({
      'message': 'Unauthorized'
    });
    return;
  } else if (req.originalUrl !== '/login') {
    var authorization = req.header('authorization');
    if (authorization) {
      var session = JSON.parse(new Buffer((authorization.split(' ')[1]).split('.')[1], 'base64').toString());
      res.locals.session = session;
    }
  }
  next();
});

// Load body parser
app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Register routes. Loaded main route. Index route loads other routes.
app.use(require('./index.route'));

//Start listening server
server.listen(process.env.PORT, () => {
  console.log(`-----------------------\nServer started successfully!, Open this URL ${process.env.BASE_URL}\n-----------------------`);
});
