"use strict";
require('dotenv').config({ silent: true });
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
require('./models/users');
require('./models/pinboards');
require('./models/pins');
require('./config/passport');
mongoose.connect(process.env.MONGO_URL);
app.set('views', './views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./public'));
app.use('/scripts', express.static('bower_components'));
var pinRoutes = require('./routes/pinRoutes');
var pinboardRoutes = require('./routes/pinboardRoutes');
var userRoutes = require('./routes/userRoutes');
app.use('/api/pins', pinRoutes);
app.use('/api/pinboards', pinboardRoutes);
app.use('/api/users', userRoutes);
app.get('/*', function (req, res, next) {
    if (/.js|.html|.css|templates|javascript/.test(req.path))
        return next({ status: 404, message: 'Not Found' });
    if (/application\/json/.test(req.get('accept'))) {
        return next({ status: 404, message: 'Not Found' });
    }
    else {
        return res.render('index');
    }
});
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    if (err.name = 'CastError')
        err.message = 'Invalid ID';
    var error = (app.get('env') === 'development') ? err : {};
    res.send({
        message: err.message,
        error: error
    });
});
module.exports = app;
