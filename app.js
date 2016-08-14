const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

var config = {
  appname: "samplenodeapp",
  appdb: "samplenodeapp"
}

var dbURI = 'mongodb://localhost/' + config.appdb;
mongoose.connect(dbURI);
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

process.on('exit', function(err) {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through app termination');
  });
});


app.get('/', function(req, res, next) {
  res.status(200).json({
    message: "Hello Sample Node App"
  });
});

app.post('/', function(req, res, next) {
  res.status(201).json({
    message: "Hello Sample Node App"
  });
});

app.use(function(req, res, next) {
  var err = new Error('Resource not found');
  err.status = 404;
  return res.status(err.status).json({
    "error": err.message
  });
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    return res.status(err.status || 500).json({
      "error": err
    });
  });
}

app.use(function(err, req, res, next) {
  return res.status(err.status || 500).json({
    "error": err.message
  });
});

app.onAppStart = function(addr) {
  console.log(config['appname'], ' is now running on port:', addr.port);
}

module.exports = app;