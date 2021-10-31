"use strict";
const createError = require('http-errors');
const path = require('path');
const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
module.exports.io = require('socket.io')(http);
const extend = require('util')._extend
const cookieParser = require('cookie-parser');
const session = require("express-session");
const logger = require('morgan');


http.listen(process.env.PORT || 2525, function(){
  console.log("PORT : " + (process.env.PORT || 2525));
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("secret","mycom_secret_key"));
app.use(session({key:"session_id"}));
app.use(express.static('public'));

// Router
const indexRouter = require('./routes/index');
const nicoRouter = require('./routes/nico');
const displayRouter = require('./routes/display');
const controllerRouter = require('./routes/controller');
const startNewRouter = require('./routes/startNew');
const surveyRouter = require('./routes/survey');
const commentListRouter = require('./routes/commentList');

app.use('/', indexRouter);
app.use("/public",express.static(path.join(__dirname, 'public')));
app.use('/nico', nicoRouter);
app.use('/display', displayRouter);
app.use('/controller', controllerRouter);
app.use('/startNew', startNewRouter);
app.use('/survey', surveyRouter);
app.use('/commentList', commentListRouter);
