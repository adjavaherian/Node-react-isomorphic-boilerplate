var express = require('express');
var path = require('path');
var app = express();
var config = require('./config');
var serveStatic = require('serve-static');
var React = require('react');

app.use(express.static(path.join(__dirname, '/')));
var App = require('./app/App.js');


app.route('/simple').get(function(req, res, next) {
    // var data = [{
    //     title: "Hello world",
    //     awesomness: "super-high"
    // }, {
    //     title: "Hello world encore",
    //     awesomness: "super-high"
    // }]
    // var reactElement = React.createElement(App.IsoBegins, {
    //     data: data
    // });
    // var markup = React.renderToString(reactElement);
    // res.send(markup);
});

// now we need to add browserify so the component and bindings are availble on the front end!
app.route('/').get(function(req, res, next) {
    var AppElement = React.createElement(App);
    var markup = React.renderToString(AppElement);
    res.send(markup);
});





// server side rendering complete.
app.route('/server').get(function(req, res, next) {
    // var reactElement = React.createElement(App.CommentBox, {
    //     url: 'comments.json',
    //     pollInterval: 2000
    // });
    // var markup = React.renderToString(reactElement);
    // res.send(markup);
});


app.route('/client').get(function(req, res, next) {
    res.sendFile(path.join(__dirname, '.', 'tutorial.html'));
});




app.listen(config.app.port);
console.log('Server listening on port ' + config.app.port);

process.on('uncaughtException', function(err) {
    console.log('ERR:' + err);
    process.exit(1);
});
