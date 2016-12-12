var express = require('express');
var compression = require('compression');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var proxy = require('proxy-middleware');
var hbs = require('hbs');
var helpers = require('handlebars-helpers');
var fs = require('fs');

var app = express();

/* Setup Handlebars */
hbs.registerPartials(__dirname + '/views/partials/');
hbs.registerHelper('raw', function (options) {
    return options.fn(this);
});
hbs.registerHelper('section', function (name, options) {
    this.sections = this.sections || {};
    this.sections[name] = options.fn(this);
    return null;
});

hbs.registerHelper('json', function (obj, options) {
    return JSON.stringify(obj);
});

hbs.localsAsTemplateData(app);
helpers(hbs);


/* Setup Application */
app.disable('x-powered-by');
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

var envMap = {
    development: '-test',
    test: '-test',
    staging: '-staging',
    production: ''
};

var suffix = envMap[process.env.NODE_ENV];
suffix = suffix === undefined ? '-test' : suffix;

/* External Routes */
// app.use('/oc', proxy('http://oc' + suffix + '.ehsy.com'));

/* Global MiddleWares */
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

/* Static MiddleWare */
app.use('/static', express.static(__dirname + '/static'));

/* Common Routes */
// app.use(require('./middlewares/authentication'));
// app.use(require('./middlewares/common'));

/* API Routes */
// app.use('/api', require('./routes/api'));

// uncomment after placing your favicon in /static
//app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));

/* Website Routes */
app.locals.static_url = process.env.STATIC_URL || '/static';

//第一期商品展示（5个模块）
app.use(require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktrace leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;