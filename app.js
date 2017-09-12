var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var http = require('http');
var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//===========================
//ルーティング
app.post('/', function(req, res) {
    console.log("ok");
    // var commits = req.param('commits');
    // var commit_message = "";
    // for(var i=0; i<commits.length; i++) {
    //     //マージのcommitメッセージはなくす
    //     if(commits[i]['message'].indexOf('Merge branch') < 0 ) {
    //         console.log(commits[i]['message']);
    //         commit_message += commits[i]['message'];
    //     }
    // }
    io.sockets.emit('push', {value: "aaaa"});
    res.render('index', { title: 'Express' });
});
//===========================


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 5000);

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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


//Websokcet接続の部分
var server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {
    console.log('connection start');
});

module.exports = app;
