var express = require('express');
var path = require('path');
var app = express();
var config = require('./config');
var serveStatic = require('serve-static');
var React = require('react');
var url = require('url');
var request = require('request');

app.use(express.static(path.join(__dirname, '/')));
var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

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


app.route('/comment').post(function(req, res, next) {
    res.send('successfully recevied:' + JSON.stringify(req.body))
        // fs.appendFile("./comments.json", JSON.stringify(req.body), function(err) {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         console.log("The file was saved!");
        //     }
        // });

});

// now we need to add browserify so the component and bindings are availble on the front end!
app.route('/*').get(function(req, res, next) {
    // var initialState = require('./comments.json'); // must fetch initial state and inject into App -- this is static on server start....
    request('http://localhost:3000/comments.json', function(error, response, body) {
        var path = url.parse(req.url).pathname;
        console.log('SERVER path: ' + path)
        var initialState = JSON.parse(body);
        var AppElement = React.createElement(App, {
            path: path,
            initialState: initialState
        });
        var markup = React.renderToString(AppElement);
        markup += '<script id="initial-state" type="application/json">' + JSON.stringify(initialState) + '</script>';
        res.send(markup);
    });

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
