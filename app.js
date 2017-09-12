var express = require('express');
var path = require('path');

var http = require('http');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    console.log("ok");
    io.sockets.emit('push', {value: "aaaa"});
    res.render('index', { title: 'Express' });
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 5000);

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


var server = http.createServer(app);
server.listen(app.get('port'));
var io = require('socket.io').listen(server);

module.exports = app;
