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
// all requests will be routed through react app; both server and client side stuffs
app.route('/*').get(function(req, res, next) {
    // may need to have path dependant initial states or something..... whatever we would want indexed should use an initialState
    // We will need to implement isomorphic flux to get initialStates always in sync
    // Flux is a pre-render architecture thing
    // We have a lot of nested components. Say 5 different components use `Comments`
    // If we make a change to a comment in one component, only that component would re-render -- the other 4 would be out of sync
    // Flux provides 2 layers above the component: Dispatcher and Stores
    // Dispatcher receives the data from the server
    // Stores are essentially models. Instead of sending unstructured data, we generate structured 'comments' in a CommentStore for use across all components
    // So these work together in a unidirectional way
    // When one of your 5 components changes a comment, instead of just re-rendering that component, it would send the action to the dispatcher
    // The dispatcher will get the new information from ther server
    // The dispatcher will send the infromation to the necessary Stores (or models)
    // When those Stores are updated, they will trigger all dependant Components to re-render
    // Hence you have one-way flow and your app is always consistent.

    // The tricky thing is that we need this flux architecture available on the server as well.
    // We will rely on the dispatcher to create our initialState, (perhaps initialState == a group of Stores)
    // The same dispatcher will handle data retrieval/posting aka api calls from the client
    // On response, recreate the stores
    // Any changed stores will update their corresponding components
    // -- This way you always have unidirectional flow and consistent information displayed

    request('http://localhost:3000/comments.json', function(error, response, body) {
        var path = url.parse(req.url).pathname;
        console.log('SERVER path: ' + path);
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
