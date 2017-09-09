var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose=require("mongoose");
var passport=require("passport");
var localStrategy=require("passport-local").Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');
var dishRouter=require("./routes/dishRouter");
var leaderRouter=require("./routes/leaderRouter");
var promoRouter=require("./routes/promoRouter");

var config=require("./config");
mongoose.connect(config.mongoUrl,{
  useMongoClient:true
});

var db=mongoose.connection;
db.once("open",function(){
  console.log("server started successfully");
});
var app = express();


var User=require("./models/User");
app.use(passport.initialize());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use("/dishes",dishRouter);
app.use("/promotions",promoRouter);
app.use("/leadership",leaderRouter);
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});


module.exports = app;